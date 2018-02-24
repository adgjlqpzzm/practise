'use strict';

let postData = [];

function handlerData(dataList, logMsg) {
	dataList.forEach(function (item, index) {
		let splitArr = item.params.split('#@');
		postData[index] = {
			'wjbm': splitArr[0],
			'bpr': splitArr[1],
			'pgnr': splitArr[splitArr.length - 1],
			'0000000136': logMsg.radio[0], // [25_0.95, 25_0.75, 25_0.05]
			'0000000137': logMsg.radio[1], // [25_0.95, 25_0.75, 25_0.05]
			'0000000138': logMsg.radio[2], // [30_0.95, 30_0.75, 30_0.05]
			'0000000139': logMsg.radio[3], // [20_0.95, 20_0.75, 20_0.05]
			'zgpj': logMsg.text,
		}

	});
	return postData;
}

module.exports = {
	handlerData
};