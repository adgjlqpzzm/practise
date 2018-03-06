/**
 * Created by Administrator on 2018/3/6.
 */

'use strict';

const Promise = require('./promise');

//example1
function doSync() {
	return new Promise(function (resolve, reject) {
		let a = 100;
		console.log(a);
		setTimeout(function () {
			a *= 2;
			resolve(a);
		}, 1000);
	});
}

function doSync2(value) {
	return new Promise(function (resolve, reject) {
		let a = value;
		console.log(value);
		setTimeout(function () {
			a *= 2;
			resolve(a);
		}, 1000)
	});
}

doSync()
	.then(function (value) {
		console.log(value);
		value *= 2;
		return value;
	})
	.then(function (value) {
		console.log(value);
		value *= 2;
		return value;
	})
	.then(function (value) {
		return doSync2(value);
	})
	.then(function (value) {
		console.log(value);
	});


//example2
// function race1(value) {
// 	console.log(value);
// 	console.log('race1');
// 	return 'race1';
// }
//
// function race2(value) {
// 	return new Promise(function (resolve, reject) {
// 		console.log(value);
// 		console.log('rece2');
// 		resolve('race2');
// 	});
// }
//
// function race3(value) {
// 	return new Promise(function (resolve, reject) {
// 		console.log(value);
// 		setTimeout(function () {
// 			console.log('race3');
// 			resolve('race3');
// 		}, 1000);
// 	})
// }
//
// doSync()
// 	.then(function (value) {
// 		console.log(value);
// 		value *= 2;
// 		return value;
// 	})
// 	.then(function (value) {
// 		console.log(value);
// 		value *= 2;
// 		return value;
// 	})
// 	.then(function (value) {
// 		return doSync2(value);
// 	})
// 	.race(race1, race2, race3)
// 	.then(function (value) {
// 		console.log(value);
// 	});
