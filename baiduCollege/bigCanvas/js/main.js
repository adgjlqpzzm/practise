/**
 * Created by Jaxon, on 2017/3/1.
 */

var Canvas = (function (document, undefined) {

	//巨型画布类
	function Canvas(options) {

		//本画布的大小
		this.MAXWIDTH = 19200;
		this.MAXHEIGHT = 10800;
		//缩略图与巨大画布的缩放比例
		this.scaling = 50;
		//鼠标点击位置记录
		this.mouseClick = [-1, -1];
		//鼠标位置记录[x,y]
		this.mousePos = [-1, -1];
		//剪切点坐标
		this.clipCoor = [0, 0];
		this.clipCoorBefore = [0, 0];
		//鼠标触发事件的位置
		this.trigerPos = '';
		//画图形状
		this.shape = 0;
		this.clickIndex = 0;
		//已画形状
		this.shapeArr = [];

		this.init(options);

	}

	Canvas.prototype = {

		constructor: Canvas,
		/**
		 * 初始化函数
		 * @param options  期望格式：
		 * {
		 * 		width:<number>画布的显示宽度
		 * 		height:<number>画布的显示高度
		 * 		id:<string>画布标签的id
		 * 		imgSrc:<string>图片地址
		 * 		drawCircle:<string>传入点击画圆的button的id
		 * 		drawRect:<string>传入点击画矩形的button的id
		 * 		drawLine:<string>传入点击画线段的button的id
		 *		showText:<string>传入显示绘图信息的容器的id
		 * }
		 */
		init: function (options) {

			var that = this;

			if (typeof options.width == 'number' && options.width > 0 && options.width < 1024) {
				this.width = options.width;
			}
			else {
				this.width = 1024;
			}
			if (typeof options.height == 'number' && options.height > 0 && options.height < 768) {
				this.height = options.height;
			}
			else {
				this.height = 768;
			}

			this.canvas = document.getElementById(options.id);
			this.drawCircle = document.getElementById(options.drawCircle);
			this.drawRect = document.getElementById(options.drawRect);
			this.drawLine = document.getElementById(options.drawLine);
			this.showText = document.getElementById(options.showText);
			if (!this.canvas || !this.drawCircle || !this.drawRect || !this.drawLine || !this.showText) {
				throw new Error('Can not find ID');
			}
			else {

				this.context = this.canvas.getContext('2d');

				this.backgroundImg = new Image();
				this.backgroundImg.src = options.imgSrc;

				this.backgroundImg.onload = function () {
					if (that.backgroundImg.width == 0) {
						console.log('Image address error!');
					}
					else {
						that.setAttr();
					}
				}

			}

			//绑定事件
			var isMouseDown = false;
			var that = this;

			this.canvas.addEventListener('mousemove', function (e) {
				var e = e || window.event;
				if (isMouseDown) {
					that.mousePos = [e.offsetX, e.offsetY];
					that.redrawImg();
				}
			});
			this.canvas.addEventListener('mousedown', function (e) {
				var e = e || window.event;
				if (e.button == 0) {
					e.preventDefault();
					isMouseDown = true;
					that.mouseClick = [e.offsetX, e.offsetY];
					that.mousePos = [e.offsetX, e.offsetY];
					that.clickIndex = 1;
					that.redrawImg(true);
				}
			});
			document.addEventListener('mouseup', function (e) {

				if (!(e.target == that.drawCircle || e.target == that.drawLine || e.target == that.drawRect)) {
					that.clickIndex = 2;
					isMouseDown = false;
					that.clipCoorBefore = that.clipCoor.slice(0);
					that.drawShape();
					that.drawThumbnail();
				}

			});

			//绑定画图事件
			this.drawCircle.addEventListener('click', function () {
				that.shape = 1;
				that.showText.innerHTML = '请点击并拖动进行画圆，右键取消';
			});
			this.drawRect.addEventListener('click', function () {
				that.shape = 2;
				that.showText.innerHTML = '请点击并拖动进行画矩形，右键取消';
			});
			this.drawLine.addEventListener('click', function () {
				that.shape = 3;
				that.showText.innerHTML = '请点击并拖动进行画线段，右键取消';
			});
			document.addEventListener('mousedown', function (e) {
				var e = e || window.event;
				if (e.button == 2) {
					that.shape = 0;
					that.showText.innerHTML = '请点击按钮进行您要画的形状';
				}
			});
			document.addEventListener('contextmenu', function (e) {
				var e = e || window.event;
				e.preventDefault();
				e.returnValue = false;
				return false;
			})


		},
		setAttr: function () {

			this.shearWidth = this.backgroundImg.width * this.width / this.MAXWIDTH;
			this.shearHeight = this.backgroundImg.height * this.height / this.MAXHEIGHT;

			this.canvas.height = this.height;
			this.canvas.width = this.width + this.MAXWIDTH / this.scaling + 20;

			this.drawImg();

		},
		drawImg: function () {

			var context = this.context;

			//画主体部分
			context.drawImage(this.backgroundImg, this.clipCoor[0], this.clipCoor[1], this.shearWidth, this.shearHeight, 0, 0, this.width, this.height);
			//画编辑图
			this.drawShape();

			this.drawThumbnail();

		},
		redrawImg: function (isDown) {

			var isDown = isDown || false;
			this.context.clearRect(0, 0, this.width + 20 + this.MAXWIDTH / this.scaling, this.height);

			if (this.isPointInBoard(this.mousePos[0], this.mousePos[1])) {

				if (this.shape == 0) {
					if (isDown) {
						this.trigerPos = 'board';
					}
					if (this.trigerPos == 'board') {
						//当点击点在展示板上时,计算相对位置
						var reletiveX = this.mousePos[0] - this.mouseClick[0];
						var reletiveY = this.mousePos[1] - this.mouseClick[1];

						//原图的剪切位置
						this.clipCoor[0] = this.clipCoorBefore[0] + this.backgroundImg.width * (-reletiveX) / this.MAXWIDTH;
						this.clipCoor[1] = this.clipCoorBefore[1] + this.backgroundImg.height * (-reletiveY) / this.MAXHEIGHT;
					}
				}

			}
			else if (this.isPointInThumbnail(this.mousePos[0], this.mousePos[1])) {

				if (isDown) {
					this.trigerPos = 'thumbnail';
				}
				if (this.trigerPos == 'thumbnail') {
					//当点击点在缩略图上时
					this.clipCoor[0] = (this.mousePos[0] - this.width - 20 - this.width / this.scaling / 2) * this.backgroundImg.width * this.scaling / this.MAXWIDTH;
					this.clipCoor[1] = (this.mousePos[1] - this.height / this.scaling / 2) * this.backgroundImg.height * this.scaling / this.MAXHEIGHT;
					this.clipCoorBefore = this.clipCoor.slice(0);
				}

			}

			//碰撞检测
			if (this.clipCoor[0] < 0) {
				this.clipCoor[0] = 0;
			}
			else if (this.clipCoor[0] > this.backgroundImg.width * (1 - this.width / this.MAXWIDTH) - 10) {
				this.clipCoor[0] = this.backgroundImg.width * (1 - this.width / this.MAXWIDTH) - 10;
			}
			if (this.clipCoor[1] < 0) {
				this.clipCoor[1] = 0;
			}
			else if (this.clipCoor[1] > this.backgroundImg.height * (1 - this.height / this.MAXHEIGHT) - 10) {
				this.clipCoor[1] = this.backgroundImg.height * (1 - this.height / this.MAXHEIGHT) - 10;
			}

			this.drawImg();

		},
		drawShape: function () {

			var len = this.shapeArr.length;
			for (var i = 0; i < len; i++) {
				//画圆
				if (this.shapeArr[i].type == 'circle') {

					if (this.shapeArr[i].coc[0] + this.shapeArr[i].radial * this.backgroundImg.width / this.MAXWIDTH > this.clipCoor[0] &&
						this.shapeArr[i].coc[0] - this.shapeArr[i].radial * this.backgroundImg.width / this.MAXWIDTH < this.clipCoor[0] + this.backgroundImg.width * this.width / this.MAXWIDTH &&
						this.shapeArr[i].coc[1] + this.shapeArr[i].radial * this.backgroundImg.height / this.MAXHEIGHT > this.clipCoor[1] &&
						this.shapeArr[i].coc[1] - this.shapeArr[i].radial * this.backgroundImg.height / this.MAXHEIGHT < this.clipCoor[1] + this.backgroundImg.height * this.height / this.MAXHEIGHT) {

						this.drawCircleMet([(this.shapeArr[i].coc[0] - this.clipCoor[0]) * this.MAXWIDTH / this.backgroundImg.width, (this.shapeArr[i].coc[1] - this.clipCoor[1]) * this.MAXHEIGHT / this.backgroundImg.height], this.shapeArr[i].radial)

					}

				}
				//画矩形
				else if (this.shapeArr[i].type == 'rect') {

					if (this.shapeArr[i].coc2[0] > this.clipCoor[0] &&
						this.shapeArr[i].coc1[0] < this.clipCoor[0] + this.backgroundImg.width * this.width / this.MAXWIDTH &&
						this.shapeArr[i].coc2[1] > this.clipCoor[1] &&
						this.shapeArr[i].coc1[1] < this.clipCoor[1] + this.backgroundImg.height * this.height / this.MAXHEIGHT) {

						this.drawRectMet([(this.shapeArr[i].coc1[0] - this.clipCoor[0]) * this.MAXWIDTH / this.backgroundImg.width, (this.shapeArr[i].coc1[1] - this.clipCoor[1]) * this.MAXHEIGHT / this.backgroundImg.height], [(this.shapeArr[i].coc2[0] - this.clipCoor[0]) * this.MAXWIDTH / this.backgroundImg.width, (this.shapeArr[i].coc2[1] - this.clipCoor[1]) * this.MAXHEIGHT / this.backgroundImg.height]);

					}

				}
				//画线
				else if (this.shapeArr[i].type == 'line') {

					if (this.shapeArr[i].coc2[0] > this.clipCoor[0] &&
						this.shapeArr[i].coc1[0] < this.clipCoor[0] + this.backgroundImg.width * this.width / this.MAXWIDTH &&
						this.shapeArr[i].coc2[1] > this.clipCoor[1] &&
						this.shapeArr[i].coc1[1] < this.clipCoor[1] + this.backgroundImg.height * this.height / this.MAXHEIGHT) {

						this.drawLineMet([(this.shapeArr[i].coc1[0] - this.clipCoor[0]) * this.MAXWIDTH / this.backgroundImg.width, (this.shapeArr[i].coc1[1] - this.clipCoor[1]) * this.MAXHEIGHT / this.backgroundImg.height], [(this.shapeArr[i].coc2[0] - this.clipCoor[0]) * this.MAXWIDTH / this.backgroundImg.width, (this.shapeArr[i].coc2[1] - this.clipCoor[1]) * this.MAXHEIGHT / this.backgroundImg.height]);

					}

				}

			}

			if (this.isPointInBoard(this.mousePos[0], this.mousePos[1])) {
				if (this.shape == 1) {
					//画圆
					var radial = Math.sqrt(Math.pow(this.mousePos[0] - this.mouseClick[0], 2) + Math.pow(this.mousePos[1] - this.mouseClick[1], 2));
					if (this.clickIndex == 1) {
						this.drawCircleMet([this.mouseClick[0], this.mouseClick[1]], radial);
					}
					else if (this.clickIndex == 2) {
						this.shapeArr.push({
							type: 'circle',
							coc: [this.backgroundImg.width * this.mouseClick[0] / this.MAXWIDTH - 0 + (this.clipCoor.slice(0, 1) - 0), this.backgroundImg.height * this.mouseClick[1] / this.MAXHEIGHT - 0 + (this.clipCoor.slice(1, 2) - 0 )],
							radial: radial,
						});
					}

				}
				else if (this.shape == 2) {
					//画方
					if (this.clickIndex == 1) {
						this.drawRectMet([this.mouseClick[0], this.mouseClick[1]], [this.mousePos[0], this.mousePos[1]]);
					}
					else if (this.clickIndex == 2) {
						this.shapeArr.push({
							type: 'rect',
							coc1: [this.backgroundImg.width * this.mouseClick[0] / this.MAXWIDTH - 0 + (this.clipCoor.slice(0, 1) - 0), this.backgroundImg.height * this.mouseClick[1] / this.MAXHEIGHT - 0 + (this.clipCoor.slice(1, 2) - 0)],
							coc2: [this.backgroundImg.width * this.mousePos[0] / this.MAXWIDTH - 0 + (this.clipCoor.slice(0, 1) - 0 ), this.backgroundImg.height * this.mousePos[1] / this.MAXHEIGHT - 0 + (this.clipCoor.slice(1, 2) - 0)]
						});

					}

				}
				else if (this.shape == 3) {
					//画线
					if (this.clickIndex == 1) {
						this.drawLineMet([this.mouseClick[0], this.mouseClick[1]], [this.mousePos[0], this.mousePos[1]]);
					}
					else if (this.clickIndex == 2) {
						this.shapeArr.push({
							type: 'line',
							coc1: [this.backgroundImg.width * this.mouseClick[0] / this.MAXWIDTH - 0 + (this.clipCoor.slice(0, 1) - 0 ), this.backgroundImg.height * this.mouseClick[1] / this.MAXHEIGHT - 0 + (this.clipCoor.slice(1, 2) - 0 )],
							coc2: [this.backgroundImg.width * this.mousePos[0] / this.MAXWIDTH - 0 + (this.clipCoor.slice(0, 1) - 0 ), this.backgroundImg.height * this.mousePos[1] / this.MAXHEIGHT - 0 + (this.clipCoor.slice(1, 2) - 0 )]
						});
					}

				}
			}

		},
		drawThumbnail: function () {

			var context = this.context;

			context.fillStyle = '#fff';
			context.fillRect(this.width, 0, 20 + this.MAXWIDTH / this.scaling, this.height);

			//画缩略图
			context.drawImage(this.backgroundImg, this.width + 20, 0, this.MAXWIDTH / this.scaling, this.MAXHEIGHT / this.scaling);
			//画指示标志
			context.lineWidth = 2;
			context.strokeStyle = '#6699cc';
			context.strokeRect(this.width + 21 + this.clipCoor[0] * this.MAXWIDTH / (this.backgroundImg.width * this.scaling), 1 + this.clipCoor[1] * this.MAXHEIGHT / (this.backgroundImg.height * this.scaling), this.width / this.scaling, this.height / this.scaling);
		},
		isPointInBoard: function (x, y) {

			this.context.beginPath();
			this.context.rect(0, 0, this.width, this.height);
			return this.context.isPointInPath(x, y);

		}
		,
		isPointInThumbnail: function (x, y) {

			this.context.beginPath();
			this.context.rect(this.width + 20, 0, this.MAXWIDTH / this.scaling, this.MAXHEIGHT / this.scaling);
			return this.context.isPointInPath(x, y);

		}
		,
		drawCircleMet: function (coc, radial) {

			var context = this.context;

			context.beginPath();
			context.lineWidth = 3;
			context.strokeStyle = '#6699cc';
			context.arc(coc[0], coc[1], radial, 0, 2 * Math.PI);
			context.closePath();
			context.stroke();

		}
		,
		drawRectMet: function (coc1, coc2) {

			var context = this.context;

			context.beginPath();
			context.lineWidth = 3;
			context.strokeStyle = '#6699cc';
			context.moveTo(coc1[0], coc1[1]);
			context.lineTo(coc1[0], coc2[1]);
			context.lineTo(coc2[0], coc2[1]);
			context.lineTo(coc2[0], coc1[1]);
			context.closePath();
			context.stroke();

		}
		,
		drawLineMet: function (coc1, coc2) {

			var context = this.context;

			context.beginPath();
			context.lineWidth = 3;
			context.strokeStyle = '#6699cc';
			context.moveTo(coc1[0], coc1[1]);
			context.lineTo(coc2[0], coc2[1]);
			context.stroke();

		}

	}

	return Canvas;

})(document, undefined);