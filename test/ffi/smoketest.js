
const ffi = require("ffi");
const ref = require("ref");
const ffiApi = require ("../../src/ffi/lib");
const ffiUtils = require ("../../src/ffi/utils");
const t = require ("../../src/ffi/types");
const should = require('should');

describe("App", function() {
	describe("unregistered", function(){
		it("should work", function() {
			const app = ref.alloc(t.App);
			ffiApi.app_unregistered(ref.NULL,
					ffi.Callback("void", ["int", "int"], function() {}),
					app.ref())
		})
	})
})

