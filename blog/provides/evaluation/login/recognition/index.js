'use strict';

const getVerification = require('./getVerification'),
// grayscale = require('./grayscale'),
	distingulish = require('./distinguish');

function getVerificationCode(logMsg, callback) {
	let verificationCode = '';
	distingulish.imgName.value = logMsg.studentID.slice(-6);
	// grayscale.imgName.value = logMsg.studentID.slice(-6);
	getVerification.requestImg(logMsg)
	// 验证码灰度化处理  某些情况下进行灰度化处理识别出来的效果很不理想
	// .then(grayscale.grayscale)
		.then(distingulish.distinguish)
		.then(function (text) {
			verificationCode = text.replace(/\s+/g,"");
			callback(verificationCode);
		})
		.catch(function (err) {
			if (err) {
				console.log(err);
			}
		});
}

module.exports = {
	getVerificationCode
};