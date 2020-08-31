/* 2.CMD: 0x31 Set Device Configuration 1 */
const CMD = 0x31;

class Method {
	constructor(builder) {
		this.builder = builder;
		this.CMD = CMD;
	}

	body(device, data) {
		let bytes = [];
		if(!data.communicationsPassword) {
			bytes[0] = 0xFF;
			bytes[1] = 0xFF;
			bytes[2] = 0xFF;
		} else
			throw new Error("[node-anviz] Sorry, communications password is not implemented yet!");

		if(typeof data.sleepTime == "undefined")
			bytes[3] = 0xFF;
		else
			bytes[3] = Math.max(0, Math.min(250, data.sleepTime));

		if(typeof data.volume == "undefined")
			bytes[4] = 0xFF;
		else
			bytes[4] = Math.max(0, Math.min(5, data.volume));

		if(typeof data.language == "undefined")
			bytes[5] = 0xFF;
		else
			bytes[5] = Math.max(0, Math.min(5, data.language));

		if(typeof data.dateTimeFormat == "undefined")
			bytes[6] = 0xFF;
		else
			bytes[6] = Math.max(0, Math.min(6, data.dateTimeFormat));

		if(typeof data.attendanceState == "undefined")
			bytes[7] = 0xFF;
		else
			bytes[7] = Math.max(0, Math.min(15, data.attendanceState));

		if(typeof data.languageSettingFlag == "undefined")
			bytes[8] = 0xFF;
		else
			bytes[8] = data.languageSettingFlag ? 0x10 : 0x00;

		return this.builder.createRequest(device, this.CMD, bytes);
	}

	response(data) {
		return true;
	}
}

module.exports = Method;