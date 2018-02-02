var Service = require('node-windows').Service;
var cf = require('./config.js') 
var args = process.argv.slice(2);
var bl = 3;
for(let foo = 0; foo < args.length; foo++)
{
	//console.log(args[foo])
	if(parseInt(args[foo]))
	{
				bl = parseInt(args[foo])
				console.log('backloading ' + bl + ' days')
	}
}
var svc = new Service({
	name:'Hecatoncheir_alt',
	description:'Timer loops for Hecatoncheir\'s various functions\nPID: ' + process.pid,
	script: require('path').resolve(__dirname, 'main.js'),
	env:[{
		name: 'parentPID',
		value: process.pid
	},
	{
		name:'backload',
		value: bl
	}]
})


svc.on('install',()=>{
	console.log('installing service')
	svc.start();
});

svc.on('alreadyinstalled',()=>{
	console.log('Service already installed, starting...')
	svc.start();
});

svc.on('invalidinstallation',()=>{
	console.log('installation invalid, try again')
});

svc.on('start',()=>{
	console.log('service started')
});

svc.on('stop',()=>{
	console.log('service stopped')
});

svc.on('error',()=>{
	console.log('an error occured')
	//TODO find a good mailer
});
if(args[0]==='q')
{
	svc.stop()
}
else if(args[0]==='u')
{
	console.log('uninstalling')
	svc.uninstall()
}
else if(args[0]==='r')
{
	console.log('restarting')
	svc.uninstall()
	setTimeout(()=>{
		svc.install()
	}, 15000)
	
}
else
{
	svc.install();
}