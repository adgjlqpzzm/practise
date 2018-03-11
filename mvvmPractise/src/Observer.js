/**
 * Created by Administrator on 2018/3/11.
 */

'use strict';

class Observer{
	
	constructor(data = {}){
		this.data = data;
		this.hijack(this.data);
	}

	hijack(data){
		if (data && typeof data === 'object') {
			Object.keys(data).forEach((key) => {
				if (typeof data[key] !== 'object') {
					this._defineReactive(data, key, data[key]);
				}
				this.hijack(data[key]);
			});
		}
	}

	_defineReactive(data, key, value){
		let dep = new Dep();
		Object.defineProperty(data, key, {
			enumerable: true,
			configurable: true,
			get(){
				if (Dep.target) {
					dep.addWatchers(Dep.target);
				}
				return value;
			},
			set(newValue){
				if (newValue === value) {
					return;
				}
				value = newValue;
				dep.notify();
			}
		});
	}

	
}

class Dep{

	constructor(){
		this.watchers = [];
	}

	addWatchers(watcher){
		this.watchers.push(watcher);
	}

	notify(){
		this.watchers.forEach((watcher) => {
			if (watcher && watcher.update) {
				watcher.update();
			}
		});
	}

}
Dep.target = null;

Observer.Dep = Dep;
module.exports = Observer;