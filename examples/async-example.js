const Request = require("../lib/request.js"),
	  fs = require("fs");

async function asyncExample() {
	let request = new Request("10.10.10.8"); // replace with your device ip

	let info1 = await request.execute("getInformation1", 1),
		info2 = await request.execute("getInformation2", 1);

	console.info("Response:", info1, info2);

	request.close();
}

asyncExample();