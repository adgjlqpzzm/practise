'use strict';

const str1 = '({}(({}[()])[]))';
const str2 = '({}(({)(}[()])[]))';
const str3 = '({}(({}[({)])[]))';

class BracketsMacher{

	constructor(){
		this.bracketStack = [];
		this.isLegal = null;
		this.bracketsList = new Map([['}', '{'], [']', '['], [')', '(']]);
		this.bracketValues = Array.from(this.bracketsList.values());
	}

	match(str = ''){
		this._match(str);
		return this.isLegal;
	}

	_match(str){
		this.isLegal = null;
		if ( !(typeof str === 'string') ) {
			this.isLegal = false;
			return;
		}
		for (let i = 0; i < str.length; i++) {
			let bracket = str[i];
			if (this.bracketIsValue(bracket)) {
				this.bracketStack.push(bracket);
			}
			else if (this.bracketIsKey(bracket)) {
				if (this.bracketsList.get(bracket) === this.bracketStack.pop()) {
					continue;
				}
				this.failed();
				break;
			}
			else{
				this.failed();
				break;
			}
		}
		if (this.isLegal != false && this.bracketStack.length === 0) {
			this.fullfill();
		}
	}

	bracketIsKey(bracket){
		return this.bracketsList.has(bracket);
	}

	bracketIsValue(bracket){
		return this.bracketValues.includes(bracket);
	}

	fullfill(){
		this.isLegal = true;
		this.bracketStack = [];
	}

	failed(){
		this.isLegal = false;
		this.bracketStack = [];
	}

}

let macher = new BracketsMacher();
console.log(macher.match(str1));
console.log(macher.match(str2));
console.log(macher.match(str3));















