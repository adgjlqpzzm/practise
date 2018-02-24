'use strict';
const express = require('express'),
	router = express.Router();
//引入静态内容
const publicData = require('../public/data'),
	homeMsg = publicData.home;
//静态内容
let homeData = {
	header: publicData.header,
	footer: publicData.footer,
};
Object.assign(homeData, homeMsg);

router.get('/', function(req, res, next) {
	res.render('index', homeData);
});
router.get('/home', function(req, res, next) {
	res.render('index', homeData);
});

module.exports = router;