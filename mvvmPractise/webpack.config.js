
const webpack = require('webpack');

module.exports = {
	entry: `${__dirname}/src/main.js`,
	output: {
		path: `${__dirname}/bin`,
		filename: 'mvvm.js',
	},
	module:{
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader"
				},
				exclude: /node_modules/
			}
		]
	}
};
