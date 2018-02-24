/**
 * Created by Administrator on 2016/12/10.
 */

//引入需求模块
var http = require('http'),
	express = require('express'),
	sio = require('socket.io'),
	path = require('path');

//创建服务
var app = express(),
	server = http.createServer(app);


//设置路由
app.get('/starchat.html', function (req, res) {

	res.sendFile(__dirname + '/starchat.html');

});
app.get('/*.js', function (req, res) {

	res.sendFile(__dirname + req.url);

});

//设置监听端口
server.listen(10086);

//socket.io
var io = sio.listen(server),
	names = [];

io.sockets.on('connection', function (socket) {

	socket.on('login', function (name) {

		for (var i = 0; i < names.length; i++) {
			if (names[i] == name) {
				socket.emit('duplicate');
				return;
			}
		}
		names.push(name);
		io.sockets.emit('login', name);
		io.sockets.emit('sendClients', names);

	});

	socket.on('chat', function (data) {

		io.sockets.emit('chat', data);

	});

	socket.on('logout', function (name) {

		for (var i = 0; i < names.length; i++) {
			if (names[i] == name) {
				names.splice(i, 1);
				break;
			}
		}
		socket.broadcast.emit('logout', name);
		io.sockets.emit('sendClients', names);

	});

});

console.log('OK');
































