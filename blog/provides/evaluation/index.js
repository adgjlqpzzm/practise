'use strict';

const http = require('http'),
	socketIO = require('socket.io');

const getPostData = require('./getInfor'),
	finalPost = require('./finalPost.js');

function _evaluation(logMsg, socket) {
	getPostData.getPostData(logMsg, socket)
		.then(function (data) {
			if (data) {
				socket.emit('message', '登录成功');
				let inform = data.inform,
					postData = data.postData;
				finalPost.finalPost(logMsg, inform, postData, socket);
			}
			else{
				socket.emit('errMsg', '学号或密码错误');
			}
		})
		.catch(function (err) {
			if (err) {
				console.log(err);
			}
		});
}

function evaluation() {
	const server = http.createServer();
	let io = socketIO(server);
	server.listen(3001);

	io.on('connection', socket => {
		// console.log('connection');
		let logMsg = {};
		socket.on('msg', function (msg) {
			logMsg = JSON.parse(msg);
			socket.emit('message', '连接成功，开始评教');
			_evaluation(logMsg, socket);
		});
	});
}

module.exports = {
	evaluation
};
