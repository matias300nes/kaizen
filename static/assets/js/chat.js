var socket;
var usernameInput
var chatIDInput;
var messageInput;
var chatRoom;
var dingSound;
var messages;
var delay = true;

function onload(){
    socket = io();
    usernameInput = document.getElementById("NameInput");
    chatIDInput = document.getElementById("IDInput");
    messageInput = document.getElementById("ComposedMessage");
    chatRoom = document.getElementById("RoomID");
    dingSound = document.getElementById("Ding");
    messages =  document.getElementById("MessagesContainer")

    socket.on("join", function(room){
        chatRoom.innerHTML = "Chatroom : " + room;
    })

    socket.on("recieve", function(message){
        var child = document.createElement('p')
        child.innerHTML = `${message}`
        child.classList.add("Message")
        messages.appendChild(child)
        messages.scrollTop = messages.scrollHeight;
        dingSound.currentTime = 0;
        dingSound.play();
      
    })
}

function Connect(){
    socket.emit("join", chatIDInput.value, usernameInput.value);
}

function Send(){
    if (delay && messageInput.value.replace(/\s/g, "") != ""){
        delay = false;
        setTimeout(delayReset, 1000);
        socket.emit("send", messageInput.value);
        messageInput.value = "";
    }
}

function delayReset(){
    delay = true;
}