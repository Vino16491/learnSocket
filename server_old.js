var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

    socket.on('connect', (msg) => {
        console.log(msg);
        io.emit('connect', 'Welcome to Socket' + msg)
    });


    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg.length+ 'edit');
        io.emit('connect', 'OK From Server')
    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
        io.emit('disconnect', 'user disconnected')
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});