const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require("path");

const app = express();
const httpserver = http.Server(app);
const io = socketio(httpserver);

const gamedirectory = path.join(__dirname, "static");

app.use(express.static(gamedirectory));

httpserver.listen(3000);

var rooms = [];
var users = [];

io.on('connection', function(socket) {

	socket.on("join", function(room, user) {
		if (user != null) {
			rooms[socket.id] = room;
			users[socket.id] = user;
			socket.leaveAll();
			socket.join(room);
			/* io.in(room).emit("recieve", "Server : " + user.username + " has entered the chat.");
			socket.emit("join", room); */
			io.in(room).emit("join", user);
		}
	})

    socket.on("mouseMove", (x,y) => {
        socket.broadcast.emit("mouseMove", x, y);
	})

    socket.on("mouseClick", (x,y) => {
        socket.broadcast.emit("mouseClick", x, y);
	})

    socket.on("userWriting", (user) => {
        socket.broadcast.emit("userWriting", user);
    })

    socket.on("refreshDashboard", () => {
        io.sockets.emit("refreshDashboard");
    })

	socket.on("playVideo", () => {
		socket.broadcast.emit("playVideo");
	})

	socket.on("prevVideo", () => {
		socket.broadcast.emit("prevVideo");
	})

	socket.on("nextVideo", () => {
		socket.broadcast.emit("nextVideo");
	})

	socket.on("muteVideo", () => {
		socket.broadcast.emit("muteVideo");
	})

	socket.on("changeVolume", (vol) => {
		socket.broadcast.emit("changeVolume", vol);
	})

	socket.on("send", function(message) {
		response = {
			user: users[socket.id],
			message: message
		}
		/* io.in(rooms[socket.id]).emit("recieve", response); */
        io.sockets.emit("recieve", response);
	})

	socket.on("recieve", function(message) {
		response = {
			user: users[socket.id],
			message: message
		}
		socket.emit("recieve", response);
	})

    socket.on('pong', function(data){
        console.log("Pong received from client");
    })
    
})


function sendHeartbeat(){
    setTimeout(sendHeartbeat, 24000);
    io.sockets.emit('ping', { beat : 1 });
}

setTimeout(sendHeartbeat, 24000);