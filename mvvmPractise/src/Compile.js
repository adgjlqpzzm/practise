/**
 * Created by Administrator on 2018/3/11.
 */

'use strict';

const Watcher = require('./Watcher');

class Compile{

	constructor(vm){
		this.vm = vm;
		this.el = vm.el;
		this.data = vm.data;
		this.methods = vm.methods;
		this.fragment = null;
		this.init();
	}

	init(){
		if (this.el) {
			this.fragment = this.nodeToFragment(this.el);
			this.compileElement(this.fragment);
			this.el.appendChild(this.fragment);
		}
		else{
			console.log('Dom元素不存在');
		}
	}

	nodeToFragment(el){
		let fragment = document.createDocumentFragment();
		let firstChild = el.firstChild;
		while(firstChild){
			fragment.appendChild(firstChild);
			firstChild = el.firstChild;
		}
		return fragment;
	}

	compileElement(el){
		let childNodes = el.childNodes;
		Array.from(childNodes).forEach((childNode) => {
			if (Compile.isTextNode(childNode)) {
				this.compileText(childNode);
			}
			else if (Compile.isElementNode(childNode)) {
				this.compile(childNode);
			}
			if (childNode.childNodes && childNode.childNodes.length) {
				this.compileElement(childNode);
			}
		});
	}

	compile(node){
		let attrs = node.attributes;
		Array.from(attrs).forEach((attr) => {
			let [attrName, attrValue] = [attr.name, attr.value];
			if (Compile.isDirective(attrName)) {
				let dir = attrName.substring(2);
				if (Compile.isEventDirective(dir)) {
					this.compileEvent(node, this.vm, attrValue, dir);
				}
				else{
					this.compileModule(node, this.vm, attrValue);
				}
				node.removeAttribute(attrName);
			}
		})
	}

	compileEvent(node, vm, attrValue, dir){
		let eventType = dir.split(':')[1];
		let cb = vm.methods && vm.methods[attrValue];
		if (eventType && cb) {
			node.addEventListener('click', cb.bind(vm), false);
		}
	}

	compileModule(node, vm, attrValue){
		let val = vm[attrValue];
		Compile.modelUpdater(node, val);
		new Watcher(vm, attrValue, (value) => {
			Compile.modelUpdater(node, value);
		});
		node.addEventListener('input', (e) => {
			let newValue = e.target.value;
			if (val === newValue) {
				return;
			}
			vm[attrValue] = newValue;
			val = newValue;
		})
	}

	compileText(node){
		let reg = /\{\{(.*)\}\}/;
		let regRet = reg.exec(node.textContent);
		if (regRet && regRet[1]) {
			Compile.updateText(node, regRet[0], this.data[regRet[1]]);
			new Watcher(this.vm, regRet[1],  (newValue, oldValue) => {
				Compile.updateText(node, oldValue, newValue);
			});
		}
	}

	static modelUpdater(node, newValue = ''){
		node.value = newValue;
	}

	static isDirective(attrName){
		return attrName.indexOf('v-') == 0;
	}

	static isEventDirective(dir){
		return dir.indexOf('on:') == 0;
	}

	static isElementNode(el){
		return el && el.nodeType == 1;
	}

	static isTextNode(el){
		return el && el.nodeType == 3;
	}

	static updateText(node, oldValue, newValue){
		node.textContent = node.textContent.replace(oldValue, newValue);
	}

}

module.exports = Compile;


