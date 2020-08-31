/*24.CMD: 0x4E Erase all Records/ New Records Flag*/
const CMD = 0x4E;

class Method {
	constructor(builder) {
		this.builder = builder;
		this.CMD = CMD;
	}

    body(device, data) {
        let buffer = [],
            bytes;

        buffer.push(0x02);
        this.builder.writeInt2Bytes(data, buffer);

        return this.builder.createRequest(device, this.CMD, buffer);
    }

	response(device, cmd, ack, len, body, crc) {
		return body;
	}
}

module.exports = Method;