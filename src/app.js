
// import { app_registered, app_unregistered } from './ffi';
const EventEmitter = require('events').EventEmitter; 
// import { autoref } from './helpers'
// import { Container, ImmutableData, MutableData, Ipc } from './api'
const ref = require('ref');
const ffi = require('ffi');
const t = require('./ffi/types');
const ffiApi = require('./ffi/lib');
const api = require("./api");


class SAFEApp extends EventEmitter {
  // internal wrapper
  constructor(app_info) { // -> SAFEApp
    super();
    this._app_info = app_info
    this._network_state = 'init'
    this._connection = null
    for (key in api) {
      this[key] = new api[key](this)
    }
  }

  get connection() {
    return this._connection;
  }

  get network_state() {
    return this._network_state;
  }

  get app_info() {
    return this._app_info;
  }

  connect(opts) {
    return this.auth.connect(opts
      ).then(function(connection) {
        this._connection = connection
      }.bind(this))
  }

  _network_state_updated(new_state) {
    console.log(arguments);
    this.emit("network-state-updated", new_state, this._network_state);
    this.emit("network-state-" + new_state, this._network_state);
    this._network_state = new_state;
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