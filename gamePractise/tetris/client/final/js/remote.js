/**
 * Created by Administrator on 2017/9/10.
 */

'use strict';

function Remote(socket) {
	//游戏对象
	let game;

	//绑定按钮事件
	function bindEvents() {

		socket.on('init', (data) => {
			start(data.type, data.dir);
		});
		socket.on('next', (data) => {
			game.performNext(data.type, data.dir);
		});
		socket.on('rotate', (data) => {
			game.rotate();
		});
		socket.on('right', (data) => {
			game.right();
		});
		socket.on('left', (data) => {
			game.left();
		});
		socket.on('down', (data) => {
			game.down();
		});
		socket.on('fall', (data) => {
			game.fall();
		});
		socket.on('fixed', (data) => {
			game.fixed();
		});
		socket.on('line', (data) => {
			game.checkClear();
			game.addScore(data);
		});
		socket.on('time', (data) => {
			game.setTime(data);
		});
		socket.on('lose', (data) => {
			game.gameOver(false);
		});
		socket.on('addTailLines', (data) => {
			game.addTailLines(data);
		});

	}

	//开始
	function start(type, dir) {

		let doms = {
			gameDiv: document.getElementById("remote_game"),
			nextDiv: document.getElementById("remote_next"),
			timeDiv: document.getElementById("remote_time"),
			scoreDiv: document.getElementById("remote_score"),
			resultDiv: document.getElementById("remote_gameover"),
		};
		game = new Game();
		game.init(doms, type, dir);

	}

	bindEvents();

}







