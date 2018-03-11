/**
 * Created by Administrator on 2018/3/11.
 */

'use strict';

const Observer = require('./Observer'),
	Dep = Observer.Dep;

class Watcher {

	constructor(vm, key, cb) {
		this.vm = vm;
		this.key = key;
		this.cb = cb;
		this.value = this._get();
	}

	_get() {
		Dep.target = this;
		let value = this.vm.data[this.key];
		Dep.target = null;
		return value;
	}

	update() {
		let newValue = this.vm.data[this.key];
		if (newValue !== this.value) {
			this.cb.call(this.vm, newValue, this.value);
			this.value = newValue;
		}
		return;
	}

}

module.exports = Watcher;


