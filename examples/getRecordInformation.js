const Request = require("../lib/request.js"),
	  fs = require("fs");

let request = new Request("10.0.0.6"); // replace with your device ip

request.execute("getRecordInformation", 1).on("error", function(err) {
	console.info("ERROR", err);
}).on("complete", function(res, raw){
	console.info(res);
	request.close();
});