
import { app_registered, app_unregistered } from './ffi';
import { EventEmitter } from 'events'; 
import { autoref } from './helpers'
import { Container, ImmutableData, MutableData, Ipc } from './api'


class SAFEApp extends EventEmitter {
	// internal wrapper
	constructor(app_info) { // -> SAFEApp
		super();
		this.app_info = app_info
		this._connection = null
	}

	_setup(app) {
		this._connection = app

		this.container = new ContainerAPI(this._connection);
		this.immutableData = new ImmutableData(this._connection);
		this.mutableData = new MutableData(this._connection);
	}
	
	auth(auth_token) { // -> Promise
		// ToDo: use keytar if possible
		if (auth_token) {
			app_registered(auth_token)
				.then(this._setup)
		} else {
			// open to safe-auth
		}
	}

	// Q: should we offer anonymous connecting?
	connect_anonymously() { // -> Promise
		app_unregistered()
			.then(this._setup)

	}

	__cleanup__() {
		// let's dereference everything
		this.container = null;
		this.immutableData = null;
		this.mutableData = null;

		// in the hopes, this all cleans up,
		// before we do in a matter of seconds from now
	}

}

export function create_safe_app(appInfo) {
	return autoref(new SAFEApp(appInfo))

}

/* Example Usage:

import { create_safe_app } from 'safe-app';

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