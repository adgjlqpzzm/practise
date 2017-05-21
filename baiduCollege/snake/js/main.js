/**
 * Created by Jaxon, on 2017/3/10.
 */

'use strict';

var Game = (function (document, undefind) {

	//普通模式
	var MODE_ORDINARY = 1;
	//过关模式
	var MODE_PASS = 2;
	//躲避模式
	var MODE_AVOID = 3;
	//游戏状态
	var STATE_STOP = 0;
	var STATE_START = 1;
	var STATE_INITIAL = 2;

	//默认配置：速度,金币数目,增加速度的时间间隔,普通模式的长高，躲避模式的长高
	var SPEED_INITIAL = 5;
	var MONEY_INITIAL = 6;
	var INTERVAL_INITIAL = 10000;
	var ORDINARY_INITIAL = [22, 22];
	var PASS_INITIAL = [15, 15]
	var AVOID_INITIAL = [32, 24];

	var game = null;
	//躲避模式的map
	var maps = [[{pos: [3, 3], type: 'wall'}, {pos: [3, 4], type: 'wall'}, {pos: [3, 5], type: 'wall'}, {
		pos: [3, 8],
		type: 'wall'
	}, {pos: [3, 9], type: 'wall'}, {pos: [3, 10], type: 'wall'}, {pos: [3, 13], type: 'wall'}, {
		pos: [3, 14],
		type: 'wall'
	}, {pos: [3, 15], type: 'wall'}, {pos: [3, 18], type: 'wall'}, {pos: [3, 19], type: 'wall'}, {
		pos: [3, 20],
		type: 'wall'
	},
		{pos: [4, 3], type: 'wall'}, {pos: [4, 20], type: 'wall'}, {pos: [5, 3], type: 'wall'}, {
			pos: [5, 20],
			type: 'wall'
		}, {pos: [8, 3], type: 'wall'}, {pos: [8, 20], type: 'wall'}, {pos: [9, 3], type: 'wall'}, {
			pos: [9, 20],
			type: 'wall'
		}, {pos: [10, 3], type: 'wall'}, {pos: [10, 20], type: 'wall'}, {pos: [13, 3], type: 'wall'}, {
			pos: [13, 20],
			type: 'wall'
		}, {pos: [14, 3], type: 'wall'}, {pos: [14, 20], type: 'wall'}, {pos: [15, 3], type: 'wall'}, {
			pos: [15, 20],
			type: 'wall'
		}, {pos: [18, 3], type: 'wall'}, {pos: [18, 20], type: 'wall'}, {pos: [19, 3], type: 'wall'}, {
			pos: [19, 20],
			type: 'wall'
		}, {pos: [20, 3], type: 'wall'}, {pos: [20, 4], type: 'wall'}, {pos: [20, 5], type: 'wall'}, {
			pos: [20, 8],
			type: 'wall'
		}, {pos: [20, 9], type: 'wall'}, {pos: [20, 10], type: 'wall'}, {pos: [20, 13], type: 'wall'}, {
			pos: [20, 14],
			type: 'wall'
		}, {pos: [20, 15], type: 'wall'}, {pos: [20, 18], type: 'wall'}, {pos: [20, 19], type: 'wall'}, {
			pos: [20, 20],
			type: 'wall'
		}, {pos: [8, 8], type: 'wall'}, {pos: [8, 9], type: 'wall'}, {pos: [8, 10], type: 'wall'}, {
			pos: [8, 13],
			type: 'wall'
		}, {pos: [8, 14], type: 'wall'}, {pos: [8, 15], type: 'wall'}, {pos: [9, 8], type: 'wall'}, {
			pos: [10, 8],
			type: 'wall'
		}, {pos: [13, 8], type: 'wall'}, {pos: [14, 8], type: 'wall'}, {pos: [15, 8], type: 'wall'}, {
			pos: [15, 9],
			type: 'wall'
		}, {pos: [15, 10], type: 'wall'}, {pos: [15, 13], type: 'wall'}, {pos: [15, 14], type: 'wall'}, {
			pos: [15, 15],
			type: 'wall'
		}, {pos: [14, 15], type: 'wall'}, {pos: [13, 15], type: 'wall'}, {pos: [10, 15], type: 'wall'}, {
			pos: [9, 15],
			type: 'wall'
		}, {pos: [9, 9], type: 'key'}, {pos: [14, 14], type: 'key'}, {pos: [23, 3], type: 'wall'}, {
			pos: [23, 3],
			type: 'wall'
		}, {pos: [23, 4], type: 'wall'}, {pos: [23, 5], type: 'wall'}, {pos: [23, 6], type: 'wall'}, {
			pos: [23, 7],
			type: 'wall'
		}, {pos: [23, 8], type: 'wall'}, {pos: [23, 9], type: 'wall'}, {pos: [23, 10], type: 'wall'}, {
			pos: [23, 11],
			type: 'wall'
		}, {pos: [23, 12], type: 'wall'}, {pos: [23, 13], type: 'wall'}, {pos: [23, 14], type: 'wall'}, {
			pos: [23, 15],
			type: 'wall'
		}, {pos: [23, 16], type: 'wall'}, {pos: [23, 17], type: 'wall'}, {pos: [23, 18], type: 'wall'}, {
			pos: [23, 19],
			type: 'wall'
		}, {pos: [23, 20], type: 'wall'}, {pos: [23, 3], type: 'wall'}, {pos: [27, 3], type: 'wall'}, {
			pos: [27, 4],
			type: 'wall'
		}, {pos: [27, 5], type: 'wall'}, {pos: [27, 6], type: 'wall'}, {pos: [27, 7], type: 'wall'}, {
			pos: [27, 8],
			type: 'wall'
		}, {pos: [27, 9], type: 'wall'}, {pos: [27, 10], type: 'wall'}, {pos: [27, 11], type: 'wall'}, {
			pos: [27, 12],
			type: 'wall'
		}, {pos: [27, 13], type: 'wall'}, {pos: [27, 14], type: 'wall'}, {pos: [27, 15], type: 'wall'}, {
			pos: [27, 16],
			type: 'wall'
		}, {pos: [27, 17], type: 'wall'}, {pos: [27, 18], type: 'wall'}, {pos: [27, 19], type: 'wall'}, {
			pos: [27, 20],
			type: 'wall'
		}, {pos: [24, 3], type: 'wall'}, {pos: [25, 3], type: 'door'}, {pos: [26, 3], type: 'wall'}, {
			pos: [24, 20],
			type: 'wall'
		}, {pos: [25, 20], type: 'door'}, {pos: [26, 20], type: 'wall'},
	],
		[{pos: [1, 1], type: 'wall'}, {pos: [5, 5], type: 'wall'}, {pos: [10, 10], type: 'wall'}]];

	/**
	 * 游戏逻辑类
	 * @constructor
	 */

	function Game() {

		game = this;
		var that = this;

		this.canvas = document.getElementById('snake');
		this.context = this.canvas.getContext('2d');

		this.timeLine = new TimeLine();
		this.snake = new Snake();
		this.timeLine.onenterFrame = game.calculate;
		//每一颗粒的边长
		this.cellLength = 25;
		//图片对象
		this.imgArr = {};
		//关卡
		this.level = 1;

		this.buttons = document.getElementsByClassName('button-box')[0].getElementsByTagName('button');

		this.imageLoader();

		//监听canvas的click事件
		this.canvas.addEventListener('click', function (e) {

			var e = e || window.event;
			var clickPos = [e.offsetX, e.offsetY];
			if (that.isPointInStartButton(clickPos)) {
				//点击开始按钮
				if (that.state == STATE_INITIAL) {
					that.state = STATE_START;
					that.start();
				}
				else if (that.state == STATE_STOP) {
					that.state = STATE_START;
					that.reStart();
				}

			}
			else if (that.isPointInPauseButton(clickPos)) {
				//点击暂停按钮
				if (that.state == STATE_START) {
					that.state = STATE_STOP;
					that.pause();
				}

			}

		});

		//监听键盘事件
		document.addEventListener('keydown', function (e) {

			var e = e || window.event;

			switch (e.keyCode) {

				case 37:
					//按下左键
					if (that.state == STATE_INITIAL) {
						that.start();
					}
					if (that.snake.direction != 'right' && that.state == STATE_START) {
						that.snake.directionArr.push('left');
					}
					break;
				case 38:
					//按下上键
					if (that.state == STATE_INITIAL) {
						that.start();
					}
					if (that.snake.direction != 'down' && that.state == STATE_START) {
						that.snake.directionArr.push('up');
					}
					break;
				case 39:
					//按下右键
					if (that.state == STATE_INITIAL) {
						that.start();
					}
					if (that.snake.direction != 'left' && that.state == STATE_START) {
						that.snake.directionArr.push('right');
					}
					break;
				case 40:
					//按下下键
					if (that.state == STATE_INITIAL) {
						that.start();
					}
					if (that.snake.direction != 'up' && that.state == STATE_START) {
						that.snake.directionArr.push('down');
					}
					break;
				case 32:
					//按下空格键
					if (that.state == STATE_STOP) {
						that.reStart();
					}
					else if (that.state == STATE_INITIAL) {
						that.start();
					}
					else if (that.state == STATE_START) {
						that.pause();
					}
					break;

			}

		});

		//模式选择按钮绑定事件
		for (var i = 0; i < this.buttons.length; i++) {

			if (this.buttons[i].classList.contains('mode-oridinary')) {
				this.buttons[i].addEventListener('click', function () {
					that.timeLine.stop();
					that.state = STATE_INITIAL;
					this.blur();
					that.init(MODE_ORDINARY);
				})
			}
			else if (this.buttons[i].classList.contains('mode-pass')) {
				this.buttons[i].addEventListener('click', function () {
					that.timeLine.stop();
					that.state = STATE_INITIAL;
					this.blur();
					that.init(MODE_PASS);
				})
			}
			else if (this.buttons[i].classList.contains('mode-avoid')) {
				this.buttons[i].addEventListener('click', function () {
					that.timeLine.stop();
					that.state = STATE_INITIAL;
					this.blur();
					that.init(MODE_AVOID);
				})
			}

		}

	}

	Game.prototype = {

		constructor: Game,

		//初始化函数
		init: function (mode, level) {

			var that = this;

			//默认为普通模式
			this.mode = mode || MODE_ORDINARY;
			if (this.mode == MODE_ORDINARY) {
				//颗粒化个数
				this.width = ORDINARY_INITIAL[0];
				this.height = ORDINARY_INITIAL[1];
			}
			else if (this.mode == MODE_PASS) {
				//颗粒化个数
				this.width = PASS_INITIAL[0];
				this.height = PASS_INITIAL[1];
			}
			else if (this.mode == MODE_AVOID) {
				//颗粒化个数
				this.width = AVOID_INITIAL[0];
				this.height = AVOID_INITIAL[1];
			}

			//对蛇进行初始化
			this.snake.init();
			//初始化canvas容器的大小
			this.canvas.width = this.width * this.cellLength + 200;
			this.canvas.height = this.height * this.cellLength;

			//游戏状态
			this.state = STATE_INITIAL;
			//游戏关卡
			this.level = level || 1;
			//速度
			this.speed = SPEED_INITIAL - 0 + (this.level - 1) * 3;
			this.interval = INTERVAL_INITIAL;
			//游戏分数
			this.score = 0;
			//游戏中金钱数量
			this.money = 0;
			//游戏中墙的数量
			this.wall = 0;
			//计算游戏中颗粒化个数
			this.block = this.width * this.height;
			//初始化数组
			this.obstacle = [];
			//钥匙数目
			this.keys = 0;

			this.generateMap(level);
			this.drawSence();

		},

		//生成地图
		generateMap: function (level) {

			var level = level - 1 || 0;

			//加入墙壁
			for (var i = 0; i < this.width; i++) {
				this.obstacle[i] = [];
				for (var j = 0; j < this.height; j++) {
					this.obstacle[i][j] = 'none';
					if (i == 0 || i == this.width - 1) {
						this.obstacle[i][j] = 'wall';
						this.wall++;
					}
					else if (j == 0 || j == this.height - 1) {
						this.obstacle[i][j] = 'wall';
						this.wall++;
					}
				}
			}
			//加入蛇
			for (var i = 0; i < this.snake.length; i++) {

				if (i != 0) {
					this.obstacle[this.snake.body[i][0]][this.snake.body[i][1]] = 'body';
				}
				else {
					this.obstacle[this.snake.body[i][0]][this.snake.body[i][1]] = 'head';
				}

			}

			//躲避模式加入特定地图
			if (this.mode == MODE_AVOID) {

				for (var i = 0; i < maps[level].length; i++) {
					this.obstacle[maps[level][i].pos[0]][maps[level][i].pos[1]] = maps[level][i].type;
				}

			}

			//加入钱
			this.addMoney(MONEY_INITIAL);

		},

		//随机加入钱
		addMoney: function (num) {

			var money = 0;
			var num = num || 1;
			var that = this;

			this.money += num;

			add();

			function add() {

				var x = Math.floor(Math.random() * that.width);
				var y = Math.floor(Math.random() * that.height);

				if (that.obstacle[x][y] == 'none') {
					that.obstacle[x][y] = 'money';
					money++;
				}

				if (money < num) {
					add();
				}

			}
		},

		//数据处理
		calculate: function () {

			game.snake.move();

			//正常模式和躲避模式增速处理
			if (game.mode == MODE_ORDINARY || game.mode == MODE_AVOID) {
				game.ordinaryHandle();
			}

			//如果吃到钱
			if (game.obstacle[game.snake.nextTarget[0]][game.snake.nextTarget[1]] == 'money') {

				game.obstacle[game.snake.nextTarget[0]][game.snake.nextTarget[1]] = 'head';
				game.obstacle[game.snake.head[0]][game.snake.head[1]] = 'body';
				game.snake.body.push(game.snake.tail);

				game.money--;
				game.score++;
				if (game.money <= MONEY_INITIAL - 1 && game.snake.body.length <= game.block - game.wall - MONEY_INITIAL) {
					game.addMoney();
				}

			}
			//如果撞墙或撞到自己
			else if (game.obstacle[game.snake.nextTarget[0]][game.snake.nextTarget[1]] == 'wall') {
				game.lost();
			}
			else if (game.obstacle[game.snake.nextTarget[0]][game.snake.nextTarget[1]] == 'body' && (game.snake.nextTarget.join() != game.snake.tail.join())) {
				game.lost();
			}
			//如果面前什么都没有
			else {
				if (game.obstacle[game.snake.nextTarget[0]][game.snake.nextTarget[1]] == 'key') {
					game.keys++;
				}
				if (game.obstacle[game.snake.nextTarget[0]][game.snake.nextTarget[1]] == 'door') {
					if (game.keys <= 0) {
						game.lost();
						return;
					}
					else {
						game.keys--;
					}
				}
				game.obstacle[game.snake.tail[0]][game.snake.tail[1]] = 'none';
				game.obstacle[game.snake.nextTarget[0]][game.snake.nextTarget[1]] = 'head';
				game.obstacle[game.snake.head[0]][game.snake.head[1]] = 'body';

			}

			//正常模式过关处理
			if (game.mode == MODE_ORDINARY) {
				if (game.snake.body.length == game.block - game.wall) {
					game.win();
				}
			}
			//过关模式和躲避模式过关处理
			else if (game.mode == MODE_PASS || game.mode == MODE_AVOID) {
				if (game.snake.body.length >= game.width * game.height / 8) {
					game.win();
				}
			}


			//场景绘制
			game.drawSence();

		},

		//进行场景绘制
		drawSence: function () {

			var context = this.context;
			var width = this.width * this.cellLength;
			var height = this.height * this.cellLength;
			this.clearSence();
			//画场景
			for (var i = 0; i < this.obstacle.length; i++) {
				for (var j = 0; j < this.obstacle[i].length; j++) {

					switch (this.obstacle[i][j]) {
						case 'wall':
							context.drawImage(this.imgArr.wallImg, i * this.cellLength, j * this.cellLength, this.cellLength, this.cellLength);
							break;
						case 'body':
							context.drawImage(this.imgArr.bodyImg, i * this.cellLength, j * this.cellLength, this.cellLength, this.cellLength);
							break;
						case 'head':
							context.drawImage(this.imgArr.headImg, i * this.cellLength, j * this.cellLength, this.cellLength, this.cellLength);
							break;
						case 'money':
							context.drawImage(this.imgArr.moneyImg, i * this.cellLength, j * this.cellLength, this.cellLength, this.cellLength);
							break;
						case 'door':
							context.drawImage(this.imgArr.doorImg, i * this.cellLength, j * this.cellLength, this.cellLength, this.cellLength);
							break;
						case 'key':
							context.drawImage(this.imgArr.keyImg, i * this.cellLength, j * this.cellLength, this.cellLength, this.cellLength);
							break;

					}

				}
			}
			//画面板
			context.font = 'bolder 36px Verdana';
			var gradient = context.createLinearGradient(width + 20, height / 8 - 24, width + 180, height * 6 / 8 + 24);
			gradient.addColorStop(0, "magenta");
			gradient.addColorStop(0.5, "blue");
			gradient.addColorStop(1, "red");
			context.textAlign = 'center';
			context.textBaseline = 'middle';
			context.strokeStyle = gradient;
			context.lineWidth = 2;
			context.strokeText('Scores:', width + 100, height / 8);
			context.strokeText(this.score, width + 100, height * 2 / 8);
			context.strokeText('Speed:', width + 100, height * 3 / 8);
			context.strokeText(this.speed, width + 100, height * 4 / 8);
			//画开始暂停按钮
			context.font = 'bolder 48px 楷体';
			context.strokeText('开始', width + 100, height * 5.5 / 8);
			context.strokeRect(width + 50, height * 5.5 / 8 - 24, 102, 48);
			context.strokeText('暂停', width + 100, height * 6.8 / 8);
			context.strokeRect(width + 50, height * 6.8 / 8 - 24, 102, 48);

		},

		//清理画布
		clearSence: function () {

			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		},

		//开始
		start: function () {

			this.state = STATE_START;
			this.timeLine.start(1000 / this.speed);

		},

		//停止
		stop: function () {

			this.state = STATE_STOP;
			this.timeLine.stop();

		},

		//暂停
		pause: function () {

			this.state = STATE_STOP;
			this.timeLine.stop();
			this.context.drawImage(this.imgArr.pauseImg, 0, 0, this.width * this.cellLength, this.height * this.cellLength);

		},

		//暂停后重新开始
		reStart: function () {

			this.state = STATE_START;
			this.calculate();
			this.timeLine.reStart();

		},

		//预加载图片
		imageLoader: function () {

			var count = 0;
			var that = this;

			this.imgArr.wallImg = new Image();
			this.imgArr.wallImg.src = './img/wall.png';
			this.imgArr.bodyImg = new Image();
			this.imgArr.bodyImg.src = './img/body.png';
			this.imgArr.headImg = new Image();
			this.imgArr.headImg.src = './img/head.png';
			this.imgArr.moneyImg = new Image();
			this.imgArr.moneyImg.src = './img/money.png';
			this.imgArr.pauseImg = new Image();
			this.imgArr.pauseImg.src = './img/pause.jpg';
			this.imgArr.doorImg = new Image();
			this.imgArr.doorImg.src = './img/door.png';
			this.imgArr.keyImg = new Image();
			this.imgArr.keyImg.src = './img/key.png';


			for (var key in this.imgArr) {
				this.imgArr[key].onload = function () {
					count++;
					if (count == 5) {
						that.init(MODE_ORDINARY);
					}
				}
			}

		},

		//判断是否点击了开始
		isPointInStartButton: function (point) {

			this.context.beginPath();
			this.context.rect(this.width * this.cellLength + 50, this.height * this.cellLength * 5.5 / 8 - 24, 102, 50);
			if (this.context.isPointInPath(point[0], point[1])) {
				return true;
			}
			else {
				return false;
			}

		},

		//判断是否点击了暂停
		isPointInPauseButton: function (point) {

			this.context.beginPath();
			this.context.rect(this.width * this.cellLength + 50, this.height * this.cellLength * 6.5 / 8 - 24, 102, 50);
			if (this.context.isPointInPath(point[0], point[1])) {
				return true;
			}
			else {
				return false;
			}

		},

		//赢的时候
		win: function () {

			if (this.mode == MODE_PASS || this.mode == MODE_AVOID) {
				this.passWinHandle();
			}
			else {
				alert('you win !');
				this.timeLine.stop();
				this.init(this.mode);
			}

		},

		//输的时候
		lost: function () {

			if (this.mode == MODE_PASS || this.mode == MODE_AVOID) {
				this.passLoseHandle();
			}
			else {
				alert('you lose ! 最终得分:' + this.score + ';');
				this.timeLine.stop();
				this.init(this.mode);
			}

		},

		//正常模式处理
		ordinaryHandle: function () {

			if (game.timeLine.getRunTime() - game.interval * (game.speed - SPEED_INITIAL + 1) >= 0) {
				game.speed++;
				game.timeLine.interval = 1000 / game.speed;
			}

		},

		//过关的两种模式过关的处理
		passWinHandle: function () {

			this.timeLine.stop();
			if (this.mode == MODE_PASS) {
				alert('下一关！');
				this.init(this.mode, ++this.level);
			}
			else if (this.mode == MODE_AVOID) {
				if (this.level < maps.length) {
					alert('下一关！');
					this.init(this.mode, ++this.level);
				}
				else {
					alert('恭喜通关');
					this.init(this.mode);
				}
			}

		},

		//过关的两种模式失败的处理
		passLoseHandle: function () {

			alert('过关失败 ! 重新开始本关');
			this.timeLine.stop();
			this.init(this.mode, this.level);

		},

		//躲避模式处理
		avoidHandle: function () {


		},

	};

	return Game;

})(document, undefined);

