/**
 * Generator
 * Generator函数是ES6提供的一种异步编程解决方案
 * 执行Genetator函数会返回一个遍历器对象。Generator函数除了是状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态
 */

'use strict';
/*
 //yield语句是暂停执行的标记，value属性表示当前内部属性的值，done表示是否遍历结束
 function* generator() {
 yield 'hello';
 yield 'world';
 return 'end';
 }
 let hw = generator();
 console.log(hw); // {}
 console.log(hw.next()); // { value: 'hello', done: false }
 console.log(hw.next()); // { value: 'world', done: false }
 console.log(hw.next()); // { value: 'end', done: true }
 console.log(hw.next()); // { value: undefined, done: true }

 //普通函数不能有yield函数
 let arr = [1,[[2,3],4],[5,6]];
 //会报错 SyntaxError: Unexpected strict mode reserved word
 // let flat = function* (arr) {
 // 	a.forEach((item) => {
 // 		if (typeof item !== 'number'){
 // 			yield* flat(item);
 // 		}
 // 		else{
 // 			yield item;
 // 		}
 // 	})
 // };
 //改写方式如下
 let flat = function* (arr) {
 let len = arr.length;
 for (let i = 0; i < len; i++) {
 let item = arr[i];
 if (typeof item !== 'number') {
 yield* flat(item);
 }
 else {
 yield item;
 }
 }
 };
 for (let item of flat(arr)) {
 console.log(item); // 1 // 2 // 3 // 4 // 5 // 6
 }

 //yield如果在一个表达式里，必须有括号，用作参数或用于赋值表达式的右边，不加
 //console.log('Hello' + yield 123); // SyntaxError
 // ??????????
 //console.log('Hello' + (yield 123)); // SyntaxError: Unexpected strict mode reserved word

 //yield无返回值(或为undefined)，next参数会被当做上一条yield的返回值
 function* foo(x) {
 let y = 2 * (yield (x + 1));
 let z = yield (y / 3);
 return (x + y + z);
 }
 let a = foo(5);
 console.log(a.next()); // {value: 6, done: false}
 console.log(a.next()); // {value: NaN, done: false}
 console.log(a.next()); // {value: NaN, done: true}
 let b = foo(5);
 console.log(b.next()); // {value: 6, done:false}
 console.log(b.next(12)); // {value: 8, done:false}
 console.log(b.next(13)); // {value: 42, done:true}
 */

/**
 * for...of循环
 * 自动遍历Generator函数，不再需要调用next方法，一旦next返回对象的done属性为true，循环就会终止
 * for...of、拓展运算符、解构赋值、Array.from方法内部都是调用iterator接口，可将Generator函数返回的Iterator对象作为参数。
 */
/*
 function* numbers() {
 yield 1;
 yield 2;
 return 3;
 yield 4;
 }
 console.log([...numbers()]); // [ 1, 2 ]
 console.log(Array.from(numbers())); // [ 1, 2 ]
 let [x,y] = numbers();
 console.log(x,y); // 1 // 2
 for (let n of numbers()) {
 console.log(n); // 1 // 2
 }

 //为对象增加iterator接口
 function* objectEntries() {
 let propKeys = Object.keys(this);
 for (let propKey of propKeys) {
 yield [propKey, this[propKey]];
 }
 }
 let jane = {first: 'Jane', last: 'Doe'};
 jane[Symbol.iterator] = objectEntries;
 for (let [key,value] of jane) {
 console.log(`${key}: ${value}`); // first: Jane  // last: Doe
 }
 */

/**
 * Generator.prototype.throw()
 * 可以在函数体外抛出错误，然后在函数体内捕获
 * 也可以在函数体内抛出错误，然后在函数体外捕获
 * 如果没有在内部部署try...catch代码块，遍历器的throw方法抛出的错误会被外部的捕获，中断执行
 * 但是如果改为throw语句抛出的错误，则不会影响遍历器的状态
 * 如果内部部署了，遍历器的throw方法抛出的错误不会影响下一次遍历，否则遍历直接终止
 */
/*
 let g = function* () {
 while(1){
 try{
 yield;
 }
 catch (e){
 if (e != 'a'){
 throw e;
 }
 console.log('内部捕获',e);
 }
 }
 };
 let i = g();
 i.next();
 try{
 i.throw('a');
 i.throw('b');
 }
 catch (e){
 console.log('外部捕获',e);
 }
 // 内部捕获 a
 // 外部捕获 b
 */

/**
 * Generator.prototype.return()
 * 返回给定的值，并终结Generator遍历
 */

/*
 function* gen() {
 yield 1;
 yield 2;
 yield 3;
 }
 let g = gen();
 console.log(g.next()); // { value: 1, done: false}
 console.log(g.return('foo')); // { value: 'foo', done: true }
 console.log(g.next()); // { value: undefined, done :true }
 let g2 = gen();
 console.log(g2.next());  // { value: 1, done: false}
 console.log(g.return()); // { value: undefined, done:true}

 //如果函数内部有try...finally代码块，return方法会推迟到finally代码块执行完再执行
 function* numbers() {
 yield 1;
 try {
 yield 2;
 yield 3;
 }
 finally {
 yield 4;
 yield 5;
 }
 yield 6;
 }
 let g = numbers();
 console.log(g.next()); // { value: 1, done: false }
 console.log(g.next()); // { value: 2, done: false }
 console.log(g.return(7)); // { value: 4, done: false }
 console.log(g.next()); // { value: 5, done: false }
 console.log(g.next()); // { value: 7, done: true }
 */

/**
 * yield*
 * 在一个Generator函数里直接调用另一个Generator函数是无效的，需要用到yield*
 */
/*
 function* inner() {
 yield 'hello';
 }
 function* outer1() {
 yield 'open';
 yield inner();
 yield 'close';
 }
 function* outer2() {
 yield 'open';
 yield* inner();
 yield 'close';
 }
 let gen1 = outer1();
 console.log(gen1.next().value); // open
 console.log(gen1.next().value); // {}
 console.log(gen1.next().value); // close
 let gen2 = outer2();
 console.log(gen2.next().value); // open
 console.log(gen2.next().value); // hello
 console.log(gen2.next().value); // close
 let gen3 = outer2();
 for (let value of gen3) {
 console.log(value); // open // hello // close
 }

 //数据结构只要有Iterator接口，就可以用yield*遍历
 function* gen() {
 yield [1,2,3];
 yield*  [1,2];
 yield 'hello';
 yield* 'hi';
 }
 for (let value of gen()) {
 console.log(value); // [1,2,3] // 1 // 2 // hello // h // i
 }

 //使用yield*遍历完全二叉树
 function Tree(left,label,right) {
 this.left = left;
 this.label = label;
 this.right = right;
 }
 function makeTree(array) {
 if (array.length == 1) {
 return new Tree(null,array[0],null);
 }
 else {
 let leftTree = makeTree(array[0]);
 let rightTree = makeTree(array[2]);
 return new Tree(leftTree,array[1],rightTree);
 }
 }
 function* inorder(t) {
 if (t) {
 yield* inorder(t.left);
 yield t.label;
 yield* inorder(t.right);
 }
 }
 let tree = makeTree([[['a'],'b',['c']],'d',[['e'],'f',['g']]]);
 let res = [];
 for (let node of inorder(tree)) {
 res.push(node);
 }
 console.log(res); // [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]

 //Generator函数是实现状态机的最佳选择
 //es5的实现
 let ticking = true;
 let clock = function () {
 if (ticking){
 console.log('Tick');
 }
 else{
 console.log('Tock');
 }
 ticking = !ticking;
 };
 //es6的实现
 let clock = function* () {
 while(1){
 yield;
 console.log('Tick');
 yield;
 console.log('Tock');
 }
 };
 */

/**
 * Generator函数的应用
 * 处理异步操作，改写回调函数
 */
/*
 function* loadUI() {
 showLoadingScreen();
 yield loadUIDataAsynchronously();
 hideLoadingScreen();
 }
 let loader = loadUI();
 //加载UI
 loader.next();
 //卸载UI
 loader.next();

 //Generator将回调函数改成直线执行形式
 function* longRunningTask() {
 try {
 let value1 = yield step1();
 let value2 = yield step2(value1);
 let value3 = yield step3(value2);
 let value4 = yield step4(value3);
 // Do something with value4
 }
 catch (e){
 // Handle any error from step1 through step4
 }
 }
 //task: iterator对象
 function scheduler(task) {
 setTimeout(function () {
 //taskObj: { value: ***, done: *** }
 //将上一个yield返回的value作为参数，给value赋值
 let taskObj = task.next(task.value);
 //如果Generator函数未结束，继续调用
 if (!taskObj.done) {
 task.value = taskObj.value;
 //将iterator对象task作为参数
 scheduler(task);
 }
 },0)
 }

 //部署iterator接口
 function* iterEnteies(obj) {
 let keys = Object.keys(obj);
 for (let i = 0; i < keys.length; i++) {
 let key = keys[i];
 yield [key, obj[key]];
 }
 }
 let obj = {foo: 3, bar: 7};
 for (let [key, value] of iterEnteies(obj)) {
 console.log(key, value); // foo 3  // bar 7
 }
 */

