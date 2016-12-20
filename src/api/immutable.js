
const helpers = require('../helpers'); 

class ImmutableDataReader extends helpers.NetworkObject {

  read() { // -> Promise
    return idata_read_from_self_encryptor(this._con, this._ref)

  }

  size() { // -> Promise
    return idata_size(this._con, this._ref)
  }

  close() {
    return idata_close_self_encryptor(this._con, this._ref)
  }

  static _clean(con, ref) {
    idata_self_encryptor_reader_free(con, ref)
  }

}

class ImmutableDataWriter {
  write(string) {
    return idata_write_to_self_encryptor(this._con, this,_ref, string)
  }

  size() { // -> Promise
    return idata_size(this._con, this._ref)
  }

  close() {
    return idata_close_self_encryptor(this._con, this._ref)
  }

  static _clean(con, ref) {
    idata_self_encryptor_writer_free(con, ref)
  }

}


class ImmutableData {
  constructor(con) {
    this._con = con
  }

  create() {
    idata_new_self_encryptor(this._con, address)
      .then((x) => helpers.autoref(new ImmutableDataWriter(x)))
  }

  fetch(address) {
    idata_fetch_self_encryptor(this._con, address)
      .then((x) => helpers.autoref(new ImmutableDataReader(x)))
  }
}

module.exports = ImmutableData;