'use strict';

const http = require('http'),
	cheerio = require('cheerio'),
	iconv = require('iconv-lite');

const login = require('../login');

function getParam($, list) {
	$('.displayTag').find('tbody').find('tr').each(function (index) {
		let item = $(this);
		list[index] = {
			type: item.find('td')[0].children[0].data,
			name: item.find('td')[1].children[0].data,
			klass: item.find('td')[2].children[0].data,
			isComplated: item.find('td')[3].children[0].data,
			params: $(item.find('td')[4]).find('img')[0].attribs.name,
		};
	});
}

function getPage(logMsg, list, resolve) {

	let getOptions = {
		hostname: '202.207.247.51',
		port: 8065,
		path: '/jxpgXsAction.do?oper=listWj&pageSize=300',
		method: 'GET',
		headers: {
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
			'Accept-Encoding': 'gzip, deflate',
			'Accept-Language': 'zh-CN,zh;q=0.8',
			'Connection': 'keep-alive',
			'Cookie': logMsg.cookiee,
			'Host': '202.207.247.51:8065',
			'Upgrade-Insecure-Requests': 1,
			'Referer': 'http://202.207.247.51:8065/jxpgXsAction.do?oper=listWj',
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36'
		}
	};

	let req = http.request(getOptions, function (res) {
		let chunkArr = [];
		res.on("data", function (data) {
			chunkArr.push(data);
		});
		res.on('end', function () {
			let html = iconv.decode(Buffer.concat(chunkArr), 'gbk');
			let $ = cheerio.load(html);
			if ($('title').text().indexOf('学生评估问卷列表') < 0) {
				getPage(list, resolve)
			}
			else{
				getParam($, list);
				resolve();
			}
		})
	});
	req.on('error', function (err) {
		console.log(err);
	});
	req.end();

}

function getData(logMsg, callback) {

	let list = [];

	login.login(logMsg)
		.then(function (val) {
			return new Promise(function (resolve, reject) {
				if (val == 'success') {
					getPage(logMsg, list, resolve);
				}
				else {
					resolve();
					// console.log(val);
				}
			});
		})
		.then(function () {
			callback(list);
		})
		.catch(function (err) {
			console.log(err);
		});

}

module.exports = {
	getData
};

