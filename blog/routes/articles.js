'use strict';
const express = require('express'),
	router = express.Router();
//引入静态内容
const publicData = require('../public/data'),
	articleListMsg = publicData.articleList,
	articlePageMsg = publicData.articlePage;

//文章列表页数据
let articleListData = {
	header: publicData.header,
	footer: publicData.footer,
};
Object.assign(articleListData, articleListMsg);

router.get('/', function (req, res, next) {
	req.models.Article.find({published: true}, null, {sort: {_id: -1}, limit: 10}, function (error, articles) {
		if (error) {
			return next(error);
		}
		articles.forEach((article, index) => {
			articleListData.list[index] = {
				title: article.title,
				_id: article._id,
			}
		});
		res.render('article', articleListData);
	});
});

//文章内页数据
let articlePageData = {
	header: publicData.header,
	footer: publicData.footer,
};
Object.assign(articlePageData, articlePageMsg);

router.get('/:id', function (req, res, next) {
	if (!req.params.id || req.params.id.length != 24) {
		let errMsg = {
			status: '400',
			message: articlePageData.error.lengthError,
		};
		return res.render('error', errMsg);
	}
	let id = req.toObjectId(req.params.id);
	req.models.Article.findById(id, function (error, article) {
		if (error) {
			return next(error);
		}
		if (!article) {
			let errMsg = {
				status: '404',
				message: articlePageData.error[404],
			};
			return res.render('error', errMsg);
		}
		if (!article.published && (!req.session.user || !req.session.admin)) {
			let errMsg = {
				status: '400',
				message: articlePageData.error[400],
			};
			return res.render('error', errMsg);
		}
		articlePageData.article.title = article.title;
		articlePageData.article.text = article.text;
		return res.render('articlePage', articlePageData);
	});
});

//rest api
router.get('/api/articles/:num', function (req, res, next) {
	let num = req.params.num - 0;
	req.models.Article.find({published: "123"}, null, {sort: {_id: -1}, limit: 10, skip: num}, function (error, articles) {
		if (error) {
			return next(error);
		}
		articleListData.list = [];
		articles.forEach((article, index) => {
			articleListData.list[index] = {
				title: article.title,
				_id: article._id,
			}
		});
		res.send(articleListData.list);
	});
});

module.exports = router;