const cf = require('./config.js');
const magento = require('./custmodules/magento/magentoAPI.js')

magento.generateExports(1).then(b=>{
	console.log(b)
})