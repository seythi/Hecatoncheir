console.log('Caller Initialized');

//////////////////////////////////////////////////////////
//			TODO
//convert string literal 'null' to null value for insert
//implement direct insert into table
//
//
//
//


const cf = require('./config.js');
const toast = require('./custmodules/toast/toastMethods.js');
const util = require('./custmodules/util.js')

var backload = 7;
var waiting = false
///////////////////////INIT/////////////////////////////
toast.initToken(); //either A: requests token from toast or B: gets token that is less than 15 minutes old from file
process.env.recentMail = null; //future tool to limit frequency of error mailing
var dayint = Date.now()/86400000;
if(cf.adhocfencepost > Date.now()) //workaround to force long backloads when starting as service
{
	backload = 54;
}

/////////////////////END INIT//////////////////////////
/////////////////ARGUMENT HANDLER//////////////////////
var args = process.argv.slice(2);
console.log(args)
for(let foo = 0; foo < args.length; foo++)
{
	switch(args[foo])
	{
		case 'tbl': //cmd argument to manually backload N days of sales
			if(parseInt(args[foo+1]))
			{
				backload = parseInt(args[foo+1])
				foo ++
			}
			break;
		case 'notbl': //cmd argument to launch without any backloading at all
			backload = -1;
			break;
		// case 'tblF': 
		// if(parseInt(args[foo+1]))
		// 	{
		// 		waiting = true;
		// 		let corge = parseInt(args[foo+1])
		// 		console.log(corge)
		// 		setTimeout(()=>{
		// 			toast.poll(corge)
		// 		},1000)
		// 		foo ++
		// 	}
		// 	break;
	}
}
if(process.env.backload){backload = process.env.backload}
///////////////END ARGUMENT HANDLER////////////////////

//45 MINUTE MASTER INTERVAL
setInterval(() => {
	// let tod = Date.now() % 86400000 
	// if(backload == -1 && tod > 36900000 && tod < 39600000)
	// {
	// 	util.regenerate()
	// }
	
	toast.renewToken();
	// if(backload == -1 && dayint < (Date.now()/86400000))
	// {
	// 	backload = 1
	// 	dayint = Date.now()/86400000
	// }
}, 2700000);


//5 MINUTE INTERVAL 6 SECOND OFFSET

setTimeout(() => {
	setInterval(() => {
		/////////////////TOAST/////////////////

		toast.poll(-1); //polls for last 6 minutes of toast sales
		if(backload != -1 && !waiting) //if there are backloads to do and one is not currently in progress
		{
			waiting = true; //stop new backloads from starting
			setTimeout(()=>{
				console.log('starting backload ' + backload)
				toast.poll(backload).then(res=>{
					backload--; //decrement backload counter
					waiting = false; //allow new backload to start
				});
			},10000);
		}
		else{console.log('waiting to initiate backload#' + backload)}
		/////////////END TOAST//////////////////
	},300000)
},6000
);

process.on('exit', (exitCode)=>{
	if(process.env.parentPID){process.kill(process.env.parentPID)}
})