const Request = require("../lib/request.js"),
	  fs = require("fs");

let request = new Request("10.10.10.8"); // replace with your device ip

request.execute("getNetworkConfiguration", 1).then((res, raw) => {
	console.info(res);
	request.close();
}, (err) => {
	console.info("ERROR", err);
});
