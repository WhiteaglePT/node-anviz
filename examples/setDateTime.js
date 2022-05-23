const Request = require("../lib/request.js"),
	  fs = require("fs");

let request = new Request("10.10.10.8"); // replace with your device ip

// Set date parameter to the value you want to set on the device.
request.execute("setDateTime", 1, new Date()).then((res, raw) => {
	console.info(res);
	request.close();
}, (err) => {
	console.info("ERROR", err);
});
