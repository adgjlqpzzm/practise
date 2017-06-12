/**
 * let&const
 */

"use strict";


/**
 * let与const不允许在同一作用域重复声明,const声明必须赋值，赋值后不允许修改
 */
/*
{
	var a = 10;
	var a = 9;
}
console.log(a); // 9

//SyntaxError: identifier 'a' has already been declared
{
	let a = 10;
	var a = 9;
}

//SyntaxError: identifier 'a' has already been declared
{
	let a = 10;
	let a = 9;
}

// SyntaxError: Missing initializer in const declaration
const a;

//TypeError: Assignment to constant variable.
const a = 10;
a = 9;
*/


/**
 * let与const不存在变量提升
 * const声明的变量指向数据所在的地址，对象的属性仍可以变化，需要freeze冻结
 * @param arg 传入的参数
 */
/*
//使用var声明参数，会忽略
function func(arg) {
	console.log(arg);
	//存在变量提升，但与参数重名自动忽略，打印时arg未重新赋值，所以打印结果仍为参数的值
	var arg = 9;
}
func(10); //10

//使用let声明参数，会报错，相当于在同一作用于重复声明一个变量
SyntaxError: Identifier 'arg' has already been declared
function func(arg) {
	let arg = 9;
}
func(10);

//不会报错，因为不是同一块级作用域
function func(arg) {
	{
		let arg = 9;
		console.log(arg); // 9
	}
}
 func(10);

// **注意：以下情况也会报错，let不存在变量提升并不是因为let声明按顺序执行**
// 在执行过程中，如果一个代码块中存在let定义的变量被提前使用的情况，则报错。如果不存在let定义，则去父级代码块中找。
function func(arg) {
	{
		console.log(arg); // 9
		let arg = 9;
	}
}
 func(10);
*/


/**
 * es6存在块级作用域
 */
/*
 {
 let a = 10;
 var b = 1;
 }
 console.log(b); // 1
 //let在代码块之内定义，代码块之外无法访问
 console.log(a); // ReferenceError: a is not defined
 */


/**
 * 因为es6存在块级作用域，所以for循环时不再需要闭包，使用let声明循环变量即可
 */
/*
//es5的做法(无闭包)
var a = {};
for (var i = 0; i < 10; i++) {
	a[i] = function () {
		console.log(i);
	}
}
a[5](); // 10,因为i为全局变量

//es5的做法(闭包)
var a = {};
for (var i = 0; i < 10; i++) {
	(function (i) {
		a[i] = function () {
			console.log(i);
		}
	})(i);
}
a[5](); // 5

//es6的做法(let声明)
var a = {};
for (let i = 0; i < 10; i++) {
	a[i] = function () {
		console.log(i);
	}
}
a[5](); // 5
*/


/**
 * 变量提升问题
 */
/*
//顺序为 1. var foo(变量提升);  2. console.log(所以是undefined);  3. foo = 2;
console.log(foo); // undefined,因为使用var声明foo时，会发生变量提升
var foo = 2;

//let声明变量不存在变量提升，在之前引用会报一个引用错误
console.log(foo); // ReferenceError: foo is not defined;
let foo = 2;
*/


























































