'use strict';

const http = require('http'),
	querystring = require('querystring'),
	iconv = require('iconv-lite'),
	cheerio = require('cheerio');

const recognition = require('./recognition');

function login(logMsg) {

	return new Promise(function (resolve, reject) {
		const postMsg = {
			zjh: logMsg.studentID,
			mm: logMsg.pwd,
			v_yzm: ''
		};

		let postOptions = {
			hostname: '202.207.247.51',
			port: 8065,
			path: '/loginAction.do',
			method: 'POST',
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
				'Accept-Encoding': 'gzip, deflate',
				'Accept-Language': 'zh-CN,zh;q=0.8',
				'Cache-Control': 'max-age=0',
				'Connection': 'keep-alive',
				'Content-Length': `${querystring.stringify(postMsg).length + 4}`,
				'Content-Type': 'application/x-www-form-urlencoded',
				'Cookie': logMsg.cookiee,
				'Host': '202.207.247.51:8065',
				'Origin': 'http://202.207.247.51:8065',
				'Referer': 'http://202.207.247.51:8065/loginAction.do',
				'Upgrade-Insecure-Requests': '1',
				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
			},
		};

		loginAction(logMsg, postMsg, postOptions, resolve);
	});

}

function loginAction(logMsg, postMsg, postOptions,resolve) {

	let postData = Object.assign({}, postMsg);

	recognition.getVerificationCode(logMsg ,function (val) {
		if (val.length == 4) {
			postData.v_yzm = val;
		}
		else {
			postData.v_yzm = 'aaaa';
		}
		postData = querystring.stringify(postData);
		let chunkArr = [];
		let req = http.request(postOptions, function (res) {
			// console.log('开始登陆请求');
			res.on('data', function (chunk) {
				chunkArr.push(chunk);
			});
			res.on('end', function () {
				let html = iconv.decode(Buffer.concat(chunkArr), 'gbk');
				let $ = cheerio.load(html);
				if ($('title').text().trim() == '学分制综合教务') {
					// console.log('success');
					resolve('success');
				}
				else if ($('title').text().trim() == '错误信息'){
					loginAction(logMsg, postMsg, postOptions, resolve);
				}
				else {
					let errMsg = $('.errorTop').text();
					// console.log('failed');
					if (errMsg.indexOf('证件号') >= 0) {
						resolve('IncorrectID');
					}
					else if (errMsg.indexOf('密码') >= 0) {
						resolve('IncorrectPwd');
					}
					else if (errMsg.indexOf('验证码') >= 0) {
						loginAction(logMsg, postMsg, postOptions, resolve);
					}
				}
			})
		});
		req.on('error', function (err) {
			console.log(err);
		});
		req.write(postData);
		req.end();
	});
}

module.exports = {
	login
};
