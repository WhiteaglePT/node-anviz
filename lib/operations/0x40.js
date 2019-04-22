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
				user: this.builder.serializer.unpack("N", body.slice(i, i + 4))['1'],
				time: new Date((new Date("2000-01-02 00:00:00").getTime()) + this.builder.serializer.unpack("N", body.slice(i + 4, i + 8))['1'] * 1000),
				action: body[i + 9]
			});
			i+= 14;
		}
		return records;
	}
}

module.exports = Method;