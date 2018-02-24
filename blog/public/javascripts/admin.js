'use strict';

(function () {

	var articleList = document.getElementsByClassName("article-list")[0];

	articleList.addEventListener('click', function (e) {
		//发布与取消发布
		if (e.target.tagName == 'BUTTON' && e.target.classList.contains('publishButton')) {
			var path = e.path;
			for (var i = 0; i < path.length; i++) {
				if (path[i].tagName == 'LI' && path[i].id){
					var id = path[i].id.split('-')[1];
					changePublishState(id, e.target);
					break;
				}
			}
		}
		//删除文章
		else if (e.target.tagName == 'BUTTON' && e.target.classList.contains('deleteButton')) {
			var path = e.path
			for (var i = 0; i < path.length; i++) {
				if (path[i].tagName == 'LI' && path[i].id){
					var id = path[i].id.split('-')[1];
					deleteArticle(id, path[i]);
					break;
				}
			}
		}
	});


	function ajax(dom, options, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open(options.type, options.href, true);
		xhr.send();

		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				callback(dom, xhr.responseText);
			}
		}
	}

	//发布与取消发布
	function changePublishState(id, btn) {
		putAjax(id, btn, changeButtonState);
	}

	function putAjax(id, btn, callback) {
		ajax(btn, {
			type: 'PUT',
			href: window.location.href + '/api/changePublishState/' + id,
		}, callback);
	}

	function changeButtonState(btn, res) {
		if (res.indexOf('published')) {
			btn.innerText = res;
		}
		else{
			console.log(res);
		}
	}

	//删除文章
	function deleteArticle(id, content) {
		deleteAjax(id, content, deleteDom);
	}

	function deleteAjax(id, content, callback) {
		ajax(content, {
			type: "delete",
			href: window.location.href + '/api/delete/' + id,
		}, callback);
	}

	function deleteDom(content, res) {
		if (res.indexOf('success')) {
			content.parentNode.removeChild(content);
		}
		else{
			console.log(res);
		}
	}

})();