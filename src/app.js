
// import { app_registered, app_unregistered } from './ffi';
const EventEmitter = require('events').EventEmitter; 
// import { autoref } from './helpers'
// import { Container, ImmutableData, MutableData, Ipc } from './api'
const ref = require('ref');
const ffi = require('ffi');
const ffiUtils = require('./ffi/utils');
const t = require('./ffi/types');
const ffiApi = require('./ffi/lib');


class SAFEApp extends EventEmitter {
	// internal wrapper
	constructor(app_info) { // -> SAFEApp
		super();
		this._app_info = app_info
		this._network_state = 'init'
		this._connection = null
	}

	get network_state() {
		return this._network_state;
	}

	get app_info() {
		return this._app_info;
	}
	
	connect(opts) {
		const app = ref.alloc(t.App);
		ffiApi.app_unregistered(ref.NULL,
				ffi.Callback("void", ['int', 'int'], this._network_state_updated.bind(this)),
				app.ref());
			// ffiUtils.make_ffi_string(this.app_info.app_id),

		this._setup(app);
	}

// 		// 
// pub unsafe extern "C" fn app_unregistered(user_data: *mut c_void,
//                                           network_observer_cb: unsafe extern "C" fn(*mut c_void,
//                                                                                     i32,
//                                                                                     i32),
//                                           o_app: *mut *mut App)
//                                           -> i32 {
// 	}

	_network_state_updated(new_state) {
		console.log(arguments);
	}


	_setup(ffi_app) {
		this._connection = ffi_app;

		// this.container = new ContainerAPI(this._connection);
		// this.immutableData = new ImmutableData(this._connection);
		// this.mutableData = new MutableData(this._connection);
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
module.exports = SAFEApp;