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
            userAmount: this.builder.readInt2Bytes(body.slice(1, 3)),
            fpAmount: this.builder.readInt2Bytes(body.slice(4, 6)),
            passwordAmount: this.builder.readInt2Bytes(body.slice(7, 9)),
            cardAmount: this.builder.readInt2Bytes(body.slice(10, 12)),
            allRecordAmount: this.builder.readInt2Bytes(body.slice(13, 15)),
            newRecordAmount: this.builder.readInt2Bytes(body.slice(16, 18))
        }
    }
}

module.exports = Method;