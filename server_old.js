var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {


    // recived message and send back to client on same socket
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg + ' ----------->client to server and all');
    });

    // recived message and send back to client on same socket with new date
    socket.on('chat from server', (msg) => {
        console.log('message for server: ' + msg);
        if (msg.length > 0) {
            io.emit('chat from server', 'Message Recd and accepted: ' + msg + Date.now()+ 1)           
        }

    })
    socket.on('disconnect', function () {
        console.log('user disconnected');
        io.emit('disconnect', 'user disconnected')
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});