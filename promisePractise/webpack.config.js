

module.exports = {
	entry: __dirname + '/es6/promise.js',
	output: {
		path: __dirname + '/es5',
		filename: 'promise.js',
	},
	module:{
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader'
				},
				exclude: /node_modules/
			}
		]
	}
};