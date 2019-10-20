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

    response(device, cmd, ack, len, body, crc) {
        if (body.length != 18)
            return false;
        return {
            userAmount: this.builder.serializer.unpack("n", body.slice(1, 3))[1],
            fpAmount: this.builder.serializer.unpack("n", body.slice(4, 6))[1],
            passwordAmount: this.builder.serializer.unpack("n", body.slice(7, 9))[1],
            cardAmount: this.builder.serializer.unpack("n", body.slice(10, 12))[1],
            allRecordAmount: this.builder.serializer.unpack("n", body.slice(13, 15))[1],
            newRecordAmount: this.builder.serializer.unpack("n", body.slice(16, 18))[1]
        }
    }
}

module.exports = Method;