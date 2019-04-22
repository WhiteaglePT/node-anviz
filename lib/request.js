const EventEmitter = require('events').EventEmitter,
	  Socket = require('./socket.js'),
	  operations = require('./operations.js');

class ServerResponse extends EventEmitter {}

class Request extends EventEmitter {
	constructor(host, port = 5010, timeout = 0) {
		super();
		this.connected = false;
		this.awaittingResolve = null;
		this.answerEmitter = null;

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
		if(typeof this.awaittingResolve === "function") {
			this.awaittingResolve();
			this.awaittingResolve = null;
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
				if(this.answerEmitter) {
					let localEmit = this.answerEmitter;
					this.answerEmitter = null;
					localEmit.emit("error", error);
				}
				else
					this.emit("error", error);
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
			if(this.answerEmitter) {
				let localEmit = this.answerEmitter;
				this.answerEmitter = null;
				if(response)
					localEmit.emit("complete", response, rawResponse);
				else
					localEmit.emit("error", new Error("[node-anviz] [Request data] Error parsing response."), rawResponse);
			}
			else {
				if(response)
					this.emit("complete", response, rawResponse);
				else
					this.emit("error", new Error("[node-anviz] [Request data] Error parsing response."), rawResponse);
			}
		}
	}

	waitConnection(cb) {
		cb = cb.bind(this);

	    if(this.connected)
	    	cb();
	    else
	    	this.awaittingResolve = cb;
	}

	execute(cmd, device, data, onSuccess, onError) {
		let emitter = new ServerResponse();
		if(this.answerEmitter || this.awaittingResolve) {
			setTimeout(function(){
				emitter.emit("error", new Error("[node-anviz] [Request execute] There's already another operation in progress."));
			}, 10);
			return emitter;
		}
		try {
			this.waitConnection(function(){
				if(!operations[cmd]) {
					throw new Error("[node-anviz] [Request execute] Invalid operation '"+cmd+"'.");
					return;
				}

				this.answerEmitter = emitter;
				this.socket.write(operations[cmd].body(device, data));
			});
		} catch(err) {
			emitter.emit("error", err);
		}
		return emitter;
	}


}

module.exports = Request;

