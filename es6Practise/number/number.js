/**
 * Number
 */

'use strict';


/**
 * 分别使用0B和0O表示二进制和八进制数
 */
/*
console.log(0B111110111 === 503); // true
console.log(0O767 === 503); // true
//如使用0B或0O前缀，转10进制使用Number方法
console.log(Number(0B111)); // 7
console.log(Number(0O10)); // 8
*/


/**
 * Number对象方法的拓展
 */
/*
//Number.isFinite 和 Nunber.isNaN,相比ES5中的isFinite与isNaN,新方法的参数只对数值有效
//isFinite:参数只要不是确定的数值，便返回false（包括Infinity、NaN、其它数据类型等）
console.log(Number.isFinite(15)); // true
console.log(Number.isFinite(NaN)); // false
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(-Infinity)); // false
console.log(Number.isFinite('15')); // false(其它类型不会自动转换为number类型)
//isNaN:只要参数最终值为NaN，便返回false
console.log(Number.isNaN(15)); // false
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN('NaN')); // false(其它类型不会自动转换为number类型)
console.log(Number.isNaN(true));  // false
console.log(Number.isNaN('15')); // false
console.log(Number.isNaN(9/NaN)); // true
console.log(Number.isNaN(9/0)); // false
console.log(Number.isNaN('abc'/'abc')); // true

//parseInt与parseFloat方法移植到了Number对象上
//es5
console.log(parseInt('12.34')); // 12
console.log(parseFloat('123.456#')); // 123.456
//es6
console.log(Number.parseInt('12.34')); // 12
console.log(Number.parseFloat('123.456#')); // 123.456

//Number.isInteger判断是否为整数
console.log(Number.isInteger(25)); // true
console.log(Number.isInteger(25.0)); // true
console.log(Number.isInteger(25.1)); // false

//新增Number.EPSILIN
console.log(Number.EPSILON); // 2.220446049250313e-16

//新增安全整数和Number.isSafeInteget(是否为安全整数)
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991(安全整数的上限)
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991(安全整数的下限)
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)); // true
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)); // false
console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER)); // true
console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1)); // false
*/


/**
 * Math对象的拓展
 */
















