'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		require: true,
		set(value){
			return value.toLowerCase();
		},
		validate: [function (value) {
			return (email.match(/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i) != null);
		}, 'Invalid email']
	},
	password: {
		type: String,
		require: true,
	},
	admin: {
		type: Boolean,
		default: false,
	}
});
//如果不写第三个参数，mongoose会操作第一个参数的负数即'users'
module.exports = mongoose.model('User', userSchema, 'users');


