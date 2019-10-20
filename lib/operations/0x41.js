/* 11．Upload T&A records */
const pack = require('php-pack').pack;

const CMD = 0x41;

class Method {
    constructor(builder) {
        this.builder = builder;
        this.CMD = CMD;
    }

    body(device, data) {
        let bytes = [];
        bytes.push(0x00);

        // UserCode 1-5
        // DateTime 6-9
        // BackupCode 10 (= 0)
        // RecordType 11 (= 0)
        // WorkCode 12-14 (= 0)

        let uc = pack('N', data.usercode);
        bytes.push(uc[0]);
        bytes.push(uc[1]);
        bytes.push(uc[2]);
        bytes.push(uc[3]);

        const dd = Math.trunc((data.date.getTime() - (new Date("2000-01-01 23:00:00").getTime())) / 1000);
        uc = pack('N', dd);
        bytes.push(uc[0]);
        bytes.push(uc[1]);
        bytes.push(uc[2]);
        bytes.push(uc[3]);

        bytes.push(0x08); // BaclupCode
        bytes.push(0x80); // RecordType 

        bytes.push(0x00); // WorkCode
        bytes.push(0x00);

        return this.builder.createRequest(device, this.CMD, bytes);
    }

    response(data) {
        return true;
    }
}

module.exports = Method;