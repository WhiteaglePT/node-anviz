/* 1．Get the information of T&A device 1*/
const CMD = 0x30;

class Method {
	constructor(builder) {
		this.builder = builder;
		this.CMD = CMD;
	}

	body(device, data) {
		return this.builder.createRequest(device, this.CMD, data);
	}

	response(device, cmd, ack, len, body, crc) {
		if(body.length != 18)
			return false;


		let comPwLengthByte = body[8],
			ccomPwLengthBits = [],
			comPwByte = body.slice(9, 2);

		for (let i = 0; i < 8; i++)
		   ccomPwLengthBits.push(comPwLengthByte & (1 << i) ? 1 : 0);

		let passwordLength = parseInt("" + ccomPwLengthBits[7] + ccomPwLengthBits[4], 2),
			comPassword = parseInt("" + ccomPwLengthBits[3] + ccomPwLengthBits[0], 2) + comPwByte;

		if(passwordLength == 0)
			comPassword = null;

		let dateTimeByte = body[14],
			dateTimeBits = [];

		for (let i = 0; i < 8; i++)
		   dateTimeBits.push(dateTimeByte & (1 << i) ? 1 : 0);
		let date = parseInt("" + dateTimeBits[7] + dateTimeBits[4], 2),
			time = parseInt("" + dateTimeBits[3] + dateTimeBits[0], 2);

		let commandVersion = 0;
		if(body[17] == 0x01)
			commandVersion = 1;
		else if(body[17] == 0x02)
			commandVersion = 2;

		return {
			firmwareVersion:			body.slice(0, 8).toString(),
			comPasswordLength: 			passwordLength,
			comPassword:	 			comPassword,
			sleepTime:				 	body[11],
			volume:					 	body[12],
			language:				 	body[13],
			dateTimeFormat:			 	[date, time],
			attendanceState:			body[15],
			languageSetting:			body[16] == 0x10,
			commandVersion:			 	commandVersion
		};
	}
}

module.exports = Method;