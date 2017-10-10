/**
 * Created by Jaxon on 2017/9/10.
 */

'use strict';

function Game() {

	//分数
	let score = 0;
	//dom元素
	let gameDiv,
		nextDiv,
		timeDiv,
		scoreDiv,
		resultDiv;
	//游戏矩阵
	let gameData = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	];

	//当前方块
	let cur,
		//下一个方块
		next;

	//divs
	let nextDivs = [],
		gameDivs = [];

	//方块工厂
	let squareFactory = new SquareFactory();

	//初始化div
	function initDiv(container, data, divs) {
		for (let i = 0; i < data.length; i++) {
			let div = [];
			for (let j = 0; j < data[0].length; j++) {
				let newNode = document.createElement('div');
				newNode.className = 'none';
				newNode.style.top = (i * 20) + 'px';
				newNode.style.left = (j * 20) + 'px';
				container.appendChild(newNode);
				div.push(newNode);
			}
			divs.push(div);
		}
	}

	//刷新div
	function refreshDiv(data, divs) {
		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < data[0].length; j++) {
				if (data[i][j] == 0) {
					divs[i][j].className = 'none';
				}
				else if (data[i][j] == 1) {
					divs[i][j].className = 'done';
				}
				else if (data[i][j] == 2) {
					divs[i][j].className = 'current';
				}
			}
		}
	}

	//碰撞检测
	function check(pos, x, y) {
		if (pos.x + x < 0) {
			return false;
		}
		else if (pos.x + x >= gameData.length) {
			return false;
		}
		else if (pos.y + y < 0) {
			return false;
		}
		else if (pos.y + y >= gameData[0].length) {
			return false;
		}
		else if (gameData[pos.x + x][pos.y + y] == 1) {
			return false;
		}
		else {
			return true;
		}
	}

	//检测数据是否合法
	function isValid(pos,data) {
		for (let i = 0; i < data.length; i++) {
			for (let j = 0; j < data[0].length; j++) {
				if (data[i][j] != 0){
					if (!check(pos,i,j)){
						return false;
					}
				}
			}
		}
		return true;
	}

	//设置数据
	function setData() {
		for (let i = 0; i < cur.data.length; i++) {
			for (let j = 0; j < cur.data[0].length; j++) {
				if (check(cur.origin,i,j)){
					gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
				}
			}
		}
	}

	//清除数据
	function clearData() {
		for (let i = 0; i < cur.data.length; i++) {
			for (let j = 0; j < cur.data[0].length; j++) {
				if (check(cur.origin,i,j)){
					gameData[cur.origin.x + i][cur.origin.y + j] = 0;
				}
			}
		}
	}

	//旋转
	function rotate() {
		if (cur.canRotate(isValid)){
			clearData();
			cur.rotate();
			setData();
			refreshDiv(gameData, gameDivs);
		}
	}
	
	//下落
	function fall() {
		while (down()){};
	}

	//下移
	function down() {
		if (cur.canDown(isValid)){
			clearData();
			cur.down();
			setData();
			refreshDiv(gameData, gameDivs);
			return true;
		}
		else{
			return false;
		}
	}

	//左移
	function left() {
		if (cur.canLeft(isValid)){
			clearData();
			cur.left();
			setData();
			refreshDiv(gameData, gameDivs);
		}
	}

	//右移
	function right() {
		if (cur.canRight(isValid)){
			clearData();
			cur.right();
			setData();
			refreshDiv(gameData, gameDivs);
		}
	}

	//方块移动到底部，固定
	function fixed() {
		for (let i = 0; i < cur.data.length; i++) {
			for (let j = 0; j < cur.data[0].length; j++) {
				if (check(cur.origin,i,j)){
					if (gameData[cur.origin.x + i][cur.origin.y + j] == 2){
						gameData[cur.origin.x + i][cur.origin.y + j] = 1;
					}
				}
			}
		}
		refreshDiv(gameData,gameDivs);
	}

	//使用下一个方块
	function performNext(type,dir) {
		cur = next;
		setData();
		next = squareFactory.make(type,dir);
		refreshDiv(gameData,gameDivs);
		refreshDiv(next.data,nextDivs);
	}
	
	//消行
	function checkClear() {
		let line = 0;
		for (let i = gameData.length - 1; i >= 0; i--) {
			let clear = true;
			for (let j = 0; j < gameData[0].length; j++) {
				if (gameData[i][j] != 1){
					clear = false;
					break;
				}
			}
			if (clear){
				line += 1;
				for (let m = i; m > 0; m--) {
					for(let n = 0; n < gameData[0].length; n++){
						gameData[m][n] = gameData[m - 1][n]
					}
				}
				for (let k = 0; k < gameData[0].length; k++){
					gameData[0][k] = 0;
				}
				i++;
			}
		}
		return line;
	}

	//底部增加行
	function addTailLines(lines) {
		for (let i = 0; i < gameData.length - lines.length; i++) {
			gameData[i] = gameData[i + lines.length];
		}
		for (let i = 0; i < lines.length; i++) {
			gameData[gameData.length - lines.length + i] = lines[i];
		}
		cur.origin.x -= lines.length;
		if (cur.origin.x < 0){
			cur.origin.x = 0;
		}
		refreshDiv(gameData,gameDivs);
	}
	
	//检查游戏结束
	function checkGameOver() {
		let gameOver = false;
		for (let i = 0; i < gameData[0].length; i++) {
			if (gameData[1][i] == 1){
				gameOver = true;
			}
		}
		return gameOver;
	}

	//游戏结束
	function gameOver(isWin) {
		if (isWin){
			resultDiv.innerHTML = 'you win!';
		}
		else{
			resultDiv.innerHTML = 'you lose!';
		}
	}
	
	//初始化
	function init(doms,type,dir) {
		gameDiv = doms.gameDiv;
		nextDiv = doms.nextDiv;
		timeDiv = doms.timeDiv;
		scoreDiv = doms.scoreDiv;
		resultDiv = doms.resultDiv;
		next = squareFactory.make(type,dir);
		initDiv(gameDiv, gameData, gameDivs);
		initDiv(nextDiv, next.data, nextDivs);
		refreshDiv(next.data, nextDivs);
	}
	
	//设置时间
	function setTime(time) {
		timeDiv.innerHTML = time;
	}

	//加分
	function addScore(line) {
		let s = 0;
		switch (line){
			case 1:
				s = 10;
				break;
			case 2:
				s = 30;
				break;
			case 3:
				s = 60;
				break;
			case 4:
				s = 100;
				break;
			default:
				s = 0;
				break;
		}
		score += s;
		scoreDiv.innerHTML = score;
	}

	//导出API
	this.init = init;
	this.rotate = rotate;
	this.down = down;
	this.left = left;
	this.right = right;
	this.fall = fall;
	this.fixed = fixed;
	this.performNext = performNext;
	this.checkClear = checkClear;
	this.checkGameOver = checkGameOver;
	this.setTime = setTime;
	this.addScore = addScore;
	this.gameOver = gameOver;
	this.addTailLines = addTailLines;
}

































