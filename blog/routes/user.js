'use strict';
const express = require('express'),
	router = express.Router();

const publicData = require('../public/data'),
	loginMsg = publicData.login,
	adminMsg = publicData.admin,
	releaseMsg = publicData.release;

let loginData = {
	header: publicData.header,
	footer: publicData.footer,
};
Object.assign(loginData, loginMsg);

//GET 登录页
router.get('/login', function (req, res, next) {
	if (req.session && req.session.admin) {
		return res.redirect('/admin');
	}
	else {
		loginData.errorMsg = loginMsg.default.errorMsg;
		res.render('login', loginData);
	}
});

//POST 登录
router.post('/login', function (req, res, next) {
	if (!req.body.admin || !req.body.pwd) {
		loginData.errorMsg = loginMsg.errorType.required;
		res.render('login', loginData);
	}
	req.models.User.findOne({
		email: req.body.admin,
		password: req.body.pwd,
	}, function (error, user) {
		if (error) {
			return next(error);
		}
		if (!user) {
			loginData.errorMsg = loginMsg.errorType.mismatching;
			return res.render('login', loginData);
		}
		req.session.user = user;
		req.session.admin = user.email;
		res.redirect('/admin');
	});
});

//GET 登出
router.get('/logout', function (req, res, next) {
	req.session.destroy();
	res.redirect('/');
});


let adminData = {
	header: publicData.header,
	footer: publicData.footer,
};
Object.assign(adminData, adminMsg);

//权限管理
function authorize(req, res, next) {
	/**
	 * 到时候记得删掉
	 * @type {number}
	 */
	req.session.user = {};
	req.session.admin = 123;
	if (req.session && req.session.user && req.session.admin) {
		return next();
	}
	res.redirect('/login');
}

//登录验证
router.use('/admin', authorize);

//GET 管理页
router.get('/admin', function (req, res, next) {
	req.models.Article.find({}, null, {sort: {_id: -1}}, function (error, articles) {
		if (error) {
			return next(error);
		}
		adminData.admin.name = req.session.admin;
		articles.forEach((article, index) => {
			adminData.list[index] = {
				title: article.title,
				_id: article._id,
				isPublished: article.published ? adminData.publishState.published : adminData.publishState.unpublished,
			}
		});
		res.render('admin', adminData);
	});
});

//REST API 发布与取消发布
router.put('/admin/api/changePublishState/:id', function (req, res, next) {
	if (req.params.id && req.params.id.length == 24) {
		let id = req.toObjectId(req.params.id);
		req.models.Article.findById(id, null, function (error, article) {
			if (error) {
				return res.send('find error');
			}
			if (!article) {
				return res.send('no article');
			}
			let published = article.published;
			article.update({$set: {published: !published}}, function (error) {
				if (error) {
					return res.send('update error');
				}
				return res.send(published ? adminData.publishState.unpublished : adminData.publishState.published);
			});
		});
	}
	else {
		res.send('Invalid ID');
	}
});

//REST API 文章删除
router.delete('/admin/api/delete/:id', function (req, res, next) {
	if (!req.params.id || req.params.id.length != 24) {
		return res.send('Invalid ID');
	}
	let id = req.toObjectId(req.params.id);
	req.models.Article.remove({_id: id}, function (error) {
		if (error) {
			return res.send('delete failed');
		}
		res.send('delete success');
	});
});


//
let releaseData = {
	header: publicData.header,
	footer: publicData.footer,
};
Object.assign(releaseData, releaseMsg);

//GET 文章发布页
//新文章
router.get('/admin/release', function (req, res, next) {
	Object.assign(releaseData.article, releaseData.default.article);
	if (req.session && req.session.noArticle) {
		releaseData.errMsg = releaseData.errType.noArticle;
		req.session.noArticle = null;
	}
	else {
		releaseData.errMsg = releaseData.default.errMsg;
	}
	res.render('release', releaseData);
});
router.post('/admin/release', function (req, res, next) {
	Object.assign(releaseData.article, req.body);
	if (!req.body.title) {
		releaseData.errMsg = releaseData.errType.missingTitle;
		return res.render('release', releaseData);
	}
	if (!req.body.text) {
		releaseData.errMsg = releaseData.errType.missingText;
		return res.render('release', releaseData);
	}
	req.models.Article.create(releaseData.article, function (error, doc) {
		if (error) {
			return next(error);
		}
		return res.redirect('/admin');
	});
});

//编辑文章
router.get('/admin/release/:id', function (req, res, next) {
	if (!req.params.id || req.params.id.length != 24) {
		if (req.session) {
			req.session.noArticle = true;
			return res.redirect('/admin/release');
		}
	}
	let id = req.toObjectId(req.params.id);
	req.models.Article.findById(id, null, function (error, article) {
		if (error) {
			return next(error);
		}
		if (!article && req.session) {
			req.session.noArticle = true;
			return res.redirect('/admin/release');
		}
		for (let key of Object.keys(releaseData.article)) {
			releaseData.article[key] = article[key];
		}
		releaseData.errMsg = releaseData.default.errMsg;
		res.render('release', releaseData);
	});
});
router.post('/admin/release/:id', function (req, res, next) {
	if (!req.params.id || req.params.id.length != 24) {
		return res.redirect('release');
	}
	let id = req.toObjectId(req.params.id);
	Object.assign(releaseData.article, req.body);
	if (!req.body.title) {
		releaseData.errMsg = releaseData.errType.missingTitle;
		return res.render('release', releaseData);
	}
	if (!req.body.text) {
		releaseData.errMsg = releaseData.errType.missingText;
		return res.render('release', releaseData);
	}
	req.models.Article.findById(id, null, function (error, article) {
		if (error) {
			return next(error);
		}
		if (!article) {
			return res.redirect('release');
		}
		article.update({$set: releaseData.article},function (error) {
			if (error) {
				return next(error);
			}
			return res.redirect('/admin');
		});
	});
});

module.exports = router;