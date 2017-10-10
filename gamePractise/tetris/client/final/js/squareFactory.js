/**
 * Created by Jaxon on 2017/9/10.
 */

'use strict';

//Square1
function Square1() {

	Square.call(this);

	//旋转数组
	this.rotates = [
		[
			[0, 2, 0, 0],
			[0, 2, 0, 0],
			[0, 2, 0, 0],
			[0, 2, 0, 0],
		],
		[
			[0, 0, 0, 0],
			[2, 2, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[
			[0, 2, 0, 0],
			[0, 2, 0, 0],
			[0, 2, 0, 0],
			[0, 2, 0, 0],
		],
		[
			[0, 0, 0, 0],
			[2, 2, 2, 2],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
	];
}

Square1.prototype = Object.create(Square.prototype);
Square1.constructor = Square1;


//Square2
function Square2() {

	Square.call(this);

	//旋转数组
	this.rotates = [
		[
			[0, 2, 0, 0],
			[2, 2, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[
			[2, 0, 0, 0],
			[2, 2, 0, 0],
			[2, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[
			[2, 2, 2, 0],
			[0, 2, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[
			[0, 2, 0, 0],
			[2, 2, 0, 0],
			[0, 2, 0, 0],
			[0, 0, 0, 0],
		],
	];
}

Square2.prototype = Object.create(Square.prototype);
Square2.constructor = Square2;


//Square3
function Square3() {

	Square.call(this);

	//旋转数组
	this.rotates = [
		[
			[2, 2, 2, 0],
			[0, 0, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[
			[0, 2, 0, 0],
			[0, 2, 0, 0],
			[2, 2, 0, 0],
			[0, 0, 0, 0],
		],
		[
			[2, 0, 0, 0],
			[2, 2, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[
			[2, 2, 0, 0],
			[2, 0, 0, 0],
			[2, 0, 0, 0],
			[0, 0, 0, 0],
		],
	];
}

Square3.prototype = Object.create(Square.prototype);
Square3.constructor = Square3;


//Square4
function Square4() {

	Square.call(this);

	//旋转数组
	this.rotates = [
		[
			[2, 2, 2, 0],
			[2, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[
			[2, 2, 0, 0],
			[0, 2, 0, 0],
			[0, 2, 0, 0],
			[0, 0, 0, 0],
		],
		[
			[0, 0, 2, 0],
			[2, 2, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[
			[2, 0, 0, 0],
			[2, 0, 0, 0],
			[2, 2, 0, 0],
			[0, 0, 0, 0],
		],
	];
}

Square4.prototype = Object.create(Square.prototype);
Square4.constructor = Square4;


//Square5
function Square5() {

	Square.call(this);

	//旋转数组
	this.rotates = [
		[
			[2, 2, 0, 0],
			[2, 2, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[
			[2, 2, 0, 0],
			[2, 2, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[
			[2, 2, 0, 0],
			[2, 2, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[
			[2, 2, 0, 0],
			[2, 2, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
	];
}

Square5.prototype = Object.create(Square.prototype);
Square5.constructor = Square5;


//Square6
function Square6() {

	Square.call(this);

	//旋转数组
	this.rotates = [
		[
			[0, 2, 2, 0],
			[2, 2, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[
			[2, 0, 0, 0],
			[2, 2, 0, 0],
			[0, 2, 0, 0],
			[0, 0, 0, 0],
		],
		[
			[0, 2, 2, 0],
			[2, 2, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[
			[2, 0, 0, 0],
			[2, 2, 0, 0],
			[0, 2, 0, 0],
			[0, 0, 0, 0],
		],
	];
}

Square6.prototype = Object.create(Square.prototype);
Square6.constructor = Square6;


//Square7
function Square7() {

	Square.call(this);

	//旋转数组
	this.rotates = [
		[
			[2, 2, 0, 0],
			[0, 2, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[
			[0, 2, 0, 0],
			[2, 2, 0, 0],
			[2, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[
			[2, 2, 0, 0],
			[0, 2, 2, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		],
		[
			[0, 2, 0, 0],
			[2, 2, 0, 0],
			[2, 0, 0, 0],
			[0, 0, 0, 0],
		],
	];
}

Square7.prototype = Object.create(Square.prototype);
Square7.constructor = Square7;


function SquareFactory() {}

SquareFactory.prototype.make = function (index,dir) {
	let s;
	index += 1;
	switch (index){
		case 1:
			s = new Square1();
			break;
		case 2:
			s = new Square2();
			break;
		case 3:
			s = new Square3();
			break;
		case 4:
			s = new Square4();
			break;
		case 5:
			s = new Square5();
			break;
		case 6:
			s = new Square6();
			break;
		case 7:
			s = new Square7();
			break;
		default:
			break;
	}
	s.origin.x = 0;
	s.origin.y = 3;
	s.rotate(dir);
	return s;
};







