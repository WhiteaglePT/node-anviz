const EventEmitter = require('events').EventEmitter,
	  Socket = require('./socket.js'),
	  operations = require('./operations.js');

class Request extends EventEmitter {
	constructor(host, port = 5010, timeout = 0) {
		super();
		this.connected = false;
		this.waittingConnection = null;
		this.queryResolve = null;
		this.queryReject = null;

	    this.socket = new Socket(host, port, timeout);
	    this.socket.on("connect", this.onSocketConnect.bind(this))
	    		   .on("response", this.onSocketResponse.bind(this))
				   .connect();
	}

	close() {
		this.socket.close();
	}

	onSocketConnect(cmd) {
		this.connected = true;
		if(typeof this.waittingConnection === "function") {
			this.waittingConnection();
			this.waittingConnection = null;
		}
	}

	onSocketResponse(data) {
		if(data[0] == 0xA5) {
			let device = data[1] + data[2] + data[3] + data[4];
			let cmd = (data[5] - 0x80);
			let ack = data[6];
			let len = data[7] + data[8];
			let body = [];
			for(let i = 9; i < data.length - 2; i++)
				body.push(data[i]);
			body = Buffer.from(body);
			let crc = Buffer.from([ data[data.length - 2], data[data.length - 1] ]); // CRC has been prechecked.

			cmd = operations._map[cmd];
			if(!operations[cmd]) {
				let error = new Error("[node-anviz] [Request data] Invalid operation from server '"+cmd+"'.");
				if(this.queryReject)
					this.queryReject(error);
				else
					this.emit("error", error);

				this.queryResolve = null;
				this.queryReject = null;

				return;
			}

			let rawResponse = {
				device: device,
				cmd: cmd,
				ack: ack,
				len: len,
				body: body,
				crc: crc
			};
			let response = operations[cmd].response(device, cmd, ack, len, body, crc);
			if(response) {
				if(this.queryResolve)
					this.queryResolve(response, rawResponse);
				else
					this.emit("complete", response, rawResponse);
			}
			else {
				if(this.queryReject)
					this.queryReject("error", new Error("[node-anviz] [Request data] Error parsing response."), rawResponse);
				else
					this.emit("error", new Error("[node-anviz] [Request data] Error parsing response."), rawResponse);
			}

			this.queryResolve = null;
			this.queryReject = null;
		}
	}

	waitConnection(callback) {
	    if(this.connected)
	    	callback();
	    else
	    	this.waittingConnection = callback;
	}

	execute(cmd, device, data, onSuccess, onError) {
		return new Promise((resolve, reject) => {
			// Implement your own mutex/signal/sync logic please.
			// Do not rely on the lib - make sure you make only one request at a time.
			if(this.queryResolve || this.waittingConnection)
				return reject(new Error("[node-anviz] [Request execute] There's already another operation in progress."));
			
			try {
				this.waitConnection(() => {
					if(!operations[cmd]) {
						throw new Error("[node-anviz] [Request execute] Invalid operation '"+cmd+"'.");
						return;
					}

					this.queryResolve = resolve;
					this.queryReject = reject;
					this.socket.write(operations[cmd].body(device, data));
				});
			} catch(err) {
				reject(err);
			}
		});
	}


}

module.exports = Request;

