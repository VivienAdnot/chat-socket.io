var http = require('http');
var fileSystem = require('fs');
var socketIO = require('socket.io');

var server = http.createServer(function(req, res) {
    fileSystem.readFile("./index.html", "utf-8", function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

var io = socketIO.listen(server);

io.sockets.on('connection', function (socket) {
    socket.on('message-toserver', function (message) {
        socket.broadcast.emit('message-fromserver', message);
    });
});

server.listen(8050);
