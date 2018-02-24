//生成数独游戏
'use strict';

const Generator = require('./generator');

class Sudoku{

	constructor(){
		const generator = new Generator();
		generator.generate();
		this.solutionMatrix = generator.matrix;
	}

	make(level = 5){
		this.puzzleMatrix = this.solutionMatrix.map(row => {
			return row.map(cell => {
				return Math.random() * 9 < level ? 0 : cell;
			});
		});
	}



}

module.exports = Sudoku;

