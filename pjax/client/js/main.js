/**
 * Created by Administrator on 2018/3/1.
 */

'use strict';

let links = document.getElementsByTagName('a');
let content = document.getElementsByTagName('p')[0];

for (let i = 0; i < links.length; i++) {
	(function (i) {
		links[i].addEventListener('click', function (e) {
			e = e? e: window.event;
			e.preventDefault();
			getData(i);
		})
	})(i);
}

function getData(index) {
	let url = '';
	switch (index){
		case 0:
			url = '/api/a';
			break;
		case 1:
			url = '/api/b';
			break;
		case 2:
			url = '/api/c';
			break;
	}
	fetch(url)
		.then(function (res) {
			return res.json()
		})
		.then(function (data) {
			history.pushState({text: data}, null, `/${index}`);
			pushData(data);
		});
}

function pushData(data) {
	content.innerHTML = data.text;
}

window.addEventListener('popstate',function (e) {
	pushData(e.state.text);
});

let lastWord = location.pathname.charAt(location.pathname.length - 1);
if (lastWord == 1 || lastWord == 2 || lastWord == 0) {
	getData(+lastWord);
}