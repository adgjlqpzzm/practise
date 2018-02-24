'use strict';

const tesseract = require('node-tesseract'),
	path = require('path');

let imgName = {value:''};

const options = {
		l: 'eng',
		psm: '1 digits',
	};
function distinguish() {
	let img = path.resolve(__dirname, `img/${imgName.value}.jpg`);
	return new Promise(function (resolve, reject) {
		tesseract.process(img, options, function (err, text) {
			if (err) {
				reject(err);
			}
			else {
				// console.log('验证码识别完成');
				resolve(text);
			}
		});
	});
}

module.exports = {
	distinguish,
	imgName
};
