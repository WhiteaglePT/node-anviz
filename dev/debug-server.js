const net = require('net');

const server = net.createServer();
server.listen(5010, "0.0.0.0", () => {
    console.log('TCP Server is running.');
});

function chunk(str, n) {
    var ret = [];
    var i;
    var len;

    for(i = 0, len = str.length; i < len; i += n) {
       ret.push(str.substr(i, n))
    }

    return ret
};

server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);

    sock.on('data', function(data) {
        console.log(sock.remoteAddress, [], chunk(Buffer.from(data).toString('hex').toUpperCase(), 2).join(" "));
        //sock.write(sock.remoteAddress + ':' + sock.remotePort + " said " + data + '\n');
    });
});