/* 3.CMD: 0x32 Get Device Configuration 2 */
const CMD = 0x32;

class Method {
	constructor(builder) {
		this.builder = builder;
		this.CMD = CMD;
	}

	body(device, data) {
		return this.builder.createRequest(device, this.CMD, data);
	}

	response(device, cmd, ack, len, body, crc) {
		if(body.length != 15)
			return false;

		return {
			precision:				body[0],
			fixedWiegandHeader:		body[1],
			wiegandOption:			body[2],
			workCodeSetting:		body[3],
			realTimeModeSetting:	body[4],
			FPAutoUpdatingSetting:	body[5],
			relayMode:				body[6],
			lockerDelay:			body[7],
			lowRecordsMemoryWarn: 	parseInt(body.slice(8, 10).toString("hex"), 16),
			repeatAttendanceDelay:	body[11],
			doorSensorDelay:		body[12],
			bellDelay:				body[13],
			timeCorrection:			body[14]
		};
	}
}

module.exports = Method;