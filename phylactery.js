const child_process = require('child_process')
const fs = require('fs')
const path = require('path')
console.log('phyl')
var n = new Date(Date.now())
fs.appendFile(path.resolve('C:\\Integrations\\Hecatoncheir\\logs\\phylactery.json'), 'Regenerated at time: ' + n.toString() + '\n', (err)=> {if (err) throw err})
setTimeout(()=>{
	const subpro = child_process.spawn("node", ['C:\\Integrations\\Hecatoncheir\\svc.js', 'r', '4'],
	{
		detached: true,
		stdio: 'ignore',
        windowsHide: true
	})
	subpro.unref()
}, 600000)