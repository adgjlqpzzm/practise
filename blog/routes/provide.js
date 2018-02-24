'use strict';
const express = require('express'),
	router = express.Router();

//评教
const evaluation = require('../provides/evaluation');
evaluation.evaluation();

//引入静态内容
const publicData = require('../public/data'),
	provideListMsg = publicData.provideList;
//静态内容
let provideListData = {
	header: publicData.header,
	footer: publicData.footer,
};
Object.assign(provideListData, provideListMsg);

router.get('/', function (req, res, next) {
	res.render('provide', provideListData);
});


const evaluationMsg = publicData.provide.evaluation;
let evaluationData = {
	header: publicData.header,
	footer: publicData.footer,
};
Object.assign(evaluationData, evaluationMsg);

router.get('/evaluation', function (req, res, next) {
	res.render('provide/evaluation', evaluationData);
});

router.post('/evaluation/api/evaluation', function (req, res, next) {
	
	Object.assign(evaluationData.postData, evaluationMsg.default);

	if (!req.body) {
		evaluationData.postData.message = evaluationData.errType.lackOfBody;
		res.send(evaluationData.postData);
		return next();
	}
	else {
		if (!req.body.studentID || req.body.studentID.length != 10) {
			evaluationData.postData.message = evaluationData.errType.lackOfID;
			res.send(evaluationData.postData);
			return next();
		}
		else if (!req.body.pwd) {
			evaluationData.postData.message = evaluationData.errType.lackOfPwd;
			res.send(evaluationData.postData);
			return next();
		}
		else if (!req.body.text) {
			evaluationData.postData.message = evaluationData.errType.lackOfText;
			res.send(evaluationData.postData);
			return next();
		}
		else{
			evaluationData.postData.message = `JSESSIONID=bce0VeXZoEUvK${req.body.studentID.slice(-6)}_v`;
			evaluationData.postData.status = true;
			res.send(evaluationData.postData);
		}
	}

});

module.exports = router;