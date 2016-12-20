const weak = require("weak");

class NetworkObject {
  constructor(con, ref){
    this._con = con
    this._ref = ref
  }

  __cleanup__(){
    if (this._ref && this._cleanup) {
      this._cleanup(this._con, this._ref)
    }
  }

}

// automatic referencing counting allows
// us to free up resources
function autocleanup () {
  // we are being dereferenced
  // clean up loose ends
  if (this.__cleanup__)  {
    this.__cleanup__()
  }
}

function autoref(obj){
  return weak(obj, autocleanup)
}


module.exports ={
  NetworkObject: NetworkObject,
  autoref: autoref
}



