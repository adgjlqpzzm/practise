/**
 * Module.
 * ES6模块系统
 * 主要由import和export组成
 */

'use strict';

/**
 * export
 * export可以输出变量、函数、类等等
 * export可以使用as关键字重命名
 * export必须处于模块顶层，不能处于块级作用域
 */
/*
 //example1
 let firstName = 'Michael';
 let lastName = 'Jackson';
 let year = 1985;
 export {firstName,lastName,year};

//example2
export function multiply(x, y) {
	return x * y;
}

//example3  V2可以以不同名字调用
function v1() {}
function v2() {}
export {
	v1 as streamV1,
	v2 as streamV2,
	v2 as streamLatestVersion,
}
 */


/**
 * import
 * 使用export命令定义了模块的对外接口后，其它JS文件就可以通过import命令加载这个模块
 * import可以使用as关键字为变量重命名
 * import具有变量提升效果
 * 推荐使用整体加载
 */
/*
//example
import {foo} from './my_module';
import {lastName as surname} from './profile';
import {area,circumference} from './circle';
area(4);
circumference(14);
//使用整体加载
import * as circle from './circle';
circle.area(4);
circle.circumference(14);
*/

/**
 * module命令
 * 可以取代import达到整体输入的效果
 */
/*
module circle from './circle';
circle.area(4);
circle.circumference(14);
*/

/**
 * export default命令
 * 为模块指定默认输出
 * 用户不需要知道模块输出了什么属性名
 * 只能使用一次，import后面不加大括号
 */
/*
function foo() {}
export default foo;
import customName from './*.js'
*/

/**
 * 模块之间的继承
 */
/*
//circleplus.js继承circle.js
export * from 'circle';
export let e = 2.7;
export default function (x) {
	return Math.exp(x);
}

module math from './circleplus.js'
import exp from './circleplus.js'
*/

/**
 * CommonJS模块输入的是被输出值的拷贝，一旦输出，模块内部变化就影响不到这个值了
 * ES6模块不同，而是生成一个动态的只读引用
 */












