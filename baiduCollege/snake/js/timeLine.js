/**
 * Created by Jaxon, on 2017/3/10.
 */

'use strict';

var TimeLine = (function () {

	//默认间隔时间
	var DEFAULT_INTERVAL = 1000 / 600;

	//设置状态
	var STATE_INITIAL = 0;
	var STATE_START = 1;
	var STATE_STOP = 2;

	//raf
	var requestAnimationFrame = (function () {

		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			function (callback) {
				return window.setTimeout(callback, callback.interval || DEFAULT_INTERVAL);
			}

	})();

	//caf
	var cancelAnimationFrame = (function () {

		return window.cancelAnimationFrame ||
			window.webkitCancelAnimationFrame ||
			window.mozCancelAnimationFrame ||
			window.oReCancelAnimationFrame ||
			function (id) {
				return window.clearTimeout(id);
			};

	})();

	/**
	 * 时间轴类
	 * @constructor
	 */
	function TimeLine() {

		this.animationHandler = 0;
		this.state = STATE_INITIAL;

	}

	TimeLine.prototype = {

		constructor: TimeLine,

		//动画开始
		start: function (interval) {

			if (this.state == STATE_START) {
				return;
			}
			this.state = STATE_START;
			this.interval = interval || DEFAULT_INTERVAL;
			//+new Date()用于将时间数据转换格式
			this.startTimeLine(+new Date());

		},

		//动画结束
		stop: function () {

			if (this.state != STATE_START) {
				return;
			}
			this.state = STATE_STOP;
			if (this.startTime) {
				this.durTime = +new Date() - this.startTime;
			}
			cancelAnimationFrame(this.animationHandler);

		},

		//重新开启动画
		reStart: function () {

			if (this.state == STATE_START) {
				return;
			}
			if (!this.interval || !this.durTime) {
				return;
			}
			this.state = STATE_START;
			this.startTimeLine(+new Date() - this.durTime);

		},

		//时间轴动画开启
		startTimeLine: function (startTime) {

			var that = this;

			this.startTime = startTime;
			nextTick.interval = this.interval;

			//记录上一次回调的时间轴
			var lastTick = +new Date();
			nextTick();

			function nextTick() {

				var now = +new Date();
				that.animationHandler = requestAnimationFrame(nextTick);

				if (now - lastTick >= that.interval) {

					that.onenterFrame();
					lastTick = now;

				}

			}

		},

		//获取运行时间
		getRunTime: function () {

			if (this.startTime) {
				return +new Date() - this.startTime;
			}
			else {
				return 0;
			}

		},

		//每一帧执行的函数
		onenterFrame: function () {

		}

	}

	return TimeLine;

})();
