const SafeApp = require ("../src/app");
const should = require('should');

describe("App", function() {
	describe("initialised", function(){
		it("should work", function() {
			let app = new SafeApp();
			app.connect();
			should(app.network_state).be.exactly("connected");
		})
	})
})
