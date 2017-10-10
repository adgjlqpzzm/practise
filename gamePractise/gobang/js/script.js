/**
 * Created by Administrator on 2017/2/24.
 */

//棋盘数组
var chessBoard = [];
//棋子颜色信息，true为黑子
var me = true;
//棋盘结束信息
var over = false;

//赢法数组
var wins = [];
//赢法的统计数组
var myWin = [];
var computerWin = [];

//棋盘数组进行初始化
for (var i = 0; i < 15; i++) {
	chessBoard[i] = [];
	for (var j = 0; j < 15; j++) {
		chessBoard[i][j] = 0;
	}
}

//赢法数组初始化
for (var i = 0; i < 15; i++) {
	wins[i] = [];
	for (var j = 0; j < 15; j++) {
		wins[i][j] = [];
	}
}

//赢法种类的索引
var count = 0;
//纵线赢法
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i][j + k][count] = true;
		}
		count++;
	}
}
//横向赢法
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[j + k][i][count] = true;
		}
		count++;
	}
}
//斜线赢法
for (var i = 0; i < 11; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i + k][j + k][count] = true;
		}
		count++;
	}
}

//反斜线赢法
for (var i = 0; i < 11; i++) {
	for (var j = 14; j > 3; j--) {
		for (var k = 0; k < 5; k++) {
			wins[i + k][j - k][count] = true;
		}
		count++;
	}
}

for (var i = 0; i < count; i++) {
	myWin[i] = 0;
	computerWin[i] = 0;
}

var chess = document.getElementById("chess");
var context = chess.getContext("2d");

context.strokeStyle = "#BFBFBF";

var logo = new Image();
logo.src = "./img/logo.jpg";
logo.onload = function () {

	context.drawImage(logo, 0, 0, 450, 450);
	drawChessBoard();

};

/**
 * 为canvas绑定点击事件
 */
chess.addEventListener("click", function (e) {

	if (over || !me) {
		return;
	}

	var x = e.offsetX;
	var y = e.offsetY;

	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);

	if (chessBoard[i][j] == 0) {
		oneStep(i, j, me);
		chessBoard[i][j] = 1;
		for (var k = 0; k < count; k++) {
			if (wins[i][j][k]) {
				myWin[k]++;
				computerWin[k] = 6;
				if (myWin[k] == 5) {
					alert('你赢了');
					over = true;
				}
			}
		}

		if (!over) {
			me = !me;
			computerAI();
		}

	}

});

/**
 * 画棋盘
 */
function drawChessBoard() {

	for (var i = 0; i < 15; i++) {
		context.moveTo(15 + i * 30, 15);
		context.lineTo(15 + i * 30, 435);
		context.stroke();
		context.moveTo(15, 15 + i * 30);
		context.lineTo(435, 15 + i * 30);
		context.stroke();
	}

}

/**
 *
 * @param i 落子的横坐标
 * @param j    落子的纵坐标
 * @param me  是否为黑棋
 */
function oneStep(i, j, me) {

	context.beginPath();
	context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
	if (me) {
		gradient.addColorStop(0, "#0A0A0A");
		gradient.addColorStop(1, "#636766");
	}
	else {
		gradient.addColorStop(0, "#D1D1D1");
		gradient.addColorStop(1, "#F9F9F9");
	}
	context.fillStyle = gradient;
	context.fill();

}

//CpmputerAI
function computerAI() {

	var myScore = [];
	var computerScore = [];
	var max = 0;
	var u = 0, v = 0;

	for (var i = 0; i < 15; i++) {
		myScore[i] = [];
		computerScore[i] = [];
		for (var j = 0; j < 15; j++) {
			myScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 15; j++) {
			if (chessBoard[i][j] == 0) {
				for (var k = 0; k < count; k++) {
					if (wins[i][j][k]) {
						if (myWin[k] == 1) {
							myScore[i][j] += 200;
						}
						else if (myWin[k] == 2) {
							myScore[i][j] += 400;
						}
						else if (myWin[k] == 3) {
							myScore[i][j] += 2000;
						}
						else if (myWin[k] == 4) {
							myScore[i][j] += 10000;
						}
						if (computerWin[k] == 1) {
							computerScore[i][j] += 220;
						}
						else if (computerWin[k] == 2) {
							computerScore[i][j] += 420;
						}
						else if (computerWin[k] == 3) {
							computerScore[i][j] += 2100;
						}
						else if (computerWin[k] == 4) {
							computerScore[i][j] += 20000;
						}
					}
				}
				if (myScore[i][j] > max) {
					max = myScore[i][j];
					u = i;
					v = j;
				}
				else if (myScore[i][j] == max) {
					if (computerScore[i][j] > computerScore[u][v]) {
						u = i;
						v = j;
					}
				}
				if (computerScore[i][j] > max) {
					max = computerScore[i][j];
					u = i;
					v = j;
				}
				else if (computerScore[i][j] == max) {
					if (myScore[i][j] > myScore[u][v]) {
						u = i;
						v = j;
					}
				}
			}
		}
	}

	oneStep(u, v, false);
	chessBoard[u][v] = 2;
	for (var k = 0; k < count; k++) {
		if (wins[u][v][k]) {
			computerWin[k]++;
			myWin[k] = 6;
			if (computerWin[k] == 5) {
				alert('电脑赢了');
				over = true;
			}
		}
	}
	if (!over) {
		me = !me;
	}

}