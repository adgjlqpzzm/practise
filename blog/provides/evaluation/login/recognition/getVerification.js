'use strict';

const http = require('http'),
	path = require('path'),
	fs = require('fs');

function getWriteSteam(logMsg) {
	return fs.createWriteStream(path.resolve(__dirname, `img/${logMsg.studentID.slice(-6)}.jpg`), {flags: 'w'});
}

function requestImg(logMsg) {

	let option = {
		hostname: '202.207.247.51',
		port: 8065,
		path: '/validateCodeAction.do?random=0.666666',
		method: 'GET',
		headers: {
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
			'Accept-Encoding': 'gzip, deflate',
			'Accept-Language': 'zh-CN,zh;q=0.8',
			'Cache-Control': 'max-age=0',
			'Connection': 'keep-alive',
			'Cookie': logMsg.cookiee,
			'Host': '202.207.247.51:8065',
			'Referer': 'http://202.207.247.51:8065/loginAction.do',
			'Upgrade-Insecure-Requests': '1',
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
		}
	};

	return new Promise(function (resolve, reject) {

		function reqM() {
			let req = http.request(option, function (res) {
				const writer = getWriteSteam(logMsg);
				// console.log('正在获取验证码');
				res.on('data', function (data) {
					writer.write(data);
				});
				res.on('end', function () {
					// console.log('验证码获取完成');
					if (res.statusCode == 200) {
						resolve();
					}
					else{
						reqM();
					}
				});
			});
			req.on('error', function (err) {
				console.log(err);
			});
			req.end();
		}
		reqM();

	});
}

module.exports = {
	requestImg
};