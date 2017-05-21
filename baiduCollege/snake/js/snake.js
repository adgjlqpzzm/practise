/**
 * Created by Jaxon on 2017/3/10.
 */

'use strict';

var Snake = (function () {

	/**
	 * 蛇类
	 * @constructor
	 */
	function Snake() {

		//蛇前行的方向
		this.direction = '';
		//记录蛇前行按键的数组
		this.directionArr = [];
		//蛇的长度
		this.length = 0;
		//蛇的身体位置数组
		this.body = [];

		this.init();

	}

	Snake.prototype = {

		constructor: Snake,
		init: function () {

			this.direction = 'right';
			this.length = 3;
			this.body = [[4, 2], [3, 2], [2, 2]];
			this.directionArr = ['right'];

		},
		move:function () {

			this.head = this.body[0];
			this.tail = this.body[this.body.length - 1];
			this.nextTarget = null;

			switch (this.directionArr[this.directionArr.length - 1]) {
				case 'left':
					//向左走
					this.nextTarget = [this.head[0] - 1, this.head[1]];
					this.body.unshift(this.nextTarget);
					break;
				case 'up':
					//向上走
					this.nextTarget = [this.head[0], this.head[1] - 1];
					this.body.unshift(this.nextTarget);
					break;
				case 'right':
					//向右走
					this.nextTarget = [this.head[0] + 1, this.head[1]];
					this.body.unshift(this.nextTarget);
					break;
				case 'down':
					//向下走
					this.nextTarget = [this.head[0], this.head[1] + 1];
					this.body.unshift(this.nextTarget);
					break;
			}

			this.body.pop();

			//运动一次之后储存蛇运动方向的数组重置
			this.direction = this.directionArr[this.directionArr.length - 1];
			this.directionArr = [this.direction];

		},

	}

	return Snake;

})();
