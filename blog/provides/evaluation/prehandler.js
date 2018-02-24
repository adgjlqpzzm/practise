'use strict';

const http = require('http'),
	queryString = require('querystring'),
	iconv = require('iconv-lite');

function prehandler(logMsg, item, postData, socket, postMsg) {

	let preData = {
		wjbm: postData.wjbm,
		bpr: postData.bpr,
		pgnr: postData.pgnr,
		oper: 'wjShow',
		pageSize: 20,
		page: 1,
		currentPage: 1,
		pageNo: ''
	};
	let preDataStr = queryString.stringify(preData);
	preDataStr += `&bprm=${getDecode(item.name)}`;
	preDataStr += `&wjmc=${getDecode(item.type)}`;
	preDataStr += `&pgnrm=${getDecode(item.klass)}`;
	
	let postOptions = {
		hostname: '202.207.247.51',
		port: 8065,
		path: '/jxpgXsAction.do',
		method: 'POST',
		headers: {
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
			'Accept-Encoding': 'gzip, deflate',
			'Accept-Language': 'zh-CN,zh;q=0.8',
			'Cache-Control': 'max-age=0',
			'Connection': 'keep-alive',
			'Content-Length': preDataStr.length,
			'Content-Type': 'application/x-www-form-urlencoded',
			'Cookie': logMsg.cookiee,
			'Host': '202.207.247.51:8065',
			'Origin': 'http://202.207.247.51:8065',
			'Referer': 'http://202.207.247.51:8065/jxpgXsAction.do?oper=listWj',
			'Upgrade-Insecure-Requests': '1',
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
		},
	};
	
	let req = http.request(postOptions, function (res) {
		let chunkArr = [];
		res.on('data', function (chunk) {
			chunkArr.push(chunk);
		});
		res.on('end', function () {
			if (res.statusCode == 200) {
				let html = iconv.decode(Buffer.concat(chunkArr), 'gbk');
				// console.log(html);
				postMsg(logMsg, item, postData, socket);
			}
			else{
				prehandler(logMsg, item, postData, socket, postMsg);
			}
		});
	});
	req.on('error', function (err) {
		console.log(err);
	});
	req.write(preDataStr);
	req.end();

}

function getDecode(str) {
	let buf = iconv.encode(str, 'gbk');
	let decodeStr = '';
	for (let i = 0; i < buf.length; i++) {
		decodeStr += `%${buf[i].toString(16).toUpperCase()}`;
	}
	return decodeStr;
}

module.exports = {
	prehandler
};