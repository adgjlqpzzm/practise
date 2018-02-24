'use strict';

const getData = require('./getData.js'),
	handlerData = require('./handlerData.js');

let dataList = [],
	postMsg = [];

function getPostData(logMsg) {
	return new Promise(function (resolve, reject) {
		getData.getData(logMsg, function (list) {
			if (list.length != 0) {
				dataList = list;
				postMsg = handlerData.handlerData(list, logMsg);
				resolve({
					inform: dataList,
					postData: postMsg,
				});
			}
			else{
				resolve();
			}
		});
	});
}

module.exports = {
	getPostData
};