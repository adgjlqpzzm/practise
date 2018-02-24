'use strict';

const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true,
		validate: [function (value) {
			return value.length <= 120;
		}, 'Title is too no more than 120'],
		default: 'New Article',
	},
	text: {
		type: String,
		required: true,
	},
	published: {
		type: Boolean,
		default: false,
	},
	slug: {
		type: String,
		set(value){
			return value.toLowerCase().replace(' ', '-')
		}
	}
});

articleSchema.static({
	list(callback){
		this.find({}, null, {sort: {_id: -1}}, callback);
	}
});
//如果不写第三个参数，mongoose会操作第一个参数的负数即'articles'
module.exports = mongoose.model('Article', articleSchema, 'articles');
