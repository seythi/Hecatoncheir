const fs = require('fs');
const path = require('path');
const request = require('request');
const Promise = require('bluebird');
const querystring = require('querystring');
const cf = require('../../config.js');
const bunyan = require('bunyan');
const util = require('../util.js');

var log = bunyan.createLogger({
	name:'toast',
	streams:[{
		level: 'info',
		type: 'rotating-file',
		path: path.resolve(cf.rootD, 'logs\\magento.log'),
		period: '7d',
		count: 4,
	},{
		level: 'error',
		path: path.resolve(cf.rootD, 'logs\\magentoERROR.log')
	}]
})

var TablesToGet = [1, 9]
var baseEndpoint = 'https://api.rjmetrics.com/0.1/'
exports.doMagento = function()
{
	for (var i = TablesToGet.length - 1; i >= 0; i--) {
		generateExports(TablesToGet[i]).then(expobj=>{
			setTimeout(getExports(expobj).then(zip=>{

			}), 45000)
		})
	}
}


function generateExports(tableID)
{
	return new Promise(resolve=>{
		let qs = '' + cf.magentoClient + '/table/' + tableID + '/export'
		let GEoptions = {
			url: baseEndpoint + 'client/' + qs,
			method: 'POST',
			headers:{
				'X-RJM-API-Key': cf.magentoKey
			},
		}
		//console.log(GEoptions)
		request(GEoptions, (e,r,b)=>
		{
			if(e)
			{
				log.error(e)
				resolve('BAD REQUEST')
			}
			else {
			let bo = parseJSON(b)
			let robj = {
				'tableID': tableID,
				'exportID': bo.export_id
				}
				resolve(robj)
			}
		})
	})
}


function getExports(expobj)
{
	return new Promise (resolve=>
	{
		let qs = '' + expobj.exportID
		let GEoptions = {
			url: baseEndpoint + 'export/' + qs,
			method: 'GET',
			headers:{
				'X-RJM-API-Key': cf.magentoKey
			},
		}
		//console.log(GEoptions)
		request(GEoptions, (e,r,b)=>
		{
			if(e)
			{
				log.error(e)
				resolve('BAD REQUEST')
			}
			else {
			let bo = parseJSON(b)
			let robj = {
				'tableID': tableID,
				'exportID': bo.export_id
				}
				resolve(robj)
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