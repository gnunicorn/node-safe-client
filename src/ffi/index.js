const ffi = require('ffi');

export ffi.Library('./libsafe_core', {
	app_unregistered: [,[]],
	app_registered: [,[]],

});