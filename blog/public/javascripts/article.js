'use strict';

(function () {

	var list = document.getElementsByClassName("articleList")[0],
		listContent = list.getElementsByTagName("li"),
		button = document.getElementsByClassName("loadButton")[0];
	if (listContent.length < 10) {
		forbidButton();
	}

	button.addEventListener('click', function (e) {
		if (button.disabled != 'disabled') {
			loadMoreArticles();
		}
	});

	function loadMoreArticles() {
		function callback(res) {
			addArticles(res);
			if (ifButtonNeedForbidden(res)) {
				forbidButton();
			}
		}

		ajax(callback);
	}

	function ajax(callback) {

		var xhr = new XMLHttpRequest();
		xhr.open('GET', window.location.pathname + '/api/articles/' + listContent.length, true);
		xhr.send();

		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				callback(JSON.parse(xhr.responseText));
			}
		}

	}

	function addArticles(res) {
		res.forEach(function (article, index) {
			var child = document.createElement('li'),
				childLink = document.createElement('a');
			childLink.href = '/article/' + article._id;
			childLink.innerText = article.title;
			child.appendChild(childLink);
			list.appendChild(child);
		});
		listContent = list.getElementsByTagName("li");
	}

	function ifButtonNeedForbidden(res) {
		if (res.length < 10) {
			return true;
		}
		return false;
	}

	function forbidButton() {
		button.disabled = 'disabled';
		button.innerText = 'No more articles';
	}

})();

