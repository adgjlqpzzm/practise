/**
 * Promise.
 * 传递异步操作的消息
 */

'use strict';

/**
 * 用法如下
 * @type {Promise} 构造函数，用来生成promise实例
 * 构造函数接受一个函数作为参数，函数的两个参数resolve与reject为两个函数，引擎提供
 * resolve:将Promise对象的状态从Pending变为Resolved，异步操作成功时调用，并将异步操作的结果作为参数传递出去
 * reject:将Promise对象的状态从Pending变为Rejected，异步操作失败时调用，并将异步操作的结果作为参数传递出去
 */
// let promise = new Promise(function (resolve, reject) {
// 	//some code
// 	if (/*异步操作成功*/) {
// 		resolve(value);
// 	}
// 	else {
// 		reject(error);
// 	}
// });
/**
 * 实例生成后，用then方法指定Resolved状态和Rejected状态的回调函数
 * 第一个回调函数是Promise对象状态变为Resolved时调用，必须
 * 第二个回调函数是Promise对象状态变为Rejected时调用，不必须
 * 两个函数都接受Promise对象传出的值作为参数(value)
 */
// promise.then(function (value) {
// 	//success
// }, function (value) {
// 	//failure
// });


/*
 //异步加载图片
 function loadImageAsync(url) {
 return new Promise(function (resolve, reject) {
 let image = new Image();
 image.onload = function () {
 resolve(image);
 };
 image.onerror = function () {
 reject(new Error('Could not load image at ' + url));
 };
 image.src = url;
 });
 }


 //实现AJAX操作
 let getJSON = function (url) {
 let promise = new Promise(function (resolve,reject) {
 let client = new XMLHttpRequest();
 client.open('GET',url);
 client.responseType = "json";
 client.setRequestHeader("Accept", "application/json");
 client.onreadystatechange = handler;
 client.send();

 function handler() {
 if (this.readyState !==4 ) {
 return;
 }
 if (this.status === 200) {
 resolve(this.response);
 }
 else {
 reject(new Error(this.statusText));
 }
 }
 });
 return promise;
 };

 getJSON("/posts.json").then(function (json) {
 console.log('Contents:' + json);
 },function (error) {
 console.log('Error: ',error);
 });

 //第二个then的参数是resolve或reject传递的，后面的then的参数是之前的then返回return的
 let promise = new Promise(function (resolve,reject) {
 console.log('1');
 resolve('2');
 });
 promise
 .then(function (value) {
 console.log(value);
 return 3;
 })
 .then(function (value) {
 console.log(value);
 });

 //then可以延时执行
 let promise = new Promise(function (resolve,reject) {
 console.log('1');
 resolve('2');
 });
 setTimeout(function () {
 promise.then(function (value) {
 console.log('2');
 });
 },2000);
 */

/**
 * Promise.prototype.then()
 * 它的作用是为Promise实例添加状态改变时的回调函数
 * 第一个参数是Resolved状态的回调函数，必须
 * 第二个参数是Rejected状态的回调函数，不必须
 * 返回一个新的Promise实例，可以链式调用
 */
/*
 //前一个回调函数有可能返回的还是一个Promise对象，后一个回调函数会等待该Promise对象状态发生变化，再被调用
 getJson("/post/1.json")
 .then(post => getJson(post.commentURL))
 .then(
 comments => console.log("Resolved: ",comments),
 err => console.log("Rejected: ",err)
 );
 */

/**
 * Promise.prototype.catch()
 * 是.then(null,rejection)的别名，用于指定发生错误时的回调函数
 * 一般来说，不要在then方法中定义Rejected状态的回调函数，而应总是使用catch方法
 * Promise对象的错误会一直向后传递，直到捕获为止。
 * catch返回的也是一个新的Promise对象，可以继续链式调用
 */
// getJSON("/post/1.json")
// 	.then(post => getJSON(post.commentURL))
// 	.then(comments => {/*do something*/})
// 	.catch(error => {/*处理前面三个Promise产生的错误*/});

/**
 * Promise.all()
 * 用于将多个Promise实例包装成一个新的Promise实例
 * 接受一个数组作为参数，数组成员都是Promise对象的实例
 * 参数不一定是数组，但是一定要有Iterator接口，且返回的每个成员都是Promise实例
 * 1.数组所有成员的状态都变成Fullfilled，的状态才会变为Fullfilled，数组成员的返回值组成一个数组，传递给回调函数
 * 2.数组成员中有一个被Rejected，，状态变为Rejected，第一个被Rejected的成员返回值会传递给回调函数
 */
/*
 let promise = [2,3,5,7,11,13].map(
 id => getJSON("/post/" + id + ".json")
 );
 Promise.all(promise).then(function (posts) {
 //......
 }).catch(function (reason) {
 //......
 });
 */

/**
 * Promise.race()
 * 同样是将多个Promise实例包装成一个新的Promise实例
 * 不同的是，数组成员有一个实例率先改变状态，状态就跟着改变
 */
/*
 //如果指定时间内没有结果，将Promise状态变为Rejected，否则变为Resolved
 let p = Promise.race([
 fetch('/resource-that-may-take-a-while'),
 new Promise(function (resolve, reject) {
 setTimeout(() => reject(new Error('request timeout')), 5000)
 })
 ]);
 */

/**
 * Promise.resolve()
 * 将现有对象转为Promise对象
 * 如果参数不是具有then方法的对象，则返回一个新的Promise对象，且其状态为Resolved
 */
/*
 Promise.resolve('foo');
 //等价于
 new Promise(resolve => resolve('foo'));

 let p = Promise.resolve('Hello');
 p.then(function (s) {
 console.log(s); // Hello
 });
 */

/**
 * Promise.reject()
 * 返回一个新的Promise实例，状态为Rejected
 */
/*
 let p = Promise.reject('error');
 //等同于
 //let p = new Promise((resolve,reject) => reject('foo'));
 p.then(null,function (s) {
 console.log(s); // error
 });
 */

/**
 * 两个没有部署在ES6的方法,自己部署
 * done(),解决调链最后一链抛出错误可能无法捕捉，done()总是处于调链尾端，保证抛出任何可能出现的错误
 * finally(),指定不管Promise对象最后状态如何都会执行的操作。它接受一个普通的回调函数作为参数，不管怎么都必须执行
 */
/*
 //自定义done方法
 Promise.prototype.done = function (onFulfilled, onRejected) {
 this
 .then(onFulfilled, onRejected)
 .catch(function (reason) {
 //下一次事件循环时，抛出一个全局错误
 setTimeout(() => {
 throw reason
 }, 0);
 });
 };
 //自定义finally方法
 Promise.prototype.finally = function (callback) {
 let p = this.constructor;
 return this.then(
 value => p.resolve(callback()).then(() => value),
 reason => p.resolve(callback()).then(() => {throw reason})
 );
 };
 */

/**
 * Generator与Promise结合
 * 使用Generator函数管理流程，遇到异步操作时通常返回一个Promise对象
 */
function getFoo() {
	return new Promise(function (resolve,reject) {
		resolve('foo');
	});
}
let g = function* () {
	try{
		let foo = yield getFoo();
		console.log(foo);
	}
	catch (e){
		console.log(e);
	}
};
function run(generator) {
	let it = generator();

	function go(result) {
		if (result.done){
			return result.value;
		}
		return result.value.then(function (value) {
			return go(it.next(value));
		},function (error) {
			return go(it.throw(error))
		});
	}

	go(it.next());
}
run(g); // foo






