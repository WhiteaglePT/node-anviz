/* 11．Upload T&A records */
const CMD = 0x41;

class Method {
    constructor(builder) {
        this.builder = builder;
        this.CMD = CMD;
    }

    body(device, data) {
        let buffer = [],
            bytes,
            dateTime = Math.trunc((data.date.getTime() - (new Date("2000-01-01 23:00:00").getTime())) / 1000);
        buffer.push(0x00);

        // UserCode 1-5
        // DateTime 6-9
        // BackupCode 10 (= 0)
        // RecordType 11 (= 0)
        // WorkCode 12-14 (= 0)

        this.builder.writeInt4Bytes(data.usercode, buffer); // UserCode
        this.builder.writeInt4Bytes(dateTime, buffer); // DateTime
        buffer.push(0x08); // BackupCode
        buffer.push(0x80); // RecordType 
        buffer.push(0x00); // WorkCode
        buffer.push(0x00);

        return this.builder.createRequest(device, this.CMD, buffer);
    }

    response(data) {
        return true;
    }
}

module.exports = Method;