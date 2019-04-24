const Request = require("../lib/request.js"),
	  fs = require("fs");

let request = new Request("192.168.1.192");

request.execute("getInformation1", 1).on("error", function(err) {
	console.info("ERROR", err);
}).on("complete", function(res, raw){
	console.info(res);
});