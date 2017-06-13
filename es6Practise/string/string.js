/**
 * string
 */

'use strict';


/**
 * 新增codePointAt方法，正确处理4字节存储的字符，返回字符的码点
 * 新增fromCodePoint，正确从码点返回对应字符
 * 新增normalize方法，将带重音符号的字符和其合成字符等价
 */


/**
 * for...of...遍历，可识别四字节的码点
 */
/*
let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
	console.log(text[i]); // " "  " "
}

for (let j of text) {
	console.log(j); // 𠮷
}
*/


/**
 * 新增各种字符串处理方法
 */
/*
//字符检索新方法,第二个参数均为检索位置(endsWith为针对前n个字符)
let text = 'Hello World!';

console.log(text.indexOf('l',4)); // 9
console.log(text.startsWith('llo',2)); // true
console.log(text.endsWith('lo ',6));  //true
console.log(text.includes('e',0));  // true
console.log(text.includes('e',2));  //false

//repeat方法将一个字符串重复n次。若为小数，向下取整；若小与-1，报错；若-1<n<0，则取0;若为NaN，则取0；若为字符串，转为数字
console.log('hello'.repeat(2)); //'hellohello'
console.log('hello'.repeat(0)); // ''
console.log('hello'.repeat(2.9)); // 'hellohello'
console.log('hello'.repeat(-0.9)); // ''
console.log('hello'.repeat(NaN)); // ''
console.log('hello'.repeat('3')); // 'hellohellohello'
console.log('hello'.repeat('hello')); // ''
console.log('hello'.repeat(-2)); // RangeError: Invalid count value
*/


/**
 * 模板字符串${},使用反引号``括起来，里面使用反引号需要反斜杠\转义
 */
/*
let [name,time] = ["Bob","today"];
console.log(`Hello ${name},how are you ${time}`); // Hello Bob,how are you today
console.log(`\`Yo\` World!`); // `Yo` World

let [x,y] = [1,2];
console.log(`${x} + ${y * 2} = ${x + y * 2}`); // 1 + 4 = 5

function fn() {
	return 'Hello World'
}
console.log(`foo ${fn()} bar`); // foo Hello World bar
console.log(`foo ${(() => 'Hello')()} bar`); // foo Hello bar
*/


/**
 * 标签模板
 */
/*
let [a,b] = [5,10];
//第一个参数s为没有变量替换的部分，其余参数为变量替换部分
//s的长度比其余参数长度多1
function tag(s,v1,v2) {
	console.log(s[0]); // 'Hello'
	console.log(s[1]); // ' world'
	console.log(s[2]); // ''
	console.log(v1); // 15
	console.log(v2); // 50
}
console.log(tag`Hello ${a + b} world ${a * b}`);

let total = 30;
let msg = passthru`The total is ${total} (${total * 1.05} with tax)`;
function passthru(literals) {
	let result = "",i = 0;
	while (i < literals.length){
		result += literals[i++];
		if (i < arguments.length){
			result += arguments[i];
		}
	}
	return result;
}
console.log(msg);  //The total is 30 (31.5 with tax)

let sender = '<p>';
let msg = SaferHTML`<p>${sender} has sent you a message.</p>`;
function SaferHTML(templateData) {
	let s = templateData[0];
	for (let i = 1; i < arguments.length; i++) {
		let arg = String(arguments[i]);
		s += arg.replace(/&/g,"&amp;")
				.replace(/</g,"&lt")
				.replace(/>/g,"&gt");
		s += templateData[i];
	}
	return s;
}
console.log(msg); // '&ltp&gt has sent you a message'
*/













