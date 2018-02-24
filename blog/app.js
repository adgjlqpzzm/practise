'use strict';
//引入模块
const express = require('express'),
	path = require('path'),
	mongoose = require('mongoose');
//引入路由
const routes = require('./routes/index');
//引入mongodb模板
const models = require('./models');
//引入中间件
const favicon = require('serve-favicon'),
	logger = require('morgan'),
	methodOverride = require('method-override'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	errorHandler = require('errorhandler');

//配置mongodb
const dbUrl = process.env.MONGO_URL || 'mongodb://@localhost:27017/blog',
	db = mongoose.connect(dbUrl, {useMongoClient: true, safe: true});

const app = express();
app.locals.appTitle = "Jaxssson's blog";
//session secret
const session_secret = 'Jaxssson';
//session失效时间
const cookieMaxAge = 1000 * 60 * 60;

// 设置视图引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//开发环境使用标准的Express.js 4错误处理器
if ('development' == app.get('env')) {
	app.use(errorHandler());
}

//添加一个中间件来暴露mongodb集合在每个express.js的路径
app.use(function (req, res, next) {
	if (!models.Article || !models.User) {
		return next(new Error('No models'));
	}
	req.toObjectId = mongoose.Types.ObjectId;
	req.models = models;
	return next();
});

//将用户是否经过认证的信息传递给模板的中间件
app.use(function (req, res, next) {
	if (req.session && req.session.admin) {
		res.locals.admin = true;
	}
	return next();
});

// 使用中间件
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(session_secret));
app.use(session({
	secret: session_secret,
	resave: true,
	saveUninitialized: false,
	rolling: true,
	cookie: {
		maxAge: cookieMaxAge
	}
}));
app.use(express.static(path.join(__dirname, 'public')));

//使用路由
app.use('/', routes.home);
app.use('/', routes.user);
app.use('/article', routes.articles);
app.use('/provide', routes.provide);

// 捕获404并转到错误处理程序
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	let errMsg = {
		status: err.status || 500,
		message: err.message,
	};

	// render the error page
	res.status(err.status || 500);
	res.render('error', errMsg);
});

module.exports = app;
