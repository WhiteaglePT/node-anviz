/* 5.CMD: 0x38 Get Device Date/Time */
const CMD = 0x38;

class Method {
	constructor(builder) {
		this.builder = builder;
		this.CMD = CMD;
	}

	body(device, data) {
		return this.builder.createRequest(device, this.CMD, data);
	}

	response(device, cmd, ack, len, body, crc) {
		if(body.length != 6)
			return false;

		let date = new Date(
			(new Date()).getFullYear().toString().substring(0, 2) + body[0],
			body[1] - 1, 
			body[2], 
			body[3], 
			body[4], 
			body[5]
		);
		return new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
	}
}

module.exports = Method;