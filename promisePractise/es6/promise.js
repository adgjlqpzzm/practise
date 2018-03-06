/**
 * Created by Administrator on 2018/3/6.
 */

'use strict';

const PENDING = 0;
const FULLFILLED = 1;
const REJECTED = 2;

class Promise {

	constructor(fn) {
		this.status = PENDING;
		this.value = null;
		this.queue = [];
		if (typeof fn === 'function') {
			setTimeout(fn.bind(this, this.resolve.bind(this), this.reject.bind(this)), 0);
		}
	}

	resolve(result) {
		this.status = FULLFILLED;
		this.value = result;
		this.nextTick();
	}

	reject(error) {
		this.status = REJECTED;
		this.value = error;
	}

	doResolve(handler, value) {
		let ret;
		value = value || this.value;
		if (this.status === FULLFILLED && typeof handler.onFullfilled === 'function') {
			ret = handler.onFullfilled.call(this, value);
		}
		else if (this.status === REJECTED && typeof handler.onRejected === 'function') {
			ret = handler.onRejected.call(this, value);
		}
		if ((typeof ret === 'object' || typeof ret === 'function') && ret instanceof Promise) {
			if (ret.queue) {
				ret.queue = this.queue.concat(ret.queue);
				this.queue = [];
			}
			return;
		}
		this.resolve(ret);
	}

	nextTick() {
		let handler;
		while (( handler = this.queue.shift() )) {
			if (!handler || this.status === PENDING) {
				return;
			}
			if (handler.onFullfilled instanceof Array) {
				if (handler.type === 'race') {
					this.resolveRace(handler.onFullfilled);
					return;
				}
			}
			this.doResolve(handler);
		}
	}

	// resolveRace(handlerFuncs) {
	// 	this.isRacing = true;
	// 	let value = this.value;
	// 	for (let i = 0; i < handlerFuncs.length; i++) {
	// 		this.doResolve({
	// 			onFullfilled: handlerFuncs[i]
	// 		}, value);
	// 	}
	// }

	then(onFullfilled, onRejected) {
		let handler = {};
		this.pushInQueue(handler, onFullfilled, onRejected);
		return this;
	}

	// race(...fns) {
	// 	if (fns.length < 1) {
	// 		return;
	// 	}
	// 	let handler = {};
	// 	this.pushInQueue(handler, fns);
	// 	handler.type = 'race';
	// 	return this;
	// }

	pushInQueue(handler, onFullfilled, onRejected) {
		if (typeof onFullfilled === 'function') {
			Object.assign(handler, {
				onFullfilled,
				onRejected,
			});
		}
		else{
			Object.assign(handler, {onFullfilled});
		}
		this.queue.push(handler);
	}

}

module.exports = Promise;
