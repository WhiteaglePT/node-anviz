/* 7.CMD: 0x3A Get Network Configuration */
const CMD = 0x3A;

class Method {
	constructor(builder) {
		this.builder = builder;
		this.CMD = CMD;
	}

	body(device, data) {
		return this.builder.createRequest(device, this.CMD, data);
	}

	response(device, cmd, ack, len, body, crc) {
		if(body.length != 27)
			return false;

		return {
			ipAddress:					body.slice(0, 4).join("."),
			subnet: 					body.slice(4, 9).join("."),
			macAddress:	 				body.slice(9, 14).toString("hex"),
			defaultGateway:	 			body.slice(14, 18).join("."),
			serverIp:	 				body.slice(18, 22).join("."),
			remoteAccess: 				body[22],
			port:		 				parseInt(body.slice(23, 25).toString("hex"), 16),
			mode:	 					body[25],
			dhcpPermission:				body[26]
		};
	}
}

module.exports = Method;