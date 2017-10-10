/**
 * Programming style
 */

'use strict';

/**
 * 使用let代替var
 * let存在块级作用域且let不存在变量提升
 */
/*
 if (1) {
 console.log(x); // ReferenceError: x is not defined
 let x = 'Hello';
 }
 console.log(x);  // ReferenceError: x is not defined

 if (1) {
 console.log(x); // undefined
 var x = 'Hello';
 }
 console.log(x);  // Hello
 */

/**
 * 全局常量与线程安全
 * let与const之间，优先使用const，尤其是在全局环境，只应设置常量。符合函数式编程思想，有利于分布式计算
 * 阅读代码的人知道不应该修改这个值，防止无意修改导致错误
 * let表示的变量只应该出现在单线程运行的代码中，不能是多线程共享的，有利于保证线程安全
 */

/**
 * 字符串一律使用单引号或反引号，不使用双引号。
 * 动态字符串使用反引号
 */
/*
 //bad
 const a = "footbar";
 const b = 'foo' + a + 'bar';
 //acceptable
 const c = `footbar`;
 //good
 const a = 'footbar';
 const b = `foo${a}bar`;
 */

/**
 * 解构赋值
 * 使用数组成员对变量赋值，优先使用解构赋值
 * 函数参数如果是对象的成员，优先使用解构赋值
 * 如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值
 */
/*
 //example1
 const arr = [1,2,3,4];
 //bad
 const first = arr[0];
 const second = arr[1];
 //good
 const [first,second] = arr;

 //example2
 //bad
 function getFullName(user) {
 const firstName = user.firstName;
 const secondName = user.secondName;
 }
 //good
 function getFullName(obj) {
 const {firstName,secondName} = obj;
 }
 //best
 function getFullName({firstName,secondName}) {}

 //example3
 //bad
 function processInput(input) {
 return [left,right,top,bottom];
 }
 //good
 function processInput(input) {
 return {left,right,top,bottom};
 }
 const {left,right} = processInput(input);
 */

/**
 * 对象
 * 单行定义的对象，最后不以逗号结尾。多行定义的对象，最后以逗号结尾
 * 对象尽量静态化，不能随意添加新属性，如果必须添加，使用Object.assign()方法
 * 如果对象的属性名是动态的，可以在创造对象时使用属性表达式定义
 * 定义属性和方法尽量简洁
 */
/*
 //example1
 //bad
 const a = {k1: v1, k2: v2,};
 const b = {
 k1: v1,
 k2: v2
 };
 //good
 const a = {k1: v1, k2: v2};
 const b = {
 k1: v1,
 k2: v2,
 };

 //example2
 //bad
 const a = {};
 a.x = 3;
 //if reshape unavoiddable
 Object.assign(a,{x:3});
 //good
 const a = {x:null};
 a.x = 3;

 //example3
 //bad
 const obj = {
 id: 5,
 };
 obj[getKey('enable')] = true;
 //good
 const obj = {
 id: 5,
 [getKey('enable')]: true,
 }

 //example4
 //bad
 const ref = 'some value';
 const atom = {
 ref: ref,
 value: 1,
 addValue: function (value) {
 return atom.value + value;
 },
 };
 //good
 const atom = {
 ref,
 value: 1,
 addValue(){
 return atom.value + value;
 }
 };
 */

/**
 * 数组
 * 使用扩展运算符复制数组
 * 使用Array.from将类数组对象转为数组
 */
/*
 //bad
 const len = items.length;
 const itemsCopy = [];
 let i;
 for (i = 0; i < len; i++) {
 itemsCopy[i] = items[i];
 }
 //good
 const itemsCopy = [...items];
 */

/**
 * 函数
 * 立即执行函数写成箭头的形式
 * 需要使用函数表达式的场合，尽量用箭头函数代替。更简洁且绑定了this
 * 箭头函数取代Function.prototype.bind，不应再有self/_this/that绑定this
 * 所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数
 * 使用默认值语法设置参数的默认值
 */
/*
 //example1
 (() => {
 })();
 //example2
 //bad
 [1, 2, 3].map(function (x) {
 return x * x;
 });
 //good
 [1, 2, 3].map(x => x * x);

 //example3
 //bad
 const self = this;
 const boundMethod = function (...params) {
 return method.apply(self,params);
 };
 //acceptable
 const boundMethod = method.bind(this);
 //best
 const boundMethod = (...params) => method.apply(this,params);

 //example4
 //bad
 function divide(a,b,option = false) {}
 //good
 function divide(a,b,{option = false} = {}) {}

 //example5
 //bad
 function concatenateAll() {
 const args = Array.prototype.slice.call(arguments);
 return args.join('');
 }
 //good
 function concatenateAll(...args) {
 return args.join('');
 }

 //example6
 //bad
 function handleThings(opts) {
 opts = opts || {};
 }
 //good
 function handleThings(opts = {}) {
 //...
 }
 */

/**
 * Map结构
 * 只有模拟实体对象时才使用Object。
 * 如果只是需要key：value数据结构，则使用Map，因为map有內建的遍历机制
 * map、map.keys()、map.values()、map.entries()
 */

/**
 * Class
 * 总是用Class取代需要prototype的操作，因为Class写法更简洁，更容易理解
 * 总是使用extends继承，这样更简单，不会有破坏instanceof运算的危险
 */
/*
 //example1
 //bad
 function Queue(contents = []) {
 this._queue = [...contents];
 }
 Queue.prototype.pop = function () {
 const value = this._queue[0];
 this._queue.splice(0,1);
 return value;
 };
 //good
 class Queue{
 constructor(contents = []){
 this._queue = [...contents];
 }
 pop(){
 const value = this._queue[0];
 this._queue.splice(0,1);
 return value;
 }
 }

 //example2
 //bad
 const inherits = require('inherits');
 function PeekableQueue(contents) {
 Queue.apply(this,contents);
 }
 inherits(PeekableQueue,Queue);
 PeekableQueue.prototype.peek = function () {
 return this._queue[0];
 };
 //good
 class PeekableQueue extends Queue{
 peek(){
 return this._queue[0];
 }
 }
 */

/**
 * 模块
 * 使用import取代require
 * 如果模块只有一个输出值，就用export default，如果有多个输出值，就不用，export default不要与普通的export同时使用
 * 不要在模块输入中使用通配符，这样可以确保模块中有一个默认输出
 */
/*
//bad
const moduleA = require('moduleA');
const func1 = moduleA.func1;
const func2 = moduleA.func2;
//good
import {func1,func2} from 'moduleA';

//bad
import * as myObject './importModule';
//good
import myObject from './importModule';
 */


