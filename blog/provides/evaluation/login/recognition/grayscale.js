'use strict';

const path = require('path'),
	gm = require('gm').subClass({imageMagick: true}),
	fs = require('fs');

let imgName = {value: ''};

function grayscale(val) {
	return new Promise(function (resolve, reject) {
		gm(`./img/${imgName.value}.jpg`)
			.colorspace('gray')
			.normalize()
			.threshold('50%')
			.write(`./img/${imgName.value}.jpg`, function (err) {
				if (err) {
					reject(err);
				}
				else{
					console.log('灰度化处理完成');
					resolve();
				}
			});
	});
}

module.exports = {
	grayscale,
	imgName,
};