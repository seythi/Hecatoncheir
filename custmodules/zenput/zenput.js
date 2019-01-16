const fs = require('fs');
const path = require('path');
const request = require('request');
const Promise = require('bluebird');
const querystring = require('querystring');
const sqlEngine = require('./sqlEngine.js');
const cf = require('../../config.js');
const zcf = require('../../zenputConfig.js');
const bunyan = require('bunyan');
const util = require('../util.js');

var log = bunyan.createLogger({
	name:'zenput',
	streams:[{
		level: 'info',
		type: 'rotating-file',
		path: path.resolve(cf.rootD, 'logs\\zenput.log'),
		period: '7d',
		count: 4,
	},{
		level: 'error',
		path: path.resolve(cf.rootD, 'logs\\zenputERROR.log')
	}]
})

var token
var formReqOptions = {
	output: 'json' ,//has a CSV option
	limit: 100 ,//10000 for CSV
	date_start: getStartDate() ,
	date_end: getEndDate()

}
var templateArray = zcf.templateIDs

function getStartDate(){
	return '20190101' //YYYYMMDD
}
function getEndDate(){
	return '20190107' //YYYYMMDD
}
exports getZenputData(){
	return new Promise(resolve=>{
		let initialReqQS = querystring.stringify(formReqOptions)
		for(let template_id in templateArray){
			let url = 'https://www.zenput.com/api/v1/forms/list/' + template_id + initialReqQS
			makeZPreq(url).then(formSubmissions=>{
				handleForm(formSubmissions)
			})
		}
	})
	
	
}
function makeZPreq(url){
	return new Promise(resolve=>{
		let formOptions={
			url: url,
			method: 'GET',
			headers:{
				'X-API-TOKEN': zcf.apiKey
			}
		}


		request(ODoptions, (e,r,b) =>{
			if(e)
			{
				log.error(e, 'error getting form, aborting')
			}
			else {
				let formSubmissions = b.form_submissions
				if(b.next)
					formSubmissions = formSubmissions.concat(makeZPreq(b.next)) //TODO figure out what pagination looks like in this, may not come up
				resolve(formSubmissions)
			}
		})

	})
}
function handleForm(forms){

}