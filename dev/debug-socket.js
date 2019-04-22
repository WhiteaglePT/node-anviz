const Socket = require("../lib/socket.js");

let socket = new Socket("127.0.0.1");
socket.on("connect", function(){
	console.info("SOCKET CONNECTED!");
});
socket.connect();