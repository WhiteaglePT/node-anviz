const builder = require('./builder.js');

let map = [];
map[0x30] = "getInformation1";
map[0x31] = "setInformation1";
map[0x32] = "getInformation2";
map[0x38] = "getDateTime";
map[0x39] = "setDateTime";
map[0x3A] = "getNetworkConfiguration";
map[0x3C] = "getRecordInformation";
map[0x40] = "downloadAttendanceRecords";
map[0x41] = "uploadRecord";
map[0x48] = "getDeviceModel"
map[0x4E] = "eraseNewRecordsFlag";
map[0x0A] = "getServerURL";
map[0x0B] = "setServerURL";

let operations = {
    _map: map,
    builder: builder
};

for (let i in map) {
    operations[map[i]] = new(require("./operations/0x" + (parseInt(i).toString(16).toUpperCase()) + ".js"))(builder);
}

module.exports = Object.freeze(operations)