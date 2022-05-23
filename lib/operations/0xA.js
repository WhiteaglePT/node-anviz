/* 117.CMD: 0x0A Get Server URL */
const CMD = 0x0A;

class Method {
	constructor(builder) {
		this.builder = builder;
		this.CMD = CMD;
	}

	body(device, data) {
		return this.builder.createRequest(device, this.CMD, data);
	}

	response(device, cmd, ack, len, body, crc) {
		if(ack == 0) {
			if(body.length == 104) {
				let url = "";
				
				for(let i = 4; i < 104 && body[i] != 255; i++)
					url += String.fromCharCode(body[i]);

				return {
					dns: body.slice(0, 4).join("."),
					url: url
				}
			}
			return null;
		}
		return false;
	}
}

module.exports = Method;