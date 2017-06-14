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
/*
//Math.trunc => 去除数字的小数部分，返回整数部分
console.log(Math.trunc(4.9)); // 4
console.log(Math.trunc(-4.9)); // -4
console.log(Math.trunc('4.9')); // 4

//Math.sign => 判断数字的正负 正数->+1 负数->-1 0->0 -0->-0
console.log(Math.sign(5)); // 1
console.log(Math.sign(-5)); // -1
console.log(Math.sign(0)); // 0
console.log(Math.sign(-0)); // -0
console.log(Math.sign(NaN)); // NaN
console.log(Math.sign('foo')); // NaN

//Math.cbrt => 计算一个数字的立方根
console.log(Math.cbrt(-1)); // -1
console.log(Math.cbrt(2)); // 1.2599210498948732
console.log(Math.cbrt(8)); // 2
console.log(Math.cbrt('Hello')); // NaN

//Math.clz32 => 返回一个数的32位无符号整数形式有多少前导0
console.log(Math.clz32(0)); // 32
console.log(Math.clz32(1)); // 31
console.log(Math.clz32(1000)); // 22
console.log(Math.clz32(0b001000000000000)); // 19
console.log(Math.clz32(1 << 2)); // 29
console.log(Math.clz32(1 << 29)); // 2

//Math.imul => 返回两个数以32位带符号整数形式相乘的结果，返回值也是32位带符号整数
console.log(Math.imul(2,4)); // 8
console.log(Math.imul(-3,4)); // -12

//Math.fround => 返回一个数的单精度浮点数形式
console.log(Math.fround(1)); // 1
console.log(Math.fround(1.337)); // 1.3370000123977661
console.log(Math.fround(1.5)); // 1.5
console.log(Math.fround(NaN)); // NaN

//Math.hypot => 返回所有参数的平方和的平方根
console.log(Math.hypot(3,4)); // 5
console.log(Math.hypot(3,'4',5)); // 7.0710678118654755
console.log(Math.hypot(0)); // 0
console.log(Math.hypot(NaN)); // NaN
console.log(Math.hypot('foo')); // NaN
*/


/**
 * Math新增的4个对数方法
 */
/*
//Math.expm1 => 返回e^x - 1
console.log(Math.expm1(-1)); // -0.6931471805599453
console.log(Math.expm1(0)); // 0
console.log(Math.expm1(1)); // 1.718281828459045

//Math.log1p => 返回ln(1 + x)
console.log(Math.log1p(1)); // 0.6931471805599453
console.log(Math.log1p(0)); // 0
console.log(Math.log1p(10)); // 3.3978952727983707
console.log(Math.log1p(-1)); // -Infinity
console.log(Math.log1p(-2)); // NaN

//Math.log10 => 返回lg(x)
console.log(Math.log10(0)); // -Infinity
console.log(Math.log10(1)); // 0
console.log(Math.log10(10)); // 1
console.log(Math.log10(-2)); // NaN
console.log(Math.log10(NaN)); // NaN

//Math.log2 => 返回lb(x)  以2位底的对数
console.log(Math.log2(0)); // -Infinity
console.log(Math.log2(1)); // 0
console.log(Math.log2(2)); // 1
console.log(Math.log2(1024)); // 10
console.log(Math.log2(-2)); // NaN
*/


/**
 * Math新增6个三角函数方法
 * Math.sinh(x) => x的双曲正弦
 * Math.cosh(x) => x的双曲余弦
 * Math.tanh(x) => x的双曲正切
 * Math.asinh(x) => x的反双曲正弦
 * Math.acosh(x) => x的反双曲余弦
 * Math.atanh(x) => x的反双曲正切
 */





