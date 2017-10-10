/**
 * Created by Jaxon on 2017/9/10.
 */

'use strict';

function Local(socket) {

	//游戏对象
	let game;
	//时间间隔
	const INTERVAL = 200;
	//定时器
	let timer = null;
	//时间计时器
	let timeCount = 0;
	//时间
	let time = 0;

	//绑定键盘事件
	function bindKeyEvent() {
		document.onkeydown = (e) => {
			if (e.keyCode == 38) {
				//up
				game.rotate();
				socket.emit('rotate');
			}
			else if (e.keyCode == 39) {
				//right
				game.right();
				socket.emit('right');
			}
			else if (e.keyCode == 40) {
				//down
				game.down();
				socket.emit('down');
			}
			else if (e.keyCode == 37) {
				//left
				game.left();
				socket.emit('left');
			}
			else if (e.keyCode == 32) {
				//space
				game.fall();
				socket.emit('fall');
			}
		}
	}

	//计时函数
	function timeFunc() {
		timeCount += 1;
		if (timeCount == 5) {
			timeCount = 0;
			time = time + 1;
			game.setTime(time);
			socket.emit('time', time);
		}
	}

	//帧函数
	function move() {
		timeFunc();
		if (!game.down()) {
			game.fixed();
			socket.emit('fixed');
			let line = game.checkClear();
			if (line != 0) {
				game.addScore(line);
				socket.emit('line', line);
				if (line > 1){
					let bottomLines = generateBottomLine(line);
					socket.emit('bottomLines', bottomLines);
				}
			}
			let gameOver = game.checkGameOver();
			if (gameOver) {
				stop();
				document.getElementById("remote_gameover").innerHTML = 'you win!';
				socket.emit('lose');
				game.gameOver(false);
			}
			else {
				let r_type = generateType(),
					r_dir = generateDir();
				game.performNext(r_type, r_dir);
				socket.emit('next', {type: r_type, dir: r_dir});
			}
		}
		else {
			socket.emit('down');
		}
	}

	//随机生成干扰行
	function generateBottomLine(lineNum) {
		let lines = [];
		for (let i = 0; i < lineNum; i++) {
			let line = [];
			for (let j = 0; j < 10; j++) {
				line.push(Math.ceil(Math.random() * 2) - 1)
			}
			lines.push(line);
		}
		return lines;
	}

	//随机生成一个方块种类
	function generateType() {
		return Math.ceil(Math.random() * 7) - 1;
	}

	//随机生成一个旋转次数
	function generateDir() {
		return Math.ceil(Math.random() * 4) - 1;
	}

	//开始
	function start() {
		let doms = {
			gameDiv: document.getElementById("local_game"),
			nextDiv: document.getElementById("local_next"),
			timeDiv: document.getElementById("local_time"),
			scoreDiv: document.getElementById("local_score"),
			resultDiv: document.getElementById("local_gameover"),
		};
		let type = generateType(),
			dir = generateDir();
		game = new Game();
		game.init(doms, type, dir);
		socket.emit('init', {type, dir});
		bindKeyEvent();
		let r_type = generateType(),
			r_dir = generateDir();
		game.performNext(r_type, r_dir);
		socket.emit('next', {type: r_type, dir: r_dir});
		timer = setInterval(move, INTERVAL);
	}

	//结束
	function stop() {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
		document.onkeydown = null;
	}

	socket.on('start', function () {
		document.getElementById("waiting").innerHTML = '';
		start();
	});
	socket.on('lose', function () {
		game.gameOver(true);
		stop();
	});
	socket.on('leave', function () {
		document.getElementById("local_gameover").innerHTML = '对方掉线';
		document.getElementById("remote_gameover").innerHTML = '已掉线';
	});
	socket.on('bottomLines', function (data) {
		game.addTailLines(data);
		socket.emit('addTailLines',data);
	});

}





























