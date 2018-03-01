/**
 * Created by Administrator on 2018/3/1.
 */

'use strict';

const http = require('http');
const fs = require('fs');

const data = [
	{text: 'This is page a'},
	{text: 'This is page b'},
	{text: 'This is page c'},
];

const server = http.createServer(function (req, res) {

	let url = req.url;
	switch(url){
		case "/api/a":
			res.writeHead(200, {'Content-Type': 'text-plain'});
			res.write(new Buffer(JSON.stringify(data[0]), 'UTF-8'));
			res.end();
			break;
		case "/api/b":
			res.writeHead(200, {'Content-Type': 'text-plain'});
			res.write(new Buffer(JSON.stringify(data[1]), 'UTF-8'));
			res.end();
			break;
		case "/api/c":
			res.writeHead(200, {'Content-Type': 'text-plain'});
			res.write(new Buffer(JSON.stringify(data[2]), 'UTF-8'));
			res.end();
			break;
		default:
			if (url.split('.')[1] == 'js') {
				res.writeHead(200, {'Content-Type': 'text/javascript'});
				let readSteam = fs.createReadStream('../client/js/main.js', {encoding: 'utf8', flags: 'r'});
				readSteam.on('data', function (data) {
					res.write(data, 'UTF-8');
				});
				readSteam.on('end', function () {
					res.end();
				});
				break;
			}
			res.writeHead(200, {'Content-Type': 'text-plain'});
			let readSteam = fs.createReadStream('../client/index.html', {encoding: 'utf8', flags: 'r'});
			readSteam.on('data', function (data) {
				res.write(data, 'UTF-8');
			});
			readSteam.on('end', function () {
				res.end();
			});
			break;
	}

});

server.listen(8080);
console.log('Server is listening at port 8080');