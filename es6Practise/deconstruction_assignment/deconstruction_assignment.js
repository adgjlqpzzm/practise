/**
 * 变量的解构赋值
 */

'use strict';


/**
 * 数组的解构赋值,按次序排列取值
 */

//可以使用“匹配模式”写法，只要等号两边的模式相同。
/*
var [a,b,c] = [1,2,3];
console.log(a); // 1
console.log(c); // 3

let [foo,[[bar],baz]] = [1,[[2],3]];
console.log(bar); // 2
console.log(baz); // 3

let [,,third] = ['foo','bar','baz'];
console.log(third); // 'baz'

let [x,,z] = [1,2,3];
console.log(z); // 3

//...*将剩余项以数组形式赋值
let [head,...tail] = [1,2,3,4];
console.log(head); // 1
console.log(tail); // [2,3,4]

//若解构不成功(左侧项多于右侧)，则赋值为undefined
//...*则赋值为空数组
let [x,y,...z] = ['a'];
console.log(x); // 'a'
console.log(y); // undefined
console.log(z); // []

//报莫名其妙的错误，右侧必须为可循环解构
let [foo] = 1;
*/

/*
//解构赋值允许使用默认值
let [foo = true] = [];
console.log(foo); //true

//右侧位置上如果不是 === undefined 的话，默认值不会生效
let [x = 1] = [undefined];
console.log(x); // 1

let [y = 1] = [null];
console.log(y); // null

//默认值是函数的话，函数惰性求值，若能取到值，函数是不会运行的
function func() {
	console.log('implement');
	return 1;
}
let [z = func()] = [10];

//默认值为其它变量亦可
let [x = 1,y = x] = [2];
console.log(x); // 2
console.log(y); // 2
*/


/**
 * 对象的解构赋值，无顺序，按属性名取值
 */
/*
//顺序无所谓，当名称不对应时，为undefined
var {bar, foo} = {foo: 'aaa', baz: 'bbb'};
console.log(bar); // undefined
console.log(foo); // aaa
//ReferenceError: baz is not defined
//console.log(baz);

//如果变量名与属性名不一致
let obj = {first: 'hello', last: 'world'};
let {first: f, last: l} = obj;
console.log(f); // 'hello'
console.log(l); // 'world'

//模式不会被赋值
let obj = {
	loc:{
		line: 1,
		column: 5
	}
};
let {loc:{line}} = obj;
console.log(line); // 1
//console.log(column); // ReferenceError: column is not defined
//console.log(loc); // ReferenceError: loc is not defined

//对象也可有默认值，条件是右侧对象属性值 === undefined
let {x: a = 3} = {x: undefined};
console.log(a); // 3
let {y: b = 3} = {y: null};
console.log(b); // null

//对象解构赋值时，避免把大括号放在行首
// let x;
// {x} = {x: 1}; // SyntaxError
let y;
({y} = {y: 1});
console.log(y); // 1
*/


/**
 * 字符串、数值、布尔值的解构
 * 进行解构赋值时，先将等号右面转化为对象
 */
/*
const [a,b,c,d,e] = 'hello';
console.log(c); // 'l'
console.log(e); // 'o'

//因为字符串有length属性{length:*}
let {length: len} = 'hello';
console.log(len); // 5

//将123转化为对象存在toString方法{toString:function(){***}}
let {toString: s} = 123;
console.log(s === Number.prototype.toString); // true

//undefined和null无法转为对象，直接解构会报错
//TypeError: Cannot match against 'undefined' or 'null'
let {prop: x} = undefined;
let {prop: y} = null;
*/


/**
 * 函数参数也可以解构赋值,传值替换等号右侧解构对象
 */
/*
//形参a和b的默认值是0，对传入的对象进行解构，然后赋值
function move({x:a = 0,y:b = 0} = {}) {
	return [a,b];
}
console.log(move({x:3,y:8})); // [3,8]
console.log(move({x:3}));// [3,0]

//若不传参，{x:0,y:0}为默认解构对象，传入对象参数后，代替{x:0,y:0}成为解构对象
function move({x:a,y:b} = {x:0,y:0}) {
	return [a,b];
}
console.log(move({x:3,y:8})); // [3,8]
console.log(move({})); // [undefined,undefined]
console.log(move()); // [0,0]

console.log([1,undefined,3].map((x = 'yes') => x)); // [1,'yes,3']
*/


/**
 * 解构赋值的用途
 */
/*
//交换两个变量的值,简洁，易读
let [a,b] = [1,2];
console.log(a); // 1
console.log(b); // 2
[a,b] = [b,a];
console.log(a); // 2
console.log(b); // 1

//取出方法返回的多个值
function example() {
	return [1,2,3,4];	
}
let [a,b,c,d] = example();
console.log(a,b,c,d); // 1 2 3 4

function example() {
	return {
		foo: 1,
		bar: 2,
		baz: 3
	}
}
let {foo:a = 0,bar:b = 0,baz:c = 0,xxx:d = 0} = example();
console.log(a,b,c,d); // 1 2 3 0

//提取JSON
let jsonData = {
	id: 42,
	status: "OK",
	data: [867,5309]
};
let {id,status,data:number} = jsonData;
console.log(id,status,number); // 42 'OK' [867,5309]

//设置参数的默认值，不需要在函数里默认值了
function func({async = true,cache = true,global = true}) {
	return {
		async: async,
		cache: cache,
		global: global
	}
}
let {async,cache,global} = func({async:false,cache:false});
console.log(async,cache,global); // false false true

//遍历Map
var map = new Map();
map.set('first','hello');
map.set('last','world');
for (let [key,value] of map) {
	console.log(key + " is " + value);
}
// first is hello
// last is world
for (let [key] of map) {
	console.log('key is ' + key);
}
// key is first
// key is last
for (let [,value] of map) {
	console.log('value is ' + value);
}
// value is hello
// value is world
*/


