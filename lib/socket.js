const EventEmitter = require('events').EventEmitter,
	  net = require('net'),
	  CRC = require('./crc.js');


class Socket extends EventEmitter {
	constructor(host, port = 5010, timeout = 0) {
		super();
		this.host = host;
		this.port = port;
		this.timeout = timeout;
	}
	connect() {
	    this.connection = net.createConnection({ host: this.host, port: this.port }, this.onConnect.bind(this));
	    if(this.timeout > 0)
		    this.connection.setTimeout(this.timeout);
	    this.connection.setEncoding('hex');

	    this.connection.on('data', this.onDataReceived.bind(this));
	    this.connection.on('end', this.onEnd.bind(this));
	    this.connection.on('timeout', this.onTimeout.bind(this));
	    this.connection.on('error', this.onError.bind(this));

	    this.receiving = null;
	}

	close() {
		this.connection.end();
	}

	onConnect() {
        this.emit("connect");
	}

	onDataReceived(data) {
		let bytes = Buffer.from(data, "hex");
		if(bytes[0] == 0xA5)
			this.receiving = data;
		else {
			this.receiving += data;
			bytes = Buffer.from(this.receiving, "hex");
		}

		let hash = CRC.hash(bytes.slice(0, bytes.length - 2));
		if(hash.equals(bytes.slice(bytes.length - 2, bytes.length)))
			this.emit("response", bytes);
	}

	onEnd() {
		//console.info("Server closed connection.");
	}

	onTimeout() {
		throw new Error("[node-anviz] [socket] Server Timeout");
	}

	onError(err) {
		throw new Error(err);
	}

	write(data) {
		data = Buffer.from(data);
		this.connection.write(data);
	}
}

module.exports = Socket;