/* 118.CMD: 0x0B Set Server URL */
const CMD = 0x0B;

class Method {
	constructor(builder) {
		this.builder = builder;
		this.CMD = CMD;
	}

	body(device, dns, server) {

		let dnsParts = dns.explode("."),
			dnsPacket = [];

		for(let i in dnsParts) {
			let part = parseInt(dnsParts[i]);
			if(!isNaN(part) && part >= 0)
				dnsPacket.push(part);
		}

		if(dnsPacket.length < 4)
			throw new Error('Invalid DNS address');

		let serverPacket = [];

		if(server.length > 100)
			throw new Error("Server URL too big: Maximum 100 characters.");

		for(let i = 0; i < 100) 
			if(i < server.length && server[i])
				serverPacket.push(server.charCodeAt(i));
			else
				serverPacket.push(255);

		return this.builder.createRequest(device, this.CMD, Buffer.from(dnsPacket.concat(serverPacket)));
	}

	response(device, cmd, ack, len, body, crc) {
		console.info(cmd, ack, len, body);
		return false;
	}
}

module.exports = Method;