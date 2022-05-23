const Request = require("../lib/request.js"),
	  fs = require("fs");

let request = new Request("10.0.0.6"); // replace with your device ip

let user_code = 1; // replace with your user code

request.execute("uploadRecord", 1, { usercode: user_code, date: new Date() }).on("error", function(err) {
	console.info("ERROR", err);
}).on("complete", function(res, raw){
	console.info(res);
	request.close();
});