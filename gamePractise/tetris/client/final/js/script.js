
"use strict";

let socket = io('ws://localhost:3000');

let local = new Local(socket);

let remote = new Remote(socket);

socket.on('waiting', (str) => {
	document.getElementById("waiting").innerHTML = str;
});




















