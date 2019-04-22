const builder = require('./builder.js');

let map = [];
map[0x30] = "getInformation1";
map[0x31] = "setInformation1";
map[0x3C] = "getRecordInformation";
map[0x40] = "downloadAttendanceRecords";

let operations = {
	_map: map,
	builder: builder
};

for(let i in map) {
	operations[ map[i] ] = new (require("./operations/0x"+(parseInt(i).toString(16).toUpperCase())+".js"))(builder);
}

module.exports = Object.freeze(operations)