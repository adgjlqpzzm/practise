/**
 * Class.
 * 为了更接近传统语言的语法，引入了Class作为对象的模板。
 * constructor是构造方法
 * this代表对象实例
 * 定义类的方法时，不加function，方法之间不加逗号
 */

'use strict';
/*
 let methonName = 'getArea';
 class Point {
 constructor(x, y) {
 this.x = x;
 this.y = y;
 }

 toString() {
 return "(" + this.x + "," + this.y + ")";
 }
 //可用属性名
 [methodName]() {
 // ......
 }
 }
 console.log(Object.keys(Point.prototype)); // [] (不可枚举)
 console.log(Object.getOwnPropertyNames(Point.prototype)); // ['constructor',toString]

 function Point() {

 };
 Point.prototype.toString = function () {

 };
 console.log(Object.keys(Point.prototype)); // [toString] (可枚举)
 console.log(Object.getOwnPropertyNames(Point.prototype)); // ['constructor',toString]
 */

/**
 * constructor方法
 * 是类的默认方法，通过new生成对象实例时自动调用该方法
 * 一个类必须有constructor方法，如果没有显式定义，一个空的construcctor方法会被默认加载
 * 与ES5方式的constructor不同
 */
/*
 class Foo {
 constructor(){

 }
 }
 console.log(Foo.prototype.constructor === Foo); // true
 console.log(new Foo() instanceof Foo); // true

 class Foo {
 constructor(){
 return Object.create({});
 }
 }
 console.log(Foo.prototype.constructor === Foo); // true
 console.log(Foo.prototype.constructor); // [Function Foo]
 console.log(Foo.prototype.constructor()); // Class constructor Foo cannot be invoked without 'new'
 console.log(new Foo() instanceof Foo); // false

 function A() {}
 console.log(A.prototype.constructor === A); // true
 console.log(A.prototype.constructor); // [Function: A]
 A.prototype.constructor = function () {};
 console.log(A.prototype.constructor === A); // false
 console.log(A.prototype.constructor); // [Function]
 console.log(new A() instanceof A); // true
 A.prototype.constructor = function () {
 return Object.create({});
 };
 console.log(new A() instanceof A); // true
 */

/**
 * 实例对象
 * Class直接调用会报错，必须new
 */
/*
 class Point {
 constructor(x, y) {
 this.x = x;
 this.y = y;
 }

 toString() {
 return "(" + this.x + "," + this.y + ")";
 }

 }
 let point = new Point(2,3);
 console.log(point.toString()); // (2,3)
 console.log(point.hasOwnProperty('x')); // true
 console.log(point.hasOwnProperty('y')); // true
 console.log(point.hasOwnProperty('toString')); // false
 console.log(Object.getPrototypeOf(point).hasOwnProperty('toString')); // true
 console.log(Object.getPrototypeOf(point).constructor === Point.prototype.constructor); // true
 */

/**
 * name属性
 * 本质上ES6的Class只是构造函数的一层包装，所以函数的许多特性都被Class继承
 * 包括name属性
 */
/*
 class Point {
 }
 let point = new Point();
 console.log(point.name); // undefined
 console.log(Point.name); // Point
 */

/**
 * Class表达式
 * Class也可以使用表达式的形式定义
 */
/*
 //以下这个类的名字是MyClass不是Me，Me只在Class内部代码可用，代指当前类
 const MyClass = class Me{
 getClassName(){
 return Me.name;
 }
 };
 let inst = new MyClass();
 console.log(inst.name); // undefined
 console.log(MyClass.name); // Me
 console.log(inst.getClassName()); // Me
 console.log(Me.name); // ReferenceError: Me is not defined
 */

/**
 * Class不存在变量提升
 */
/*
 new Foo();
 class Foo{}; // ReferenceError: Foo is not defined
 */

/**
 * Class的继承
 * Class之间可以通过extends关键字实现继承
 * super代表父类的实例(即父类的this对象)
 * 子类必须在constructor中调用super方法，否则新建实例会报错。因为子类没有自己的this对象，而是继承了父类的this对象然后进行加工
 * 如果不调用super方法，子类就得不到this对象
 * 而且this必须在调用super方法之后调用
 */
/*
 class Point {
 constructor(x, y) {
 this.x = x;
 this.y = y;
 }

 toString() {
 return this.x + '.' + this.y;
 }
 }
 class ColorPoint extends Point {
 constructor(x, y, color) {
 super(x, y, color);
 this.color = color;
 }

 toString() {
 return this.color + ' ' + super.toString();
 }
 }
 let colorPoint = new ColorPoint(1, 2, 'red');
 console.log(colorPoint); // ColorPoint { x: 1, y: 2, color: 'red' }
 console.log(colorPoint.toString()); // red 1.2

 // 子类不调用super方法
 class Point{}
 class ColorPoint extends Point{
 constructor(){}
 }
 let colorPoint = new ColorPoint(); // ReferenceError: this is not defined

 //在调用super方法之前使用this
 class Point{}
 class ColorPoint extends Point{
 constructor(){
 this.color = 'red';
 super();
 }
 }
 let colorPoint = new ColorPoint(); // ReferenceError: this is not defined
 */

/**
 * 类的prototype属性和__proto__属性
 * ES5中，每个对象的__proto__指向对应的构造函数的prototype属性。
 * 1.子类的__proto__属性表示构造函数的继承，总是指向父类
 * 2.子类prototype属性的__proto__属性表示方法的继承，总是指向父类的prototype属性
 */
/*
 class A{}
 class B extends A{}
 console.log(B.__proto__ === A); // true
 console.log(B.prototype.__proto__ === A.prototype); // true
 */

/**
 * Object.getPrototypeOf(obj)
 * 从子类上获取父类
 * 实际为获取obj.__proto__
 * 取代.__proto__
 */
/*
 class Point {
 }
 class ColorPoint extends Point {
 }
 let point = new Point();
 let colorPoint = new ColorPoint();
 console.log(ColorPoint.__proto__ === Point); // true
 console.log(Object.getPrototypeOf(ColorPoint) === Point); // true
 console.log(ColorPoint.prototype.__proto__ === Point.prototype); // true
 console.log(Object.getPrototypeOf(ColorPoint.prototype) === Point.prototype); // true
 console.log(colorPoint.__proto__ === ColorPoint.prototype); // true
 console.log(Object.getPrototypeOf(colorPoint) === ColorPoint.prototype); // true

 console.log(colorPoint.__proto__.__proto__ === point.__proto__); // true
 console.log(colorPoint.__proto__ === point); // false

 function A() {}
 function B() {}
 B.prototype = Object.create(A.prototype);
 console.log(B.prototype.__proto__ === A.prototype); // true
 console.log(Object.getPrototypeOf(B.prototype) === A.prototype); // true
 console.log(B.__proto__ === A); // false
 console.log(Object.getPrototypeOf(B) === A); // false
 Object.setPrototypeOf(B, A);
 console.log(B.__proto__ === A); // true
 console.log(Object.getPrototypeOf(B) === A); // true
 */

/**
 * super关键字
 * 由于任何对象都是继承其它对象的，所以可以在任意一个对象中使用super关键字
 */
/*
 let obj = {
 toString(){
 return "MyObject: " + super.toString();
 }
 };
 console.log(obj.toString()); // MyObject: [object Object]
 */

/**
 * 原生构造函数的继承
 * ES6可以自定义原生数据结构的子类，ES5不可以
 * Boolean、Number、String、Array、Date、Function、RegExp、Error、Object
 */

/**
 * Class的取值函数和存值函数(getter && setter)
 */
/*
 class MyClass {
 constructor() {
 this._value = 1;
 }

 get value() {
 return this._value;
 }

 set value(value) {
 console.log('setter: ' + value);
 this._value = value;
 return this._value;
 }
 }
 let myClass = new MyClass();
 console.log(myClass.value); // 1
 console.log(myClass.value = 2); // setter: 2 // 2

 let descriptor = Object.getOwnPropertyDescriptor(MyClass.prototype, 'value');
 console.log('get' in descriptor); // true
 console.log('set' in descriptor); // false
 console.log(descriptor); // {get:[Function: get value],set: [Function set value],enumerable: false,configurable:true}
 */

/**
 * Class中方法也可以是Generator函数
 */
/*
 class Foo {
 constructor(...args) {
 this.args = args;
 }

 * [Symbol.iterator]() {
 for (let arg of this.args) {
 yield arg;
 }
 }
 }
 let foo = new Foo('Hello','World');
 for (let value of foo) {
 console.log(value); // Hello // World
 }
 */

/**
 * Class的静态方法和静态属性
 * 在方法和属性前面加上static关键字，表示为静态的
 * 静态的方法和属性不会被实例继承，而是直接通过类调用
 * 静态属性和方法可以被子类继承，也可以通过super调用
 */
/*
 //静态方法
 class Foo{
 static classMethod(){
 return 'Foo';
 }
 allMethod(){
 return 'foo';
 }
 printClassMethod(){
 console.log(this.classMethod());
 }
 printAllMethod(){
 console.log(this.allMethod());
 }
 }
 class Bar extends Foo{
 static classMethod(){
 return 'Bar'
 }
 allMethod(){
 return 'bar'
 }
 printClassMethod(){
 console.log(this.classMethod());
 console.log(super.classMethod());
 }
 printAllMethod(){
 console.log(this.allMethod());
 console.log(super.allMethod());
 }
 }
 console.log(Foo.classMethod()); // Foo
 console.log(Bar.classMethod()); // Bar
 //console.log(Foo.allMethod()); // TypeError: Foo.allMethod is not a function
 //console.log(Bar.allMethod()); //TypeError: Bar.allMethod is not a function
 let foo = new Foo();
 let bar = new Bar();
 //console.log(foo.classMethod()); // TypeError: foo.classMethod is not a function
 //console.log(bar.classMethod()); // TypeError: bar.classMethod is not a function
 foo.printAllMethod(); // foo
 bar.printAllMethod(); // bar // foo
 //foo.printClassMethod(); // TypeError: this.classMethod is not a function
 //bar.printClassMethod(); // TypeError: this.classMethod is not a function
 */

/**
 * 静态属性(class本身的属性，而不是定义在实例对象上的属性)
 * ES6明确规定，Class内部无静态属性
 * ES7支持
 */
/*
 //目前只能通过这种方式读写静态属性
 class Foo{}
 Foo.x = 1;
 Foo.y = 2;
 let foo = new Foo();
 console.log(foo.x); // undefined
 console.log(Foo.x); // 1
 console.log(foo.y); // undefined
 console.log(Foo.y); // 2

 //以下的方法都不可以
 class Foo{
 prop1: 2
 static prop2: 2
 }

 //ES7写法
 //实例属性的新写法
 class MyClass{
 myProp = 43;
 }
 //静态属性的新写法
 class MyClass{
 static myProp = 43;
 }
 */

/**
 * new.target属性
 * 在构造函数中返回new命令所作用的构造函数。
 * 如果构造函数不是通过new调用的，则返回undefined
 * class内部调用返回当前Class
 * 继承父类的子类使用super时，new.target返回的是子类
 */
/*
//确保构造函数只能通过new命令调用
function Person(name) {
	if (new.target !== undefined) {
		this.name = name;
	}
	else {
		throw new Error('必须通过new来生成实例');
	}
}
let person = new Person('Jaxon');
console.log(person.name); // Jaxon
let noPerson = Person.call(person,'张三'); // Error: 必须通过new来生成实例

//子类继承父类时的new.target
class Rectangle{
	constructor(){
		console.log(new.target);
	}
}
class Square extends Rectangle{
	//如果不写constructor与里面的super，会自动生成
	//如果写了constructor不写super，会报错
}
let rectangle = new Rectangle(); // [Function: Rectangle]
let square = new Square(); // [Function: Square]

//确保类必须继承后才能使用
class Shape{
	constructor(){
		if (new.target === Shape){
			throw new Error('此类需继承使用');
		}
	}
}
class Rectangle extends Shape{}
let rectangle = new Rectangle();
let shape = new Shape(); // Error: 此类需继承使用
 */

/**
 * Mixin模式
 * 将多个类的接口“混入”另一个类。
 */
/*
function mix(...mixins) {
	class Mix{}
	for (let mixin of mixins) {
		//书中这样写，这是把mixin的属性复制过去当静态属性用？
 		copyProperties(Mix,mixin);
 		//这样写，是吧mixin上的属性复制到类(构造函数)的prototype上去，可以继承和被实例使用
		copyProperties(Mix.prototype,mixin);
		copyProperties(Mix.prototype,mixin.prototype);
	}
	return Mix
}
function copyProperties(target,source) {
	for (let key of Reflect.ownKeys(source)) {
		if (key !== "constructor" &&
			key !== "name" &&
			key !== "prototype") {
			let des = Object.getOwnPropertyDescriptor(source,key);
			Object.defineProperty(target,key,des);
		}
	}
}
*/
 
 