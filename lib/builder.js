const CRC = require('./crc.js'),
	  ACK = require('./ack.js');

class Builder {
	constructor() {
		this.ACK = ACK;
		this.CRC = CRC;
	}

	createRequest(device, CMD, data) {
		let buffer = [];
		this.appendSTX(buffer);
		this.appendCH(buffer, device);
		this.appendCMD(buffer, CMD);
		this.appendData(buffer, data);
		this.appendCRC(buffer);
		return buffer;
	}

	appendSTX(buffer) {
		buffer.push(0xA5); // STX
	}
	appendCH(buffer, device) {
		if(!device)
			device = 0;

		let bytes = Buffer.alloc(4);
        bytes.writeUInt32BE(device);
		for(let i = 0; i < bytes.length; i++)
			buffer.push(bytes[i]);

	}
	appendCMD(buffer, cmd) {
		buffer.push(cmd); // CMD
	}
	appendData(buffer, data) {
		if(!data)
			data = [];

		let bytes = Buffer.alloc(2);
        bytes.writeUInt16BE(data.length);
		for(let i = 0; i < bytes.length; i++)
			buffer.push(bytes[i]);

		if(data.length > 0) {
			for(let i = 0; i < data.length; i++)
				buffer.push(data[i]);
		}
	}
	appendCRC(buffer) {
		let crc = this.CRC.hash(buffer);
		for(let i = 0; i < crc.length; i++)
			buffer.push(crc[i]);
	}
}

module.exports = new Builder();