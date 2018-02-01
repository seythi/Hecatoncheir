//utility functions
const child_process = require('child_process')

exports.deepReplace = function(inp, replacings){//inp = object, replacings = map where KEY = whole literal to replace and VALUE = replacement value
    var foo = (function (obj) { 
        function walker(obj) {
            var k,
                has = Object.prototype.hasOwnProperty.bind(obj);
            for (k in obj) if (has(k)) {
                switch (typeof obj[k]) {
                    case 'object':
                        walker(obj[k]); break;
                    case 'string':
                        if (obj[k].toLowerCase() in replacings) obj[k] = replacings[obj[k].toLowerCase()];
                         break;
                    default:
                        if (obj[k]in replacings) obj[k] = replacings[obj[k]]
                }
            }
        }
        // set it running
        walker(obj);
        console.log('deep replace completed')
        return obj;
    }(inp));
    return foo;
}

exports.deepRegexplace = function(inp, replacings){ //inp = object, replacings = map where KEY = REGEXP (literal or object) and VALUE = replacement value | expression
    var foo = (function (obj) { 
        function walker(obj) {
            var k,
                has = Object.prototype.hasOwnProperty.bind(obj);
            for (k in obj) if (has(k)) {
                switch (typeof obj[k]) {
                    case 'object':
                        walker(obj[k]); break;
                    case 'string':
                        for(var repl of replacings.keys())
                        {
                            if(obj[k].match(repl))
                            {
                                obj[k] = obj[k].replace(repl, replacings.get(repl))
                            }
                        }
                         break;
                }
            }
        }
        // set it running
        walker(obj);
        console.log('deep replace completed')
        return obj;

}(inp));
    return foo;
}



exports.regenerate = function(){
    const subpro = child_process.spawn("node", ['C:\\Integrations\\Hecatoncheir\\phylactery.js'],
    {
        detached: true,
        stdio: 'ignore',
        windowsHide: true
    }
    )
    subpro.unref()
    process.exit()
    console.log('called phyl')
}