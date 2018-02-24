'use strict';

(function () {

	var formData = {
		studentID: '',
		pwd: '',
		radio: [],
		text: '',
	};

	var subBtn = document.getElementById("subBtn");
	var errMsg = document.getElementById("errMsg");
	var msgArea = document.getElementById("msgArea");
	var radioBox = document.getElementsByClassName("radio");
	var radio = [];
	for (var i = 0; i < radioBox.length; i++) {
		radio[i] = radioBox[i].getElementsByTagName('input');
	}

	subBtn.addEventListener('click', btnClick);

	function btnClick() {
		formData.studentID = document.getElementById("studentID").value.replace(/\s+/g, "");
		formData.pwd = document.getElementById("pwd").value;
		formData.text = document.getElementById("zgpj").value;

		var benchmark = [25, 25, 30, 20];
		for (var j = 0; j < radio.length; j++) {
			var eachRadio = radio[j];
			for (var i = 0; i < eachRadio.length; i++) {
				if (eachRadio[i].checked) {
					if (i == 0) {
						formData.radio[j] = `${benchmark[j]}_0.95`;
					}
					else if (i == 1) {
						formData.radio[j] = `${benchmark[j]}_0.75`;
					}
					else if (i == 2) {
						formData.radio[j] = `${benchmark[j]}_0.05`;
					}
					else {
						formData.radio[j] = `${benchmark[j]}_0.95`;
					}
					break;
				}
			}
		}


		if (formCheck().access) {
			evaluation();
		}
		else {
			alert(formCheck().msg);
		}
	}

	function formCheck() {

		var retMsg = {
			access: false,
			msg: ''
		};

		if (formData.studentID.length != 10) {
			retMsg.msg = '学号格式错误';
		}
		else if (!formData.pwd) {
			retMsg.msg = '密码不能为空';
		}
		else if (!formData.text) {
			retMsg.msg = '主观评教不能为空';
		}
		else {
			retMsg.access = true;
		}

		return retMsg;
	}

	function ajax(data, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', window.location.href + '/api/evaluation', true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(data);

		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && xhr.status == 200) {
				callback(xhr.responseText);
			}
		}
	}

	function evaluation() {

		var data = '';
		for (var key in formData) {
			data += key + '=' + formData[key];
			data += '&';
		}

		console.log(formData);

		data = data.slice(0, -1);

		ajax(data, function (res) {
			var res = JSON.parse(res);
			if (res.status == false) {
				errMsg.innerHTML = res.message;
			}
			else if (res.status == true) {
				errMsg.innerHTML = '';
				var cookiee = res.message;
				formData.cookiee = cookiee;
				//进行websocket操作
				abandonBtn();
				connectIO();
			}
			else {
				console.log('res.status error');
			}
		});
	}

	function connectIO() {
		/**
		 * 发布到服务器时,记得修改
		 */
		let socket = io('ws://localhost:3001');
		socket.emit('msg', JSON.stringify(formData));
		socket.on('message', function (msg) {
			var child = document.createElement('p');
			child.innerHTML = msg;
			msgArea.appendChild(child);
		});
		socket.on('errMsg', function (msg) {
			var child = document.createElement('p');
			child.innerHTML = msg;
			msgArea.appendChild(child);
			allowBtn();
		});
	}

	function allowBtn() {
		subBtn.addEventListener('click', btnClick);
		subBtn.disabled = false;
		document.getElementById("studentID").disabled = false;
		document.getElementById("pwd").disabled = false;
		document.getElementById("zgpj").disabled = false;
		for (var i = 0; i < radio.length; i++) {
			radio[i].disabled = false;
		}
	}

	function abandonBtn() {
		subBtn.removeEventListener('click', btnClick);
		subBtn.disabled = true;
		document.getElementById("studentID").disabled = true;
		document.getElementById("pwd").disabled = true;
		document.getElementById("zgpj").disabled = true;
		for (var i = 0; i < radio.length; i++) {
			radio[i].disabled = true;
		}
	}

})();



