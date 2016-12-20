const path = require('path');
const FFI = require('ffi');

const dir = path.dirname(__filename);

const t = require('./types');
const utils = require('./utils');

// const api = require('api');
const ffiFunctions = {
	// App functions
	app_unregistered: [t.i32 ,['pointer', 'pointer', t.AppPtr]],
	// app_registered: [t.i32 , ['pointer', 'pointer', t.App]],


};



// for (var modName in api) {
// 	if (api[modeName].ffiFunctionsToRegister){
// 		Object.assign(ffiFunctions, api[modeName].ffiFunctionsToRegister)
// 	}
// }


module.exports = FFI.Library(path.join(dir, 'libsafe_app'), ffiFunctions);