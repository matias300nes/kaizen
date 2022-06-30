var socket;
var room;
var delay = true;
var vMouse;
var timer;
var enableHandler = true;

function Connect() {
  socket.emit("join", room, currentUser);
}

function delayReset() {
  delay = true;
}

window.onmousemove = (e) => {
    if(enableHandler){
        x = e.x
        y = e.y
        vMouse.style.top = `${y}px`
        vMouse.style.left = `${x}px`
        socket.emit("mouseMove", x, y)
        enableHandler = false
    }

}

window.onclick = (e) => {
    x = e.x
    y = e.y
    socket.emit("mouseClick", x, y)
}

window.onload = () => {
    socket = io();
    vMouse = document.querySelector("#vMouse")
    
    Connect();
};

timer = window.setInterval(function(){
    enableHandler = true;
}, 20);
