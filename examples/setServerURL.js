const Request = require("../lib/request.js"),
	  fs = require("fs");

let request = new Request("10.10.10.8"); // replace with your device ip

// Args should be DNS ip and server URL.
request.execute("setServerURL", 1, "1.1.1.1", "server-url").on("error", function(err) {
	console.info("ERROR", err);
}).on("complete", function(res, raw){
	console.info(res);
	request.close();
});
