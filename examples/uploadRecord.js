const Request = require("../lib/request.js"),
	  fs = require("fs");

let request = new Request("10.0.0.6"); // replace with your device ip

let user_code = 1; // replace with your user code

request.execute("uploadRecord", 1, { usercode: user_code, date: new Date() }).then((res, raw) => {
	console.info(res);
	request.close();
}, (err) => {
	console.info("ERROR", err);
});