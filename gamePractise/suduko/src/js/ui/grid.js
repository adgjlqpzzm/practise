//生成九宫格
'use strict';

const Toolkit = require('../core/toolkit');
const Sudoku = require('../core/sudoku');
const Checker = require('../core/checker');

class Grid {

	constructor(container) {
		this._$container = container;
	}

	build() {
		const sudoku = new Sudoku();
		sudoku.make();
		const matrix = sudoku.puzzleMatrix;

		const rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom'];
		const colGroupClasses = ['col_g_left', 'col_g_center', 'col_g_right'];

		const $cells = matrix.map(rowValues => rowValues.map((cellValue, colIndex) => {
			return $("<span>")
				.addClass(colGroupClasses[colIndex % 3])
				.addClass(cellValue ? "fixed" : "empty")
				.text(cellValue);
		}));
		const $divArray = $cells.map(($spanArray, rowIndex) => {
			return $("<div>")
				.addClass("row")
				.addClass(rowGroupClasses[rowIndex % 3])
				.append($spanArray);
		});

		this._$container.append($divArray);
		
		//打印台显示最终结果
		for (let i = 0; i < sudoku.solutionMatrix.length; i++) {
			console.log(sudoku.solutionMatrix[i]);
		}

	}

	layout() {
		const width = $("span:first", this._$container).width();
		$("span", this._$container)
			.height(width)
			.css({
				"line-height": `${width}px`,
				"font-size": width < 32 ? `${width / 2}px` : '',
			});
	}

	check() {
		const $rows = this._$container.children();
		const data = $rows
			.map((rowIndex, div) => {
				return $(div).children()
					.map((colIndex, span) => parseInt($(span).text()) || 0);
			})
			.toArray()
			.map($data => $data.toArray());
		const checker = new Checker(data);
		if (checker.check()) {
			return true;
		}
		const marks = checker.matrixMarks;
		this._$container.children()
			.each((rowIndex, div) => {
				$(div).children().each((colIndex, span) => {
					const $span = $(span);
					if ($span.is('.fixed') || marks[rowIndex][colIndex]) {
						$span.removeClass('error');
					}
					else{
						$span.addClass('error');
					}
				});
			});
	}

	reset() {
		this._$container
			.find('span:not(.fixed)')
			.removeClass('error mark1 mark2')
			.addClass('empty')
			.text(0);
	}

	clear() {
		this._$container
			.find('span.error')
			.removeClass('error')
			.addClass('empty')
			.text(0);
	}

	rebuild() {
		this._$container.empty();
		this.build();
		this.layout();
	}

	bindPopup(popupNumbers) {

		this._$container.on('click', 'span', e => {
			const $cell = $(e.target);
			if (!$cell.hasClass('fixed')) {
				popupNumbers.popup($cell);
			}
		});
	}

}

module.exports = Grid;

