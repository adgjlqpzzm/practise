/**
 * Created by Jaxon, on 2017/2/25.
 */

'use strict';

(function (document, undefined) {

	var BOARDRECT = {x: 0, y: 0, len: 500, hei: 500};
	var BELTRECT = {x: BOARDRECT.len + BOARDRECT.x + 20, y: BOARDRECT.y, len: 30, hei: BOARDRECT.hei};

	/**
	 * canvas类
	 * @param id  传入canvas标签的id
	 * @constructor
	 */
	function Canvas(id) {

		this.canvas = document.getElementById(id);
		this.context = this.canvas.getContext("2d");
		//色板点击点位置，初始值为-1为不绘制
		this.boardPos = [-1, -1];
		//色带点击点位置，初始值为-1为不绘制
		this.beltPos = [-1, -1];
		this.beltColorData = {};
		this.boardColorData = {data: []};

		this.midColor = null;


		this.init();

	}

	Canvas.prototype = {
		//将Canvas类的prototype对象的constructor属性设置为Canvas
		constructor: Canvas,
		//Canvas类实例化时进行的初始化函数，为canvas标签绑定事件与初始化处理
		init: function () {

			var that = this;
			var isDown = false;
			this.canvas.addEventListener('mousedown', function (e) {
				var e = e || window.event;
				isDown = true;
				that.checkChangePoint(e);
			});
			this.canvas.addEventListener('mousemove', function (e) {
				var e = e || window.event;
				if (isDown) {
					that.checkChangePoint(e);
				}
			});
			this.canvas.addEventListener('mouseup', function (e) {
				var e = e || window.event;
				isDown = false;
			});
			document.addEventListener('mouseup', function (e) {
				var e = e || window.event;
				isDown = false;
			});

			this.drawColorBoard();

		},
		//进行面板及色带的绘制
		drawColorBoard: function (midColor) {

			var context = this.context;
			//决定色板渐变色的绘制
			this.midColor = midColor || this.midColor || 'rgb(160,200,255)';

			context.strokeStyle = "#E8E3E3";
			context.lineWidth = 2;
			context.lineJoin = 'round';

			context.strokeRect(BOARDRECT.x, BOARDRECT.y, BOARDRECT.len, BOARDRECT.hei);
			context.strokeRect(BELTRECT.x, BELTRECT.y, BELTRECT.len, BELTRECT.hei);

			var tapeGradient = context.createLinearGradient(0, 0, 0, 500);
			tapeGradient.addColorStop(0, 'rgb(222,222,222)');
			tapeGradient.addColorStop(0.125, 'rgb(255,255,31)');
			tapeGradient.addColorStop(0.25, 'rgb(255,31,31)');
			tapeGradient.addColorStop(0.375, 'rgb(255,31,255)');
			tapeGradient.addColorStop(0.5, 'rgb(31,31,255)');
			tapeGradient.addColorStop(0.625, 'rgb(31,255,255)');
			tapeGradient.addColorStop(0.75, 'rgb(31,255,31)');
			tapeGradient.addColorStop(0.875, 'rgb(111,111,111)');
			tapeGradient.addColorStop(1, 'rgb(88,88,88)');
			context.fillStyle = tapeGradient;
			context.fillRect(BELTRECT.x + 1, BELTRECT.y + 1, BELTRECT.len - 2, BELTRECT.hei - 2);

			var cardGredient = context.createLinearGradient(0, 0, 500, 500);
			cardGredient.addColorStop(0, 'rgb(255,255,255)');
			cardGredient.addColorStop(0.5, this.midColor);
			cardGredient.addColorStop(1, 'rgb(0,0,0)');
			context.fillStyle = cardGredient;
			context.fillRect(BOARDRECT.x + 1, BOARDRECT.y + 1, BOARDRECT.len - 2, BOARDRECT.hei - 2);

		},
		//对点击后产生的圆圈进行绘制
		drawChoosenPoint: function () {

			var context = this.context;
			context.strokeStyle = "#38f";
			context.lineWidth = 2;

			//绘制色带点击点
			if (this.beltPos[0] >= 0 && this.beltPos[1] >= 0) {
				context.beginPath();
				/**
				 * 对色带上点击产生的指示圈进行碰撞判断
				 * 若碰撞，避免超出四周范围
				 * 此处有一在边界取色取为指示圈颜色的BUG
				 * 暂时不进行碰撞检测
				 */
				// if (this.beltPos[1] < BELTRECT.y + 6) {
				// 	this.beltPos[1] = BELTRECT.y + 6;
				// }
				// else if (this.beltPos[1] + 5 > BELTRECT.y + BELTRECT.hei - 1) {
				// 	this.beltPos[1] = BELTRECT.y + BELTRECT.hei - 6;
				// }
				// if (this.beltPos[0] < BELTRECT.x + 6) {
				// 	this.beltPos[0] = BELTRECT.x + 6;
				// }
				// else if (this.beltPos[0] + 5 > BELTRECT.x + BELTRECT.len - 1) {
				// 	this.beltPos[0] = BELTRECT.x + BELTRECT.len - 6;
				// }
				context.arc(this.beltPos[0], this.beltPos[1], 3, 0, 2 * Math.PI);
				context.stroke();
			}

			//绘制色板点击点
			if (this.boardPos[0] >= 0 && this.boardPos[1] >= 0) {
				context.beginPath();
				if (this.boardPos[0] < 6) {
					this.boardPos[0] = 6;
				}
				else if (this.boardPos[0] + 5 > BOARDRECT.len - 1) {
					this.boardPos[0] = BOARDRECT.len - 6;
				}
				if (this.boardPos[1] < 6) {
					this.boardPos[1] = 6;
				}
				else if (this.boardPos[1] + 5 > BOARDRECT.hei - 1) {
					this.boardPos[1] = BOARDRECT.hei - 6;
				}
				context.arc(this.boardPos[0], this.boardPos[1], 3, 0, 2 * Math.PI);
				context.stroke();
			}

		},
		//对面板及色带重新绘制
		redrawColorBoard: function (midColor) {
			var context = this.context;
			context.clearRect(0, 0, 550, 500);

			if (midColor) {
				this.drawColorBoard(midColor);
			}
			else {
				this.drawColorBoard();
			}
			this.drawChoosenPoint();
		},
		/**
		 * 检测点是否位于对应色板矩形路径内
		 * @param point  期望格式{x:x,y:y}
		 * @returns {boolean} 如果位于路径内，返回true，否则返回false
		 */
		isPointInBoardPath: function (point) {
			var context = this.context;
			context.beginPath();
			context.rect(BOARDRECT.x + 1, BOARDRECT.y + 1, BOARDRECT.len - 2, BOARDRECT.hei - 3);
			if (context.isPointInPath(point.x, point.y)) {
				//点在路径中
				return true;
			}
			else {
				return false;
			}
		},
		/**
		 * 检测点是否位于对应色带矩形路径内
		 * @param point 期望格式{x:x,y:y}
		 * @returns {boolean} 如果位于路径内，返回true，否则返回false
		 */
		isPointInBeltPath: function (point) {
			var context = this.context;
			context.beginPath();
			context.rect(BELTRECT.x + 1, BELTRECT.y + 1, BELTRECT.len - 2, BELTRECT.hei - 3);
			if (context.isPointInPath(point.x, point.y)) {
				//点在路径中
				return true;
			}
			else {
				return false;
			}
		},
		//检测是否需要进行重绘，若需要，调用重绘方法
		checkChangePoint: function (e) {

			var context = this.context;
			var x = e.clientX - this.canvas.getBoundingClientRect().left;
			var y = e.clientY - this.canvas.getBoundingClientRect().top;

			//如果点击点在色板上
			if (this.isPointInBoardPath({x: x, y: y})) {
				this.boardPos[0] = x;
				this.boardPos[1] = y;
				this.boardColorData = context.getImageData(x, y, 1, 1);
				this.redrawColorBoard();
				//rgb面板数值发生变化
				changergbContent();
				//hsl面板数值发生变化
				changehslContent();
				//颜色显示框发生变化
				changeColorText();
			}

			//如果点击点在色带上
			else if (this.isPointInBeltPath({x: x, y: y})) {
				this.beltPos[0] = x;
				this.beltPos[1] = y;
				this.beltColorData = context.getImageData(x, y, 1, 1);
				this.redrawColorBoard('rgb(' + this.beltColorData.data[0] + ',' + this.beltColorData.data[1] + ',' + this.beltColorData.data[2] + ')');

				//如果尚未点击色板直接点击色带，直接初始化boardPos
				if (this.boardPos[0] < 1) {
					this.boardPos = [(BOARDRECT.x + BOARDRECT.len) / 2, (BOARDRECT.y + BOARDRECT.hei) / 2];
				}
				//如果尚未点击色板直接点击色带，直接初始化boardColorData
				if (this.boardColorData.data.length < 3) {
					this.boardColorData = context.getImageData(x, y, 1, 1);
				}
				//当点击色带带动色板变动，取得的颜色值随同变动
				this.boardColorData = context.getImageData(this.boardPos[0], this.boardPos[1], 1, 1)

				//rgb面板数值发生变化
				changergbContent();
				//hsl面板数值发生变化
				changehslContent();
				//颜色显示框发生变化
				changeColorText();
			}

		}

	}

	var canvas = new Canvas('canvas');
	canvas.init();

	//获取rgb的上下按钮及输入框和hsl的上下按钮及输入框
	var rgbAdder = document.getElementsByClassName('RGB-selector')[0].getElementsByClassName('btn-add');
	var rgbReducer = document.getElementsByClassName('RGB-selector')[0].getElementsByClassName('btn-reduce');
	var rgbText = document.getElementsByClassName('RGB-selector')[0].getElementsByTagName('input');
	var slAdder = document.getElementsByClassName('HSL-selector')[0].getElementsByClassName('btn-add-float');
	var slReducer = document.getElementsByClassName('HSL-selector')[0].getElementsByClassName('btn-reduce-float');
	var slText = document.getElementsByClassName('HSL-selector')[0].getElementsByClassName('num-float');
	var hAdder = document.getElementsByClassName('HSL-selector')[0].getElementsByClassName('btn-add-integer')[0];
	var hReducer = document.getElementsByClassName('HSL-selector')[0].getElementsByClassName('btn-reduce-integer')[0];
	var hText = document.getElementsByClassName('HSL-selector')[0].getElementsByClassName('num-integer')[0];

	var colorTextBox = document.getElementsByClassName('color-text')[0];
	var colorText = colorTextBox.getElementsByTagName('span');

	for (var i = 0; i < rgbAdder.length; i++) {

		(function (i) {
			rgbAdder[i].addEventListener('click', function (e) {
				if (typeof (rgbText[i].value - 0) == 'number') {
					rgbText[i].value = Math.floor(rgbText[i].value);
					if (rgbText[i].value < 255) {
						rgbText[i].value++;
					}
					else {
						rgbText[i].value = 0;
					}
				}
				rgbTextOnChange();
			});
			rgbReducer[i].addEventListener('click', function (e) {
				if (typeof (rgbText[i].value - 0) == 'number') {
					rgbText[i].value = Math.ceil(rgbText[i].value);
					if (rgbText[i].value > 0) {
						rgbText[i].value--;
					}
					else {
						rgbText[i].value = 255;
					}
				}
				rgbTextOnChange();
			});
		})(i);

	}
	for (var i = 0; i < slAdder.length; i++) {
		(function (i) {
			slAdder[i].addEventListener('click', function (e) {
				if (typeof (slText[i].value - 0) == 'number') {
					if (slText[i].value < 1) {
						slText[i].value = slText[i].value - 0 + 0.01;
						slText[i].value = (slText[i].value - 0).toFixed(2);
					}
					else {
						slText[i].value = 0;
					}
				}
				hslTextOnChange();
			});
			slReducer[i].addEventListener('click', function (e) {
				if (typeof (slText[i].value - 0) == 'number') {
					if (slText[i].value > 0) {
						slText[i].value = slText[i].value - 0 - 0.01;
						slText[i].value = Math.ceil(slText[i].value * 100) / 100;
					}
					else {
						slText[i].value = 1;
					}
				}
				hslTextOnChange();
			});
		})(i);
	}
	hAdder.addEventListener('click', function (e) {
		if (typeof (hText.value - 0) == 'number') {
			hText.value = Math.floor(hText.value);
			if (hText.value < 359) {
				hText.value++;
			}
			else {
				hText.value = 0;
			}
		}
	});
	hReducer.addEventListener('click', function (e) {
		if (typeof (hText.value - 0) == 'number') {
			hText.value = Math.floor(hText.value);
			if (hText.value > 0) {
				hText.value--;
			}
			else {
				hText.value = 359;
			}
		}
	});

	//改变rgb输入框的值
	function changergbContent() {

		for (var i = 0; i < rgbText.length; i++) {
			rgbText[i].value = canvas.boardColorData.data[i];
			rgbText[i].value = canvas.boardColorData.data[i];
			rgbText[i].value = canvas.boardColorData.data[i];
		}

	}

	//改变hsl输入框的值
	function changehslContent() {

		var hsl = rgbChangeIntohsl([canvas.boardColorData.data[0], canvas.boardColorData.data[1], canvas.boardColorData.data[2]]);
		slText[0].value = hsl[1];
		slText[1].value = hsl[2];
		hText.value = hsl[0];

	}

	//改变颜色显示框的值
	function changeColorText() {

		var hslColor = rgbChangeIntohsl([canvas.boardColorData.data[0], canvas.boardColorData.data[1], canvas.boardColorData.data[2]]);
		var cssColor = rgbChangeIntoCSS([canvas.boardColorData.data[0], canvas.boardColorData.data[1], canvas.boardColorData.data[2]]);

		colorTextBox.style.color = 'rgb(' + canvas.boardColorData.data[0] + ',' + canvas.boardColorData.data[1] + ',' + canvas.boardColorData.data[2] + ')';
		colorText[1].innerHTML = 'rgb(' + canvas.boardColorData.data[0] + ',' + canvas.boardColorData.data[1] + ',' + canvas.boardColorData.data[2] + ')';
		colorText[2].innerHTML = 'hsl(' + hslColor[0] + ',' + hslColor[1] + ',' + hslColor[2] + ')';
		colorText[0].innerHTML = cssColor;

	}

	//rgb转hsl
	function rgbChangeIntohsl(rgb) {
		//rgb为储存rgb颜色的长度为3的一维数组
		var r = rgb[0] / 255,
			g = rgb[1] / 255,
			b = rgb[2] / 255;
		var min = Math.min.apply(Array, [r, g, b]),
			max = Math.max.apply(Array, [r, g, b]);
		var h, s, l;
		//计算h的值
		if (max == min) {
			h = 0;
		}
		else if (max == r && g >= b) {
			h = 60 * (g - b) / (max - min);
		}
		else if (max == r && g < b) {
			h = 60 * (g - b) / (max - min) + 360;
		}
		else if (max == g) {
			h = 60 * (b - r) / (max - min) + 120;
		}
		else if (max == b) {
			h = 60 * (r - g) / (max - min) + 240;
		}
		//计算l的值
		l = (max + min) / 2;
		//计算s的值
		if (l == 0 || max == min) {
			s = 0;
		}
		else if (l > 0 && l <= 0.5) {
			s = (max - min) / (2 * l);
		}
		else if (l > 0.5) {
			s = (max - min) / (2 - 2 * l);
		}

		return [Math.round(h), Math.round(s * 100) / 100, Math.round(l * 100) / 100];

	}

	//hsl转rgb
	function hslChangeIntorgb(hsl) {
		//hsl为储存hsl颜色的长度为3的一维数组
		var h = hsl[0] - 0,
			s = hsl[1] - 0,
			l = hsl[2] - 0;

		var r, g, b;
		if (s == 0) {
			r = g = b = l;
		}
		else {
			var p, q, k;
			if (l < 0.5) {
				q = l * (1 + s);
			}
			else if (l >= 0.5) {
				q = l + s - (l * s);
			}
			p = 2 * l - q;
			k = h / 360;

			r = singleColorCalculation(k + 1 / 3);
			g = singleColorCalculation(k);
			b = singleColorCalculation(k - 1 / 3);

		}

		return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];

		function singleColorCalculation(k) {

			var color;

			if (k < 0) {
				k += 1;
			}
			if (k > 1) {
				k -= 1;
			}

			if (k * 6 < 1) {
				color = p + ((q - p) * 6 * k);
			}
			else if (k * 6 >= 1 && k < 0.5) {
				color = q;
			}
			else if (k >= 0.5 && 3 * k < 2) {
				color = p + ((q - p) * 6 * (2 / 3 - k));
			}
			else {
				color = p;
			}

			return color;

		}

	}

	//rgb转换为CSS color
	function rgbChangeIntoCSS(rgb) {

		//rgb为储存rgb颜色的长度为3的一维数组
		var color = '#';
		if (rgb[0] <= 16) {
			color += '0' + rgb[0].toString(16);
		}
		else {
			color += rgb[0].toString(16);
		}
		if (rgb[1] <= 16) {
			color += '0' + rgb[1].toString(16);
		}
		else {
			color += rgb[1].toString(16);
		}
		if (rgb[2] <= 16) {
			color += '0' + rgb[2].toString(16);
		}
		else {
			color += rgb[2].toString(16);
		}

		return color;

	}

	//rgb输入框数值发生变化时调用
	function rgbTextOnChange() {

		if (rgbText[0].value > 255) {
			rgbText[0].value = 255
		}
		else if (rgbText[0].value < 0) {
			rgbText[0].value = 0
		}
		if (rgbText[1].value > 255) {
			rgbText[1].value = 255
		}
		else if (rgbText[1].value < 0) {
			rgbText[1].value = 0
		}
		if (rgbText[2].value > 255) {
			rgbText[2].value = 255
		}
		else if (rgbText[2].value < 0) {
			rgbText[2].value = 0
		}

		canvas.boardColorData.data[0] = Math.round(rgbText[0].value);
		canvas.boardColorData.data[1] = Math.round(rgbText[1].value);
		canvas.boardColorData.data[2] = Math.round(rgbText[2].value);
		canvas.boardPos = [(BOARDRECT.x + BOARDRECT.len) / 2, (BOARDRECT.y + BOARDRECT.hei) / 2];
		changergbContent();
		changehslContent();
		canvas.redrawColorBoard('rgb(' + canvas.boardColorData.data[0] + ',' + canvas.boardColorData.data[1] + ',' + canvas.boardColorData.data[2] + ')');
		changeColorText();

	}

	//hsl输入框发生变化时调用
	function hslTextOnChange() {

		if (hText.value > 359) {
			hText.value = 0;
		}
		else if (hText.value < 0) {
			hText.value = 359;
		}
		if (slText[0].value > 1) {
			slText[0].value = 0;
		}
		else if (slText[0].value < 0) {
			slText[0].value = 1;
		}
		if (slText[1].value > 1) {
			slText[1].value = 0;
		}
		else if (slText[1].value < 0) {
			slText[1].value = 1;
		}
		var rgb = hslChangeIntorgb([hText.value, slText[0].value, slText[1].value]);
		canvas.boardColorData.data[0] = Math.round(rgb[0]);
		canvas.boardColorData.data[1] = Math.round(rgb[1]);
		canvas.boardColorData.data[2] = Math.round(rgb[2]);
		canvas.boardPos = [(BOARDRECT.x + BOARDRECT.len) / 2, (BOARDRECT.y + BOARDRECT.hei) / 2];
		changergbContent();
		canvas.redrawColorBoard('rgb(' + canvas.boardColorData.data[0] + ',' + canvas.boardColorData.data[1] + ',' + canvas.boardColorData.data[2] + ')');
		changeColorText();

	}

	for (var i = 0; i < rgbText.length; i++) {
		(function (i) {
			rgbText[i].addEventListener('change', rgbTextOnChange);
		})(i);
	}
	slText[0].addEventListener('change', hslTextOnChange);
	slText[1].addEventListener('change', hslTextOnChange);
	hText.addEventListener('change', hslTextOnChange);




	if (typeof window.onload == 'function') {
		var fn = window.onload;
		window.onload = function () {
			fn();
			showBoard();
		}
	}
	else {
		window.onload = function () {
			showBoard();
		}
	}

	function showBoard() {
		var loading = document.getElementsByClassName('loading')[0];
		setTimeout(function () {
			loading.style.display = 'none';
		},1000)
	}


})(document, undefined);
