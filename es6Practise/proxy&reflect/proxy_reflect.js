/**
 * Proxy & Reflect
 * Proxy 代理
 */

'use strict';

/**
 * Proxy实际上重载了点运算符
 * @type {Proxy}
 * target为拦截的目标对象(第一个对象参数)
 * handler为定制拦截行为(第二个对象参数)
 */
/*
 let obj = new Proxy({},{
 // @param target 目标对象
 // @param key 访问的属性
 // @param receiver
 //
 get: function (target,key,receiver) {
 console.log(`getting ${key}`);
 return Reflect.get(target,key,receiver);
 },
 set: function (target,key,value,receiver) {
 console.log(`setting ${key}`);
 return Reflect.set(target,key,value,receiver);
 }
 });

 obj.count = 1;
 ++obj.count;
 //setting count
 //getting count
 //setting count


 let proxy = new Proxy({},{
 get: function (target,property) {
 return 35;
 }
 });

 console.log(proxy.name); // 35
 console.log(proxy.time); // 35

 //必须对拦截器对象操作，才能触发拦截器
 //当handler为空时，就相当于直接访问target
 let target = {},
 handler = {
 get: function (target,key,receiver) {
 console.log('getting');
 return Reflect.get(target,key,receiver);
 },
 set: function (target,key,value,receiver) {
 console.log('setting');
 return Reflect.set(target,key,value * 2,receiver);
 }
 };
 let proxy = new Proxy(target,handler);

 //setting
 proxy.x = 1;
 //getting
 console.log(proxy.x); // 2
 console.log(target.x); // 2

 target.y = 2;
 //getting
 console.log(proxy.y); // 2
 console.log(target.y); // 2

 //Proxy实例可作为其他对象的原型对象
 //obj对象上没此属性，就去原型链上查找，被拦截器拦截
 let proxy = new Proxy({},{
 get: function (target,property) {
 return 35;
 }
 });
 function Klass() {}
 Klass.prototype = proxy;
 Klass.prototype.constructor = Klass;
 let obj = new Klass();
 console.log(obj.time); // 35

 let handler = {
 get: function (target,name) {
 if (name === 'prototype'){
 return Object.prototype;
 }
 else {
 return 'Hello ' + name
 }
 },
 //调用
 apply: function (target,thisBinding,args) {
 return args[0];
 },
 //实例
 construct: function (target,args) {
 return {x:args[1]};
 }
 };

 let fproxy = new Proxy(function (x,y) {
 return x + y;
 },handler);

 console.log(fproxy(1,2)); // 1
 console.log(new fproxy(1,2)); // {x:2}
 console.log(fproxy.prototype); // [object Object]
 console.log(fproxy.foo); // 'Hello foo'
 */

/**
 * Proxy支持的拦截操作
 */
/*
 //get(可以继承)
 let person = {
 name: "张三"
 };
 let proxy = new Proxy(person, {
 get: function (target,property) {
 if (property in target){
 return target[property];
 }
 else{
 throw new ReferenceError("Property \"" + property + "\" does not exist");
 }
 }
 });
 console.log(proxy.name); // "张三"
 console.log(proxy.age); // ReferenceError: Property "age" does not exist


 //使用get实现数组读取负数索引
 function createArray(...elements) {
 let handler = {
 get(target,property,receiver){
 let index = property - 0;
 if (index < 0){
 property = target.length + index + '';
 }
 return Reflect.get(target,property,receiver);
 }
 }

 let target = [];
 target.push(...elements);
 return new Proxy(target,handler);

 }

 let arr = createArray('a','b','c');
 console.log(arr[-1]); // "c"


 //使用get实现链式调用
 let method = {
 double: n => n * 2,
 pow: n => n * n,
 reverseInt: n => n.toString().split('').reverse().join('') | 0
 };

 let pipe = (function () {
 return function (value) {
 let proxy =  new Proxy({method:[]},{
 get: function (obj, property) {
 if (property == "get"){
 return obj.method.reduce(function (val,fn) {
 return fn(val);
 },value);
 }
 obj.method.push(method[property]);
 return proxy;
 }
 });
 return proxy;
 }
 })();

 let value = pipe(3).double.pow.reverseInt.get;
 console.log(value); // 63


 //set(可以继承)
 function invariant(key,action) {
 if (key[0] == '_'){
 throw new Error(`Invalid attempt to ${action} Private "${key}" property`);
 }
 }

 let handler = {
 get(target,key){
 invariant(key,'get');
 return target[key];
 },
 set(target,key,value){
 invariant(key,'set');
 if (key === "age"){
 if (!Number.isInteger(value)){
 throw new Error("The age is not an integer");
 }
 if (value >= 200 || value < 0){
 throw  new Error("The age seems invalid");
 }
 }
 target[key] = value;
 return true;
 }
 };

 let target = {age:50};
 let proxy = new Proxy(target,handler);

 console.log(proxy.age); // 50
 console.log(proxy._age); // Invalid attempt to get Private "_age" property
 proxy.name = 'nick';
 console.log(proxy.name); // "nick"
 proxy.age = 300; // The age seems invalid
 console.log(proxy._prop); // Invalid attempt to get Private "_prop" property
 proxy._prop = 'test'; // Invalid attempt to set Private "_prop" property


 // apply(target,context,args)  拦截函数的调用、call、apply操作
 // 三个参数为目标对象，上下文对象，参数数组
 let twice = {
 apply(target,context,args){
 return Reflect.apply(...arguments) * 2;
 }
 };

 function sum(left,right) {
 return left + right;
 }

 let proxy = new Proxy(sum,twice);
 console.log(proxy(1,2)); // 6
 console.log(proxy.call(null,5,6)); // 22
 console.log(proxy.apply(null,[7,8])); // 30


 // has(target,key)  可以隐藏某些属性，不被in发现
 // 两个参数为目标对象，属性
 let handler = {
 has (target,key){
 if (key[0] == '_'){
 return false;
 }
 return key in target;
 }
 };
 let target = {
 prop: 'foo',
 _prop: '_foo',
 name: 'target'
 };
 let proxy = new Proxy(target,handler);
 console.log('prop' in proxy); // true
 console.log('_prop' in proxy); // false
 console.log('name' in proxy); // true
 console.log('age' in proxy	); // false

 //如果原对象不可配置或者扩展，has拦截会报错
 let obj = {a : 10};
 Object.preventExtensions(obj);
 let proxy = new Proxy(obj,{
 has(target,key){
 return false;
 }
 });

 console.log('a' in proxy); // TypeError: 'has' on proxy: trap returned falsish for property 'a' but the proxy target is not extensible

 //construct(target,args) 用于拦截new命令
 //第一个参数为目标对象，第二个参数为参数数组
 let handler = {
 construct(target,args){
 console.log('called: ' + args.join(', '));
 //必须返回对象
 return {value: args[0] * 10};
 }
 };
 let proxy = new Proxy(function () {},handler);
 let value = new proxy(2,3); // called: 2, 3
 console.log(value); // { value: 20 }

 //deleteProperty(target,key) 拦截delete操作
 let handler = {
 deleteProperty(target,key){
 invariant(key,'delete');
 return true;
 }
 };
 function invariant(key,action) {
 if (key[0] === "_"){
 throw new Error(`Invalid attemp to ${action} private "${key}" property`);
 }
 }
 let target = {_prop: '_foo', prop: 'foo'};
 let proxy = new Proxy(target,handler);
 delete proxy.prop;
 delete proxy._prop; // Invalid attemp to delete private "_prop" property

 //defineProperty(target,key,descriptor),拦截Object.defineProperty操作
 let handler = {
 defineProperty(terget,key,descriptor){
 return false;
 }
 };
 let target = {},
 proxy = new Proxy(target,handler);
 proxy.foo = 'bar'; // TypeError: 'defineProperty' on proxy: trap returned falsish for property 'foo'

 //enumerate(target),拦截for...in循环
 // ???????
 let handler = {
 enumerate(target){
 console.log('qwe');
 //必须返回对象
 return Object.keys(target).filter(key => key[0] !== '_')[Symbol.iterator]();
 }
 };
 let target = {prop: 'foo', _prop: '_foo', _bar: '_baz'},
 proxy = new Proxy(target,handler);
 for (let key in proxy) {
 console.log(key);
 }

 //getOwnPropertyDescriptor(target,key)  拦截Object.getOwnPropertyDescriptor
 //getPrototypeOf(target)  拦截Object.getPrototypeOf()
 //isExtensible(target) 拦截Object.isExtensible操作
 //ownKeys(target) //拦截Object.keys()操作
 let handler = {
 ownKeys(target){
 return ['z','y'];
 }
 },
 target = {x:1,y:2,z:3},
 proxy = new Proxy(target,handler);
 console.log(Object.keys(proxy)); // ['z', 'y']

 // preventExtensions(target) 拦截Object.preventExtensions方法
 // setPrototypeOf(target,proto)  拦截Object.setPrototypeOf方

 //Proxy.revocable() 返回一个可取消的Proxy实例
 let target = {},
 handler = {};
 let {proxy,revoke} = Proxy.revocable(target,handler);
 proxy.foo = 123;
 console.log(proxy.foo);  // 123
 revoke();
 console.log(proxy.foo); // TypeError: Cannot perform 'get' on a proxy that has been revoked
 */

/**
 * Reflect
 * 将一些Object对象的一些明显属于语言层面的方法放到Reflect对象上
 * 修改某些Object方法的返回结果
 * 让Object操作都变成函数行为，如has、deleteProperty等等
 * 对象方盒和Proxy一致，不管Proxy怎样修改行为，都可以在Reflect上获取默认行为
 */
/*
let obj;
let loggedObj = new Proxy(obj, {
	get(target, key){
		console.log('get ' + key);
		return Reflect.get(target, key);
	},
	defineProperty(target, key){
		console.log('delete ' + key);
		return Reflect.defineProperty(target, key);
	},
	has(target, key){
		console.log('has ' + key);
		return Reflect.has(target, key);
	}
});
*/









