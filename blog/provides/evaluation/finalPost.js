'use strict';
const http = require('http'),
	queryString = require('querystring'),
	iconv = require('iconv-lite');

const prehandler = require('./prehandler');

function finalPost(logMsg, inform, postData, socket) {
	inform.forEach(function (item, index) {
		if (item.isComplated == '否') {
			prehandler.prehandler(logMsg, item, postData[index], socket, postMsg);
		}
	});
}

function postMsg(logMsg, item, postData, socket) {

	let postInform = postData;

	let gbkzgpj = '';
	let buf = iconv.encode(postData.zgpj, 'gbk');
	for (let i = 0; i < buf.length; i++) {
		gbkzgpj += `%${buf[i].toString(16).toUpperCase()}`;
	}

	postInform.zgpj = '';

	let postInformStr = queryString.stringify(postInform);

	postInformStr += gbkzgpj;

	let postOptions = {
		hostname: '202.207.247.51',
		port: 8065,
		path: '/jxpgXsAction.do?oper=wjpg',
		method: 'POST',
		headers: {
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
			'Accept-Encoding': 'gzip, deflate',
			'Accept-Language': 'zh-CN,zh;q=0.8',
			'Cache-Control': 'max-age=0',
			'Connection': 'keep-alive',
			'Content-Length': postInformStr.length,
			'Content-Type': 'application/x-www-form-urlencoded',
			'Cookie': logMsg.cookiee,
			'Host': '202.207.247.51:8065',
			'Origin': 'http://202.207.247.51:8065',
			'Referer': 'http://202.207.247.51:8065/jxpgXsAction.do',
			'Upgrade-Insecure-Requests': '1',
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
		},
	};
	
	socket.emit('message', `正在评价${item.name}:${item.klass}`);
	let req = http.request(postOptions, function (res) {
		let chunkArr = [];
		res.on('data', function (data) {
			chunkArr.push(data);
		});
		res.on('end', function () {
			let html = iconv.decode(Buffer.concat(chunkArr), 'gbk');
			if (res.statusCode != 200 || html.indexOf('失败') >= 0) {
				postMsg(logMsg, item, postData, socket, num);
			}
			else {
				socket.emit('message', `评价${item.name}:${item.klass}完成`);
				// console.log(html);
			}
		})
	});
	req.on('error', function (err) {
		console.log(err);
	});
	req.write(postInformStr);
	req.end();

}

module.exports = {
	finalPost
};