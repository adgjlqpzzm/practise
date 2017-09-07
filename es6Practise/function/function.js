/**
 * function
 */

'use strict';

/**
 * es6之前，不能直接为参数指定默认值
 */
/*
//es5写法,y为空字符结果被赋值为默认值world
function log(x, y) {
	y = y || 'world';
	console.log(x, y);
}
log('Hello'); // Hello world
log('Hello', 'China'); // Hello China
log('Hello', ''); // Hello world


//es5中解决上述问题方法如下
if (typeof y === 'undefined') {
	y = 'world'
}
if (arguments.length === 1) {
	y = 'world'
}


//es6解决方法如下
function log(x, y = 'world') {
	console.log(x, y);
}
log('Hello'); // Hello world
log('Hello', ''); // Hello

function Point(x = 0,y = 0) {
	this.x = x;
	this.y = y;
}
let p = new Point();
console.log(p); // {x:0,y:0}


//ES6参数变量默认声明，不能使用let和const再次声明
function foo(x) {
	let x;
}
foo(); // SyntaxError: Identifier 'x' has already been decleared


//可以和结构赋值默认值结合起来使用
function foo({x:a,y:b = 5}) {
	console.log(a,);
}
foo({});  // undefined 5
foo({x:1}); // 1 5
foo({x:1,y:2});  // 1 2
foo(); // TypeError: Cannot match against 'undefined' or 'null'

 function foo({x:a,y:b = 5} = {x:3}) {
 console.log(a,b);
 }
 foo({}); // undefined 5
 foo(); // 3 5


 //指定默认值之后，length就不包括了
 console.log((function (a,b,c = 4) {}).length); // 2
 console.log((function (a,b,c) {}).length); // 3
*/

/**
 * rest参数
 * 用于获取函数的多余参数
 * 匹配一个数组，将多余的变量存在其中
 */

/*
 function add(...values) {
 let sum = 0;
 for (let val of values) {
 sum += val;
 }
 return sum;
 }
 console.log(add(1,5,3)); // 9


 //rest参数后不能有其它参数
 function foo(a,...b,c) {}
 foo(); // SyntaxError: Rest parameter must be last formal parameter


 //函数的length属性不包括rest参数
 console.log((function (a) {}).length); // 1
 console.log((function (...b) {}).length); // 0
 console.log((function (a,...b) {}).length); // 1
 */

/**
 * 扩展运算符spread
 * rest参数的逆运算
 * 将一个数组转为用逗号分割的参数序列
 */
/*
 function add(x,y) {
 return x + y;
 }
 let numbers = [ 52, 21];
 console.log(add(...numbers)); // 73


 //代替原来的apply方法
 //es5的写法
 function f(x,y,z) {}
 let args = [0,1,2];
 f.apply(null,args);
 //es6的写法
 function f(x,y,z) {}
 let args = [0,1,2];
 f(...args);

 //以Math.max为例
 //es5的写法
 Math.max.apply(null,[14,3,7]);
 //es6的写法
 Math.max(...[14,3,7]);

 //以push为例
 //es5的写法
 let arr = [0,1,2];
 Array.prototype.push.apply(arr,[1,2,3]);
 //es6的写法
 let arr = [0,1,2];
 arr.push(...arr);
 */

/**
 * 扩展运算符运用
 */
/*
//合并数组
let arr1 = [0,1,2];
let arr2 = [3,4];
//es5写法
console.log(arr1.concat(arr2)); // [0,1,2,3,4]
console.log(arr1); // [0,1,2]
//es6写法
arr1 = [...arr1,...arr2];
console.log(arr1); // [0,1,2,3,4]
*/

/**
 * 扩展运算符与结构赋值结合
 */
/*
const [first,...second] = [0,1,2,3,4];
console.log(first); // 0
console.log(second); // [1,2,3,4]
const [first,...second] = [1];
console.log(first); // 1
console.log(second); // []

 //如果将扩展运算符用于赋值，必须放在最后一位
 const [first,...second,third] = [0,1,2,3,4];
 //SyntaxError: Rest element must be last element in array
*/

/**
 * 扩展运算符可以将字符串转为真正的数组
 * 也可以将类数组变为真正的数组
 */
/*
//字符串
let string = 'Hello';
let arr = [...string];
console.log(arr);

//map
 let map = new Map([
 [1,'first'],
 [2,'second'],
 [3,'third']
 ]);
 let arr = [...map.keys()];
 console.log(arr); // [1,2,3]

//Generator
 function* go() {
 let a = yield 'first';
 let b = yield 'second';
 let c = yield 'third';
 }
 let g = go();
 console.log([...g]); // ['first','second','third']
*/

/**
 * 函数的name属性
 * 返回函数名
 */
/*
 //匿名函数es5返回空字符，es6返回实际函数名
 let func = function () {};
 console.log(func.name); // '' es5
 console.log(func.name); // func es6

 //一下情况返回真正的函数名
 let func = function really() {};
 console.log(func.name); // really
*/

/**
 * 箭头函数=>定义函数
 */
/*
 //以下等同
 let foo1 = ret => ret;
 let foo2 = function (ret) {return ret};
 console.log(foo1(3)); // 3
 console.log(foo2(4)); // 4

 //如果无参数，则需要加括号
 let foo1 = () => 5;
 let foo2 = function () {return 6};
 console.log(foo1()); // 5
 console.log(foo2()); // 6

 //如果参数数量多余一个，则需要加括号
 let foo1 = (x,y) => x+y;
 let foo2 = function (x,y) {return x + y};
 console.log(foo1(1,2)); // 3
 console.log(foo2(3,4)); // 7

 //如果执行代码块大于一句，则需要用大括号括起来
 let max = (x,y) => {
 if (x > y){
 return x;
 }
 else{
 return y;
 }
 };
 console.log(max(2,3)); // 3
 console.log(max(5,4)); // 5

 //因为箭头函数中，大括号表示代码块，所以返回值为对象时需要加小括号
 let func = () => ({x:1,y:2});
 console.log(func()); // {x:1,y:2}

 //rest可以和箭头函数结合
 let func = (...nums) => nums;
 console.log(func(1,2,3,4)); // [1,2,3,4]
 let func = (head,...tail) => [head,...tail];
 console.log(func(1,2,3,4)); // [1,2,3,4]
*/

/**
 * 注意事项↓↓↓↓↓↓↓↓↓
 * 1.函数体内this对象就是定义时所在的对象，而不是使用时所在对象(因为箭头函数中没有本身的this)
 *   除了this，arguments，super，new.target在箭头函数中也不存在，均指向定义时外层函数的对应
 *   由于没有this，也不能使用call，apply，bind改变this的指向
 * 2.不能当做构造函数，不能new
 * 3.不能使用arguments对象，该对象在函数体内不存在
 * 4.不能使用yield命令，箭头函数不能用做Generator函数
 */

/*
//注意事项1
//如果不是箭头函数，setTimeout内的匿名函数使用时上下文为window，箭头函数的this就是定义时的对象
function foo() {
	setTimeout(() => {
		console.log(this.id);
	},100)
}
foo.call({id:2}); // 2

 //如果不是箭头函数，类中的this指向window，箭头函数的this就是实例化对象timer
 function Timer() {
 this.second = 0;
 setInterval(() => this.second++,100);
 }
 let timer = new Timer();
 setTimeout(() => console.log(timer.second),400); // 3
 
 //this的arguments
 function foo() {
 setTimeout(() => {
 console.log(arguments);
 },100);
 }
 foo(1,2,3); // {'0':1,'1':2,'2':3}

 //箭头函数中没有自己的this，所以bind效果无效
 let result = (function () {
 return [
 (() => this.x).bind({x:'inner'})()
 ]
 }).call({x:'outer'});
 console.log(result); // ['outer']
*/

/**
 * 嵌套的箭头函数
 */
/*
//如下为一个管道机制(pipeline),前一个函数的输出是后一个函数的输入
const pipeline = (...funcs) => val => funcs.reduce((a,b) => b(a),val);
const plus1 = a => a + 1;
const mult2 = a => a * 2;
const addThenMult = pipeline(plus1,mult2);
console.log(addThenMult(5)); // 12
//等同于
const pipeline = function (...funcs) {
	return function (val) {
		return funcs.reduce(function (a,b) {
			return b(a);
		},val);
	};
};
*/

/**
 * 函数绑定(es7)
 * 由于箭头函数并不能适用于各种情况，所以提出来代替apply，call，bind
 * 运算符为::，左侧是绑定为this的对象，右侧是执行方法
 */

/**
 * 尾调用优化
 * 尾调用是最后一步操作，所以不需要保存外层函数的调用帧
 * 如果不是尾调用，则会保留外层函数的各种信息
 * 对于层层嵌套的函数，使用尾调用能做到每次的调用帧只有一项，节约内存
 * 只有内层函数不再使用外层函数信息，外层函数调用帧才会删除
 */
/*
//下面函数func1的最后一步是调用func2，属于尾调用,尾调用不一定要在最后一行
function func2() {}
function func1() {
	return func2();
}

 //下面函数都不属于尾调用，因为调用函数之后还有其它操作
 function func2() {}
 function func1() {
 let y = func2();
 return y;
 }

 function func2() {}
 function func1() {
 return func2() + 1;
 }

 function func2() {}
 function func1() {
 func2();
 //return undefined
 }

 //下面函数不会进行尾调用优化,因为内层调用函数使用了外层函数的变量one
 function outer(a) {
 let one = 1;
 function inner(b) {
 return b + one;
 }
 return inner(a);
 }
*/

/**
 * 尾递归
 * 递归需要保存很多调用帧，容易发生栈溢出
 * 尾递归只需要保存一个调用帧，所以不会有栈溢出的错误
 * 只有开启严格模式，才会进行尾调用优化
 */
/*
//需要保存n个调用记录，复杂度为O(n)
function factorial(n) {
	if (n === 1) {
		return 1;
	}
	else{
		return n * factorial(n - 1);
	}
}
factorial(5) // 120
//改写成尾递归，只需要保存1个调用帧，复杂度为O(1)
function factorial(n,total) {
	if (n === 1) {
		return total;
	}
	else {
		return factorial(n - 1,n * total)
	}
}
factorial(5,1) // 120
*/

/**
 * 尾递归函数改写
 * 1.在尾递归函数之外提供一个正常形式的函数
 * 2.使用es6的函数默认值
 */
/*
 //方法一
 function tailFactorial(n,total) {
 if (n === 1) {
 return total;
 }
 else {
 return factorial(n - 1,n * total)
 }
 }
 function factorial(n) {
 return tailFactorial(n,1);
 }
 factorial(5); // 120

 //方法二
 function factorial(n,total = 1) {
 if (n === 1) {
 return total;
 }
 else {
 return factorial(n - 1,n * total)
 }
 }
 factorial(5);// 120
*/


















































