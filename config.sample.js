const querystring = require('querystring');
const secrets = require('./aMan.js')

let bstring = querystring.stringify({ //URL encoded Toast token request query
		grant_type:'client_credentials',
		client_id:'Id goes here',
		client_secret: ('' + secrets.toast)
	}); 
exports.toastTokenBody = bstring;


exports.endpoint = 'https://ws-api.toasttab.com'

//backup list of GUIDs, LEGACY
exports.GUIDs = {
	GUID: 'these can be used instead of a SQL table to hold store GUIDs',
}
exports.rootD = __dirname;