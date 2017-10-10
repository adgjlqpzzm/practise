/**
 * Created by Administrator on 2017/9/12.
 */

'use strict';

let app = require('http').createServer();
let io = require('socket.io')(app);

const PORT = 3000;

//客户端计数
let clientCount = 0;
//用来存储客户端socket
let socketMap = {};

app.listen(PORT);

function bindListener(socket,event) {
	socket.on(event, (data) => {
		if (socket.clientNum % 2 == 0){
			if (socketMap[socket.clientNum - 1]){
				socketMap[socket.clientNum - 1].emit(event, data);
			}
		}
		else{
			if (socketMap[socket.clientNum + 1]){
				socketMap[socket.clientNum + 1].emit(event, data);
			}
		}
	});
}

io.on('connection',  (socket) => {

	clientCount += 1;
	socket.clientNum = clientCount;
	socketMap[clientCount] = socket;

	if (clientCount % 2 == 1) {
		socket.emit('waiting','waiting for another person');
	}
	else {
		if (socketMap[(clientCount - 1)]){
			socket.emit('start');
			socketMap[(clientCount - 1)].emit('start');
		}
		else{
			socket.emit('leave');
		}
	}

	bindListener(socket, 'init');
	bindListener(socket, 'next');
	bindListener(socket, 'rotate');
	bindListener(socket, 'left');
	bindListener(socket, 'right');
	bindListener(socket, 'down');
	bindListener(socket, 'fall');
	bindListener(socket, 'fixed');
	bindListener(socket, 'line');
	bindListener(socket, 'time');
	bindListener(socket, 'lose');
	bindListener(socket, 'bottomLines');
	bindListener(socket, 'addTailLines');

	socket.on('disconnect', () => {
		if (socket.clientNum % 2 == 0){
			if (socketMap[socket.clientNum - 1]){
				socketMap[socket.clientNum - 1].emit('leave');
			}
		}
		else{
			if (socketMap[socket.clientNum + 1]){
				socketMap[socket.clientNum + 1].emit('leave');
			}
		}
		delete(socketMap[socket.clientNum]);
	});

});

console.log('websocket listening on port ' + PORT);











