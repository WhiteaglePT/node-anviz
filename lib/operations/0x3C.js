/* 9．Get record information */
const CMD = 0x3C;

class Method {
	constructor(builder) {
		this.builder = builder;
		this.CMD = CMD;
	}

	body(device, data) {
		return this.builder.createRequest(device, this.CMD, data);
	}

	response(data) {
		return false;
	}
}

module.exports = Method;