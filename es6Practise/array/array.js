/**
 * Array
 */

'use strict';


/**
 * Array.from => 将类数组对象和可遍历对象转为真正的数组
 */
/*
let arrayLike = {
	'0': 'a',
	'1': 'b',
	'2': 'c',
	length: 3
};
//es5的写法
let arr1 = [].slice.call(arrayLike);
console.log(arr1); // [ 'a', 'b', 'c']
//es6的写法
let arr2 = Array.from(arrayLike);
console.log(arr2); // [ 'a', 'b', 'c']
//字符串转数组
console.log(Array.from('Hello')); // [ 'H', 'e', 'l', 'l', 'o']

//Array.from可以接受第二个参数，类似于数组的map方法
console.log(Array.from([ 1, 2, 3], x => x * x)); // [ 1, 4, 9]
console.log(Array.from({1:1,length:3}, x => x || 0)); // [ 0, 1, 0]
*/


/**
 * Array.of => 弥补数组构造函数的不足，基本可以代替Array()和new Array()
 */
/*
console.log(Array.of(1,2,3)); // [ 1, 2, 3 ]
console.log(Array.of(3)); // [ 3 ]
console.log(Array.of(undefined)); // [ undefined ]
console.log(Array.of(null)); // [ null ]
console.log(Array.of(3).length); // 1
*/


/**
 * copyWithin => 在当前数组内部将指定位置的成员复制到其他位置
 * target:从该位置开始替换数据
 * start:从该位置开始读取数据
 * end:到该位置前停止读取数据
 */
/*
console.log([1,2,3,4,5].copyWithin(0,3)); // [ 4, 5, 3, 4, 5 ]
console.log([1,2,3,4,5].copyWithin(0,3,4)); // [ 4, 2, 3, 4, 5 ]
console.log([1,2,3,4,5].copyWithin(0,-2,-1)); // [ 4, 2, 3, 4, 5 ]
console.log([].copyWithin.call({length: 5, 3:1}, 0, 3)); // { '0': 1, '3': 1, length: 5}
*/


/**
 * find 与 findIndex (find 返回值为第一个符合条件的值，findIndex返回该值的索引)
 * 用于找出第一个执行回调函数返回值为true的函数
 * 回调函数有3个参数:value => 值; index => 索引; arr => this
 * 两个函数可以发现NaN，弥补了indexof的不足
 */
/*
console.log([1,4,-5,10].find(n => n < 0)); // -5
console.log([1,4,-5,10].findIndex(n => n < 0)); // 2

console.log([1,NaN,3].findIndex(n => Object.is(NaN,n))); // 1
*/


/**
 * fill 填充数组
 * 第一个参数为填充数组的给定值
 * 第二个参数为开始填充的位置
 * 第三个参数为结束填充的位置
 */
/*
console.log([1,2,3,4,5,6,7,8].fill('a',3,5)); // [ 1, 2, 3, 'a', 'a', 6, 7, 8 ]
*/


/**
 * entries => 对键值对遍历
 * keys => 对键名的遍历
 * values => 对键值的遍历
 */
/*
let letters = ['a','b','c'];
for (let index of letters.keys()) {
	console.log(index);
	// 0
	// 1
	// 2
}

//error.........？？？？？？
for (let elem of ['a','b'].values()){
 	console.log(elem);
}

for (let [index,elem] of letters.entries()) {
	console.log(index,elem);
	//0 'a'
	//1 'b'
	//2 'c'
}

let entries = letters.entries();
console.log(entries.next()); // {value:[0,'a'],done:false}
console.log(entries.next()); // {value:[1,'b'],done:false}
console.log(entries.next()); // {value:[2,'c'],done:false}
console.log(entries.next()); // {value:undefined,done:true}
*/


/**
 * includes(同样识别NaN)
 */
/*
 console.log([1,2,3].includes(2)); // true
 console.log([1,2,3].includes(4)); // false
 console.log([1,2,3].includes(NaN)); // false
 console.log([1,2,NaN].includes(NaN)); // true
 */

/**
 * ES6将数组空位全部转为undefined
 * Array.from将数组空位转为undefined
 * entries,keys,values,find,findIndex会将空位当成undefined处理
 * for...of不会跳过空位
 * copyWithin将空位同样复制
 * fill将空位视为正常数组位置
 */


/**
 * 数组推导(ES7支持)
 */
















































