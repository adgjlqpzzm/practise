/**
 * Symbol
 */

'use strict';

/**
 *  对象属性名都是字符串，很容易造成命名冲突，所以引入Symbol，表示属性名字是独一无二的
 *  从此js有七种基本类型:Number、String、Object、Symbol、Boolean、Undefined、Null
 */
/*
 //参数是字符串，是对Symbol的描述
 let s = Symbol('symbol');
 console.log(s); // Symbol(symbol)

 //参数只是描述
 let s1 = Symbol('symbol');
 let s2 = Symbol('symbol');
 console.log(s1 === s2); // false

 //Symbol是原始类型，不能new
 let s = new Symbol('symbol'); // TypeError: Symbol is not a constructor

 //Symbol可转换为字符串和布尔值，不能转换为其它，且不能和其它类型进行运算
 let s = Symbol('symbol');
 console.log("Symbol name is " + s); // TypeError: Cannot convert a Symbol value to a string
 console.log(`Symbol name is ${s}`);  // TypeError: Cannot convert a Symbol value to a string
 console.log(s.toString()); // 'Symbol (symbol)'
 console.log(Boolean(s)); // true
 */


/**
 * Symbol做属性名
 */
/*
 let mySymbol = Symbol();
 //第一种写法
 let obj = {};
 obj[mySymbol] = 'Hello';
 //第二种写法
 let obj = {
 [mySymbol]: 'Hello'
 }
 //第三种写法
 let obj = {};
 Object.defineProperty(obj,mySymbol,{value: 'Hello'});

 //Symbol做属性名时不能用点,只能使用方括号
 let mySymbol = Symbol();
 let obj = {};
 obj.mySymbol = 'Hello';
 console.log(obj[mySymbol]); // Undefined
 console.log(obj['mySymbol']); // 'Hello'
 */

/**
 * Symbol不会被普通方法遍历到，需要用getOwnPropertySymbols()
 */
/*
 let s = Symbol('symbol'),
 obj = {
 [s]: 'foobar'
 };
 for (var key in obj) {
 console.log(key); // 无输出
 }
 Object.getOwnPropertyNames(obj); // []
 Object.getOwnPropertySymbols(obj); // [Symbol(foo)]
 
 //新的API，Reflect.ownKeys可以获取所有的键名
 let obj = {
 [Symbol('symbol')]: 1,
 enum: 2
 };
 console.log(Reflect.ownKeys(obj)); // ['enum', Symbol(symbol)]
*/

/**
 * Symbol.for()与Symbol.keyFor()
 * Symbol.for()接受一个字符串参数，如果有以改参数为名的Symbol值，返回这个，如果没有就创建并返回一个
 * Symbol.keyFor()返回一个已登记的Symbol类型值得key
 */

/*
 let sf1 = Symbol.for('symbol'),
 s1 = Symbol('symbol'),
 sf2 = Symbol.for('symbol'),
 s2 = Symbol('symbol');
 console.log(sf1 === sf2); // true
 console.log(s1 === s2); // false

 //因为Symbol没有登记机制，所以Symbol.keyFor返回undefined
 let s1 = Symbol.for('symbol1'),
 s2 = Symbol('symbol2');
 console.log(Symbol.keyFor(s1)); // Symbol1
 console.log(Symbol.keyFor(s2)); // undefined
*/



































































