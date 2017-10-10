/**
 * Decorator 修饰器
 * 修饰器是一个表达式，用于修改类的行为，为ES7的提案
 * 修饰器本质上是能在编译时执行的函数
 */

'use strict';

/*
 function testable(isTestable) {
 return function (target) {
 target.isTestable = isTestable;
 }
 }
 @testable(true)
 class MyTestableClass{}
 console.log(MyTestableClass.isTestable);

 @testable(false)
 class MyClass{}
 console.log(MyClass.isTestable);
 */

/**
 * 添加在实例上可以调用的属性
 */
/*
//mixins.js
export function mixins(...list) {
	return function (target) {
		Object.assign(target.prototype, ...list);
	}
}
//main.js
import {mixins} from './mixins';
const Foo = {
	foo(){
		console.log('foo');
	}
};
@mixins(Foo)
class MyClass{}
let obj = new MyClass();
obj.foo(); // 'foo'
*/

/**
 * 方法的修饰
 * 修饰器函数接受三个参数，第一个参数是要修饰的目标对象，第二个参数是修饰的属性名，第三个是属性的描述对象
 */
/*
class Person{
	@readonly
	name(){return `${this.first} ${this.last}`}
}
function readonly(target,name,descriptor) {
	descriptor.writable = flase;
	return descriptor;
}
*/

/**
 * 变量提升使修饰器不能用于函数
 */
/*
var counter = 0;
var add = function () {
	counter++;
};
@add
function foo() {}

//实际执行如下
var counter;
var add;
@add
function foo() {}
counter = 0;
add = function () {
	counter++;
};
*/

/**
 * code-decorators.js模块
 * @autobind 使得方法中的this对象绑定原始对象
 * @readonly 使得属性或方法不可写
 * @override 检查子类的方法是否正确覆盖了父类的同名方法，如果不正确会报错
 * @deprecate（@deprecated） 在控制台显示一条警告，表示该方法将废除
 * @superessWarnings 抑制decorated修饰器导致的console.warn()调用，异步代码发出的调用除外
 */


















