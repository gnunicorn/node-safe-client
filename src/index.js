 
const App require('./app');
const version require("../packages.json").version;

function initializeApp(app_info, opts){
	return autoref(App.registered(app_info))
}

module.exports = {
	VERSION: version,
	initializeApp: initializeApp
}

/* Example Usage:

import { initializeApp } from 'safe-app';

app = create_safe_app({
	id: "net.maidsafe.example.api-test",
	vendor: "MaidSafe Ltd",
	name: "API Example"
	// scope: "optionally"
});

app.on('connect', function() {
	console.log("connected");
});

app.on('disconnect', function() {
	console.log("disconnected");
});

app.auth(access_token).then(function() {
	// we are ready now, all APIs are available

	app.immutableData.fetch(randomAddress).then(function(reader){
		reader.read().then(function(data){
			console.log(data)
		});
		// thanks to ref-counting this cleans up the internal
		// reader reference somewhen after here itself!
	});
});

*/