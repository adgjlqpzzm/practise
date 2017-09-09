/**
 * Object.
 */

'use strict';

/**
 * 属性的简洁表示
 */

/*
 //es6允许对象只写属性名，属性值等于对应的属性名代表的变量
 let [prop1,prop2] = ['first'];
 let obj = {prop1,prop2};
 console.log(obj); // {prop1: 'first',prop2: undefined}
 prop1 = 'another';
 console.log(obj); // {prop1: 'first',prop2: undefined}

 //这种方法用于返回值非常方便
 function foo(x,y) {
 return {x,y};
 }

 //方法也可以简写
 let obj = {
 method(){
 return 'success';
 }
 };

 //如果一个方法是generator函数 ，则其前面需要加上星号
 let obj = {
 * m(){
 yield 'Hello World!';
 }
 };
*/

/**
 * 属性名表达式
 * 设置对象属性时，可以直接使用标识符a.xy,可以使用表达式a['x' + 'y']
 * 当使用大括号定义对象时，es5不能使用大括号作属性名，es6可以
 * 同样可以定义方法名
 */
/*
let [key1,key2] = ['first','second'];
let obj = {
	[key1] : 'firstKey',
	key2,
	['key' + '3'] : 'third',
	['foo' + '1'](){
		return 'function';
	}
};
console.log(obj); // { first: 'firstKey', key2: 'second', key3: 'third', foo1: [Function: foo1]}
*/

/**
 * 对象属性为方法时，也有name属性，返回属性名（函数返回函数名）
 * 当为存取值函数时，前面会加上get，set
 * 当为Function构造的函数时，name会返回anonymous
 * 当为bind方法创造的函数，前面会加上bind
 */
/*
let person = {
	 _Name: 'Jaxon',
	sayName: function () {
		console.log(this._Name);
	}
};
console.log(person.sayName.name); // sayName

console.log((new Function).name); // anonymous

function foo() {}
console.log(foo.bind().name); // bind foo
*/

/**
 * Object.is
 * 用于比较两个值是否相等，行为和===相似，也有不同
 * 一个是+0不等于-0，一个是NaN等于自身
 */
/*
console.log(Object.is('foo','foo')); // true
console.log(Object.is({},{})); // false
console.log(Object.is(undefined,undefined)); // true
console.log(Object.is('1',1)); // false

console.log(Object.is(NaN,NaN)); // true
console.log(Object.is(+0,-0)); // false
console.log(NaN === NaN); // false
console.log(+0 === -0); // true
*/

/**
 * Object.assign(target,...source)
 * 将源对象所有可枚举(enumerable)的对象复制到目标对象
 * 很方便的为对象添加属性和方法，不需要*.prototype.* = function(){}
 * 很方便的合并多个对象，设置默认值
 */
/*
//原型链上的和enumerable为false的属性不会复制
let source1 = {x:1};
source1.__proto__.y = 2;
Object.defineProperty(source1,'z',{value:3,enumerable:true});
Object.defineProperty(source1,'w',{value:4,enumerable:false});
let source = [source1,{b:2},{c:3}];
let target = {a:1};
let newTarget = Object.assign(target,...source);
console.log(newTarget); // { a: 1, x: 1, z: 3, b: 2, c: 3 }

 //有访问器的情况,get后的属性的值为返回值
 let obj1 = {a:1};
 let obj2 = {
 _name: 'Jaxon',
 get name(){
 return this._name;
 },
 set name(value){
 this._name = value;
 }
 };
 console.log(Object.assign(obj1,obj2)); // { a: 1, _name: 'Jaxon', name: 'Jaxon' }

 //可以复制对象
 //对象深复制可以遍历赋值，也可以Object.create()
 //另外，数组深复制可以arr.concat(),arr.splice(0)
 // let obj1 = {a:1}
 // let obj2 = Object.assign({},obj1);

 //以下方法可以将原型链的一起复制
 function clone(origin){
 	let proto = Object.create(Object.getPrototypeOf(origin));
	return Object.assign(proto,origin);
 }

 //如果源对象的属性是对象，则复制的是这个对象的引用，为浅复制
 // var obj1 = {a: {b: 1}};
 // var obj2 = Object.assign({}, obj1);
 // obj1.a.b = 2;
 // console.log(obj2.a.b);

 //第一层属性是深复制
 let obj1 = {a:{b:1}};
 let obj2 = Object.assign({},obj1);
 obj1.a = {b:2};
 console.log(obj2);

 //如果存在属性名相同，源对象的属性值会覆盖目标对象的属性值
 let obj1 = {a:1,b:2};
 let obj2 = {a:1,b:3,c:3};
 console.log(Object.assign(obj1,obj2)); // { a: 1, b: 3, c: 3}

 //如果相同属性都为对象，则嵌套的对象直接覆盖不会添加
 let obj1 = { a: { b: 1, c: 2}};
 let obj2 = { a: { d: 3}};
 console.log(Object.assign(obj1,obj2)); // { a: { d: 3}}
 
 //属性名为Symbol的对象，也会被复制进去
 //???????????????????????
 //实践效果与书中描述不符
 let obj = Object.assign({a: 'b'},{[Symbol('c')]: 'd'});
 console.log(obj); // {a: 'b'}
 console.log({[Symbol('c')]: 'd'}); // {}
 
 //处理数组时，按照对象处理
 console.log(Object.assign([1,2,3],[4,5])); // [4,5,3]
*/

/**
 * es6中属性的遍历
 * 首先遍历所有属性名为数值的属性，按照数字排序
 * 首先遍历所有属性名为字符串的属性，按照生成时间排序
 * 首先遍历所有属性名为Symbol值的属性，按照生成时间排序
 */
//1.for...in循环  (遍历所有可枚举属性,不含Symbol)
//2.Object.keys(obj)  (返回数组,遍历自身的可枚举属性，不含原型链上的,不含Symbol)
//3.Object.getOwnPropertyNames(obj)  (返回数组，遍历所有属性，不含Symbol)
//4.Object.getOwnPropertySymbols(obj)  (范湖数组，遍历所有的Symbol属性)
//5.Reflect.ownKeys(obj)  (返回数组，遍历所有属性，包含Symbol)
//6.Reflect.enumerate(obj)  (返回一个Iterator对象，和for...in相同)

/**
 * 最好不要使用__proto__，而使用Object.setPrototypeOf(obj,proto),Object.getPrototypeOf(obj)或Object.create(obj)
 */

/**
 * 对象的rest参数与扩展运算符
 * es7支持
 */





























































