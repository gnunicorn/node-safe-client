
const ref = require('ref');
const Struct = require('ref-struct');
const FfiString = require("./types").FfiString;

function make_ffi_string(string) {
	const b = new Buffer(string);
	return new FfiString({ptr: b, len: b.length});
}

function from_ffi_string(ffi_string) {
	return ref.reinterpret(ffi_string.ptr, ffi_string.len).toString()
}

module.exports = {
	make_ffi_string: make_ffi_string,
	from_ffi_string: from_ffi_string
}