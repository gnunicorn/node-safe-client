const ref = require("ref");
const Struct = require('ref-struct');

const i32 = ref.types.int32;
const u8 = ref.types.uint8; 
const u8Pointer = ref.refType(u8);
const Void = ref.types.void;
const VoidPtr = ref.refType(Void);
const usize = ref.types.size_t;

const App = Struct({});
const AppPtr = ref.refType(App);

const FfiString = new Struct({
  'ptr': u8Pointer,
  'len': usize,
  'cap': usize 
});

module.exports = {
	FfiString: FfiString,
	VoidPtr: VoidPtr,
	App: App,
	AppPtr: AppPtr,
	i32: i32,
	u8: u8,
	Void: Void,
	usize: usize 
}
