const fs = require('fs');
const path = require('path');
const request = require('request');
const Promise = require('bluebird');
const querystring = require('querystring');
const sqlEngine = require('./sqlEngine.js');
const cf = require('../../config.js');
const bunyan = require('bunyan');
const util = require('../util.js');

var log = bunyan.createLogger({
	name:'toast',
	streams:[{
		level: 'info',
		type: 'rotating-file',
		path: path.resolve(cf.rootD, 'logs\\toast.log'),
		period: '7d',
		count: 4,
	},{
		level: 'error',
		path: path.resolve(cf.rootD, 'logs\\toastERROR.log')
	}]
})
if(cf.adhocFencePost > Date.now())
{
log.info('fenceposter activated');
}
var toastToken;//holder for the oAuth token
var waiting = false; //FLAG is backload request loop paused
var toastTokenOptions = { //options for the token request
	url: cf.endpoint + '/usermgmt/v1/oauth/token',
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	body: cf.toastTokenBody, //stored in config for concealment and easy changing of credentials
}

// if(process.env.parentPID)
// {
// 	log.error({parent: process.env.parentPID,
// 		child: process.pid}, 'PIDs')
// }
// else{
// 	log.error({child: process.pid}, 'parentPID not populated')
// 	console.log('regenerating')
// 	util.regenerate();
// }



exports.initToken = function()
{
	try{
	toastToken = JSON.parse(fs.readFileSync(path.resolve(cf.rootD, 'token.json'), 'UTF-8')) //retrieves stored token
	}catch(err){
		log.error(err, 'failed to parse token')
		toastToken = null;
	}
	if (!toastToken || toastToken['ts']  < (Date.now() - 900000)) //is stored token >15 minutes old OR nonexistant
	{
		updateToken().then(tk=>{ //get new token
			toastToken = tk;
		})
	}
}
exports.renewToken = function()
{
	updateToken().then(tk=>{
		toastToken = tk;
	});
}



exports.poll = function(backload)
{
	return new Promise(resolve=>{
		log.debug('polling backload ' + backload)
		console.log('polling backload ' + backload)
		let allorders = {};
		if(backload == -1) //pause backloading when NRT call is made
		{
			console.log('enwaiting')
			waiting = true;
		}
		sqlEngine.getGUIDs().then(GUIDs=>{ //retrieve GUIDs from DB
			//console.log(GUIDs)
		for(let guid in GUIDs)
		{
			allorders[GUIDs[guid]] = pollPOS(backload, toastToken['token'], GUIDs[guid]); //pollPOS returns an array of all orders (as promises) in the appropriate timeframe
		}
		Promise.props(allorders).then((ordersThick) => //output is resolved to {store GUID: [orders]}
		{
			console.log('all POS polled')
			//let ordersFlat = [].concat.apply([], ordersThick)
			//fs.writeFile(path.resolve(cf.rootD, 'jsonDumps/output' + backload + '.json'), JSON.stringify(ordersThick, null, 4), (err)=> {if (err) throw err})//write raw json for debugging
			console.log('inserting into DB')
			var repl = new Map()
			repl.set(/\+0000/, 'Z')
			var cln = util.deepRegexplace(ordersThick, repl) //replaces pseudo ISO +0000 timezones with true ISO Zs for sql to ingest
			sqlEngine.bulkInsert(cln); //feeds SQL friendly JSON into sql engine
			
			if(backload == -1)//on resolution of NRT call, resume backload
			{
				console.log('unwaiting')
				waiting = false;
			}
			resolve(true);

		})
		})
	})
}














function updateToken() //ASYNC constructs token object with timestamp from token response body, writes to file
{
	return getToken(toastTokenOptions).then((body) => 
	{
		var tk = new Object()//= toastToken;
		tk['token'] = body.access_token;
		tk['ts'] = Date.now();
			//console.log(oAuthToken);
		fs.writeFile( path.resolve(cf.rootD, 'token.json'),JSON.stringify(tk), (err) =>
		{
			if (err) 
			{
				log.error(err, 'failed to write the token to json')
			}
			log.debug('wrote token to file');
		})
		return tk
	})
}
function pollPOS(backload, token, locationGUID) //pulls the full detail list of orders at a set location for a day offset by <backlog> or if backlog == -1, 6 minutes
{
	return new Promise(resolve=>{
		if(backload != -1)
		{
			log.info('backloading day %d', backload);
		}
		getOrderList(backload, token, locationGUID).then(orderList=>
		{
			//console.log(orderList)
			//fs.writeFile(path.resolve(cf.rootD, 'jsonDumps/OL' + backload + '.json'), JSON.stringify(orderList, null, 4), (err)=> {if (err) throw err})
			let orderdetails = []
			let counter = 0; //iterator for interval
			let DEBUGwaitcounter = 0; //monitors if the backload requests are waiting an overly long time
			let orderGetInterval = setInterval(()=>
			{

				if(!waiting || backload == -1)//keeps requests from being made and interator from incrementing while paused
				{
					if(counter >= orderList.length) //resolves promise after fully populating orderDetails
					{//resolves as empty array if orderList is empty
						console.log('resolving order list')
						resolve(Promise.all(orderdetails))
						clearInterval(orderGetInterval); //note to self: intervals never close automatically
					}
					else
					{
						log.trace('counter: %d, GUID: %s',counter, orderList[counter])
						orderdetails.push(getOrderDetail(token,locationGUID,orderList[counter]))
						counter++;
					}
				}
				else if (DEBUGwaitcounter % 1000 == 0 && DEBUGwaitcounter > 0)
				{
					log.warn('waited %d requests on backload # %d', DEBUGwaitcounter, backload)
				}
				else {
					DEBUGwaitcounter++;
				}
			},210) // max frequency allowed by toast is 10Hz
			//console.log(orderdetails)
			
		})
	})
}


function getOrderDetail(token, locationGUID, orderGUID) //gets the order JSON object for a given orderGUID
{
	return new Promise(resolve=>{
		let qs = '' + orderGUID
		let ODoptions={
			url: cf.endpoint + '/orders/v2/orders/' + qs,
			method: 'GET',
			headers:{
				'Authorization': 'Bearer ' + token,
				'Toast-Restaurant-External-Id': locationGUID,
			},
		}
		//console.log(ODoptions.url)
		request(ODoptions, (e,r,b) =>
		{
			if(e)
			{
				log.warn(e, 'error getting order, retrying in 1 minute')
				setTimeout(()=> {request(ODoptions, (e2,r2,b2) =>
					{
						if(e2) 
						{
							log.error(e2, 'failed to obtain order '+orderGUID+' on second attempt')
						}
						else {
							resolve(parseJSON(b2))
						}
					})
				}, 60000)//retry 1 minute after failure
			}
			else {
				resolve(parseJSON(b))
			}
		})
		
	})
}

function getOrderList(backload, token, locationGUID) //gets array of order GUIDs from between now and 6 minutes previous
{
	return new Promise(resolve=>{
		
		let qobj
		if(backload == -1)
		{
			let currentTime = new Date(Date.now()).toISOString() //converts current date to a string in ISO.8601 format
			let sixminutesago = new Date(Date.now() - 360000).toISOString() 
			qobj={
				startDate: sixminutesago,
				endDate: currentTime,
			}
		}
		else
		{
			var bd = new Date(Date.now() - (backload * 86400000));

			qobj={
				businessDate: '' + bd.getFullYear() + ('0' + (bd.getMonth() + 1)).slice(-2) + (('0' + (bd.getDate())).slice(-2)) //encodes desired date as YYYYMMDD

			}
		}
		let qs = querystring.stringify(qobj) //URL encodes the dates for appending to the URL
		//console.log(qs)
		let GOoptions={
			url: cf.endpoint + '/orders/v2/orders?' + qs,
			method: 'GET',
			headers:{
				'Authorization': 'Bearer ' + token,
				'Toast-Restaurant-External-Id': locationGUID,
			},
		}
		//console.log('making requests on ' + GOoptions.url)
		//console.log(GOoptions)
		request(GOoptions, (e,r,b) => {
			if(e)
			{
				log.warn(e, 'failed first orderlist request')
				setTimeout(()=> {request(GOoptions, (e2,r2,b2) =>
					{
						if(e2) log.error(e, 'failed second orderlist request');
						else {
							resolve(parseJSON(b2))
						}
					})
				}, 5000)//retry 5 seconds after failure
			}
			if(backload != -1){
				fs.appendFile(path.resolve('C:\\Integrations\\Hecatoncheir\\logs\\blOrderCt.json'),
				 'backload day: ' + backload + ' retrieved list of: ' + parseJSON(b).length + ' orders from location ' + locationGUID + ' at time: ' + new Date(Date.now()).toString()+ '\n', (err)=> {if (err) throw err})
				if(!parseJSON(b).length)
				{
					fs.appendFile(path.resolve('C:\\Integrations\\Hecatoncheir\\logs\\undef.json'), b + '/r/n/r/n', (err)=> {if (err) throw err})
				}
			}
			resolve(parseJSON(b))
		})
		
	})
}

function getToken(opt) //makes token request
{
	return new Promise(resolve =>{
		request(toastTokenOptions, (e,r,b) => {
			console.log('acquiring token');
			if(e)
			{
				log.warn(e, 'error getting token, retrying in 5 seconds')
				setTimeout(()=> {request(toastTokenOptions, (e2,r2,b2) =>{ //if it fails to aquire the token, try again in 5 seconds
					if(e2) 
					{
						log.error(e2, 'failed to obtain token on second attempt')
					}
					else 
					{
						resolve(parseJSON(b2))
					}
				})}, 5000);//retry 5 seconds after failure
			}
			else 
			{
				resolve(parseJSON(b))
			}
		})
	})
}

function parseJSON(body) //bundled JSON parser with error handling
{
	let f;
	try
	{
		f= JSON.parse(body)
		return(f)
	}
	catch(err)
	{
		log.fatal({error: err, invalidJSON: body}, "invalid JSON")
		return {};
	}
}