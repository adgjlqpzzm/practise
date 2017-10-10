/**
 * Iterator(遍历器)
 * 是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构，只要部署了Iterator接口，就可完成遍历操作
 * 1.为各种数据结构提供一个统一的简便的访问接口
 * 2.使得数据结构成员能够按照某种次序排列
 * 3.ES6创造了一种新的遍历命令for...of
 */

'use strict';
/*
 //模拟next方法返回值的例子
 let it = makeIterator(['a', 'b']);
 console.log(it.next()); // { value: 'a', done: false }
 console.log(it.next()); // { value: 'b', done: false }
 console.log(it.next()); // { value: undefined, done: true }
 function makeIterator(arr) {
 let nextIndex = 0,
 len = arr.length;
 return {
 next: function () {
 return nextIndex < len ?
 {value: arr[nextIndex++], done: false} :
 {value: undefined, done: true};
 }
 }
 }
 */
/**
 * 默认的Iterator接口部署在数据结构的Symbol.iterator属性。一个数据结构只要有Symbol.iterator属性，就可认为是可遍历的。
 * 调用Symbol.iterator方法，就会得到当前数据结构默认的遍历器生成函数。
 * ES6中，数组、类数组对象、Map、Set都具备原生iterator接口
 */
/*
 let arr = ['a','b','c'];
 let iter = arr[Symbol.iterator]();
 console.log(iter.next()); // { value: 'a', done: false }
 console.log(iter.next()); // { value: 'b', done: false }
 console.log(iter.next()); // { value: 'c', done: false }
 console.log(iter.next()); // { value: undefined, done: true }

 //对象在Symbol.iterator上部署遍历器生成方法
 class RangeIterator{
 constructor(start,stop){
 this.value = start;
 this.stop = stop;
 }

 [Symbol.iterator](){
 return this;
 }

 next(){
 let value = this.value;
 if (value < this.stop) {
 this.value++;
 return {done: false, value: value};
 }
 else {
 return {done: true, value: undefined};
 }
 }

 }
 function range(start,stop) {
 return new RangeIterator(start,stop);
 }
 for (let value of range(0,3)) {
 console.log(value); // 0 // 1 // 2
 }

 //通过遍历器实现指针结构
 function Obj(value) {
 this.value = value;
 this.next = null;
 }
 Obj.prototype[Symbol.iterator] = function(){

 let iterator = {
 next: next,
 };

 let current = this;

 function next() {
 if (current){
 let value = current.value,
 done = current == null;
 current = current.next;
 return {done,value};
 }
 else{
 return {done: true};
 }
 }

 return iterator;

 };
 let obj1 = new Obj(1);
 let obj2 = new Obj(2);
 let obj3 = new Obj(3);
 obj1.next = obj2;
 obj2.next = obj3;

 for (let i of obj1) {
 console.log(i); // 1 // 2 // 3
 }

 //对于类数组对象，以下两种方法部署Iterator接口更简便
 NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
 NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
 [...document.querySelector('div')];

 //类数组对象与普通对象调用数组Iterator接口的不同
 let obj1 = {
 0: 'a',
 1: 'b',
 2: 'c',
 length: 3,
 [Symbol.iterator]: Array.prototype[Symbol.iterator]
 };
 let obj2 = {
 0: 'a',
 1: 'b',
 2: 'c',
 [Symbol.iterator]: Array.prototype[Symbol.iterator]
 };
 let obj3 = {
 'a': 'a',
 'b': 'b',
 'c': 'c',
 length: 3,
 [Symbol.iterator]: Array.prototype[Symbol.iterator]
 };
 for (let item of obj1) {
 console.log(item); // a // b // c
 }
 for (let item of obj2) {
 console.log(item); //
 }
 for (let item of obj3) {
 console.log(item); // undefined // undefined // undefined
 }
 */

/**
 * 调用Iterator接口的场合
 * 其余还有：for...of、Array.from()、Map()、Set()、WeakMap()、WeakSet()、Promise.all()、Promise.race()
 */
/*
 //结构赋值
 let set = new Set(['a','b','c']);
 let map = new Map([['key1','value1'],['key2','value2']]);
 let [x,...y] = set;
 let [i,j] = map;
 console.log(x,y); // a // ['b','c']
 console.log(i,j); // ['key1','value1'] // ['key2','value2']

 //扩展运算符
 let str = 'hello',
 arr = ['b','c'];
 console.log([...str]); // [ 'h', 'e', 'l', 'l', 'o' ]
 console.log(['a',...arr,'b']); // [ 'a', 'b', 'c', 'b' ]

 // yield* yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口
 let genetator = function* () {
 yield 1;
 yield [2,3,4];
 yield* [2,3,4];
 yield 5;
 };
 let iterator = genetator();
 console.log(iterator.next()); // {value: 1, done: false}
 console.log(iterator.next()); // {value: [2,3,4], done: false}
 console.log(iterator.next()); // {value: 2, done: false}
 console.log(iterator.next()); // {value: 3, done: false}
 console.log(iterator.next()); // {value: 4, done: false}
 console.log(iterator.next()); // {value: 5, done: false}
 console.log(iterator.next()); // {value: undefined, done: true}

 //以数组为例修改遍历器行为
 //必须通过构造器，不能通过字面量直接赋值
 let str = new String('hello');
 str[Symbol.iterator] = function () {
 return {
 next: function () {
 if (this._first){
 this._first = false;
 return {value: 'bye', done: false};
 }
 else {
 return {done: true};
 }
 },
 _first: true
 };
 };
 console.log([...str]); // [ 'bye' ]

 //Iterator接口与Generate函数
 let myIterable = {
 *[Symbol.iterator](){
 yield 'hello';
 yield 'world';
 }
 };
 for (let value of myIterable) {
 console.log(value); // hello // world
 }
 */

/**
 * 遍历器对象的throw()和return()
 * return方法必须返回一个对象，用于for...of对象提前终止(break或报错)
 * throw方法主要配合Generator函数使用
 */



























