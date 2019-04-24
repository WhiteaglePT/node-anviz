/* 10．Download T&A records */
const CMD = 0x40;

class Method {
	constructor(builder) {
		this.builder = builder;
		this.CMD = CMD;
	}

	body(device, data) {
		data = Buffer.from(data);
		return this.builder.createRequest(device, this.CMD, data);
	}

	response(device, cmd, ack, len, body, crc) {
		let validRecords = parseInt(body[0], "hex"),
			i = 2,
			records = [];
		while(i < body.length && records.length < validRecords) {
			records.push({
				user: Buffer.from(body.slice(i, i + 4)).readUInt32BE(),
				time: new Date((new Date("2000-01-02 00:00:00").getTime()) + Buffer.from(body.slice(i + 4, i + 8)).readUInt32BE() * 1000),
				action: body[i + 9]
			});
			i+= 14;
		}
		return records;
	}
}

module.exports = Method;