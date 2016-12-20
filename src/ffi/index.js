const path = require('path');
const dir = path.dirname(__filename);
const ffi = require('ffi');

module.exports = ffi.Library(path.join(dir, 'libsafe_app'), {
	// app_unregistered: [,[]],
	// app_registered: [,[]],

});