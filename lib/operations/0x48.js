/* 18.CMD: 0x48 Get Device Model code */
const CMD = 0x48;

class Method {
	constructor(builder) {
		this.builder = builder;
		this.CMD = CMD;
	}

	body(device, data) {
		return this.builder.createRequest(device, this.CMD, data);
	}

	response(device, cmd, ack, len, body, crc) {
		if(body.length != 8)
			return false;

		return body.toString();
	}
}

module.exports = Method;