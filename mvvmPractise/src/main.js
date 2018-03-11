/**
 * Created by Administrator on 2018/3/11.
 */

'use strict';

let Compile = require('./Compile'),
	Observer = require('./Observer');

class Mvvm{

	constructor(options){
		this.el = document.querySelector(options.el);
		this.data = options.data || {};
		this.methods = options.methods || {};
		this.mounted = options.mounted;
		Object.keys(this.data).forEach((key) => {
			this.proxyKeys(key, this.data[key]);
		});

		new Observer(this.data);
		new Compile(this);
		if (this.mounted && typeof this.mounted === 'function') {
			this.mounted();
		}
	}

	proxyKeys(key, value){
		Object.defineProperty(this, key, {
			enumerable: false,
			configurable: true,
			get(){
				return value;
			},
			set(newValue){
				this.data[key] = newValue;
			}
		});
	}

}
window.Mvvm = Mvvm;
module.exports = Mvvm;