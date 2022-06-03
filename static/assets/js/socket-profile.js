var socket;
var messageInput;
var room;
var dingSound;
var currentUser;
var messages;
var delay = true;

function Connect(){
    socket.emit("join", room, currentUser);
}

function Send(){
    console.log("sEEENnndd")
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

window.onload = () => {
    console.log("onload")
    socket = io();
    messageInput = document.getElementById("ComposedMessage");
    currentUser = JSON.parse(localStorage.getItem('user'));
    Room = "Main";
    dingSound = document.getElementById("Ding");
    messages =  document.getElementById("MessagesContainer")
    
    function sendForm(event) {
        event.preventDefault();
    }
    
    document.getElementById("form-msg").addEventListener('submit', sendForm);

    document.getElementById("btnSendMessage").addEventListener('click',Send)

    socket.on("join", function(user){
        console.log("user joined")
        /* chatRoom.innerHTML = "Chatroom : " + room; */
    })


    socket.on("recieve", function(response){
        var current = new Date();
        var time = `${current.getHours()}:${current.getMinutes()}`;
        var child = document.createElement('li');
        child.innerHTML = `
            <div class="avatar me-3">
                <img src="assets/img/chimangos/${response.user.username}.jpg" alt="kal" class="border-radius-lg shadow">
            </div>
            <div class="d-flex align-items-start flex-column justify-content-center">
                <h6 class="mb-0 text-sm">${response.user.username}</h6>
                <p class="mb-0 text-xs">${response.message}</p>
            </div>
            <a class="btn btn-link pe-3 ps-0 mb-0 ms-auto" href="javascript:;">${time}</a>
        `
        child.classList.add("list-group-item", "border-0", "d-flex", "align-items-center", "px-0", "mb-2")
        messages.appendChild(child)
        messages.scrollTop = messages.scrollHeight;
        dingSound.currentTime = 0;
        dingSound.play();
      
    })

    Connect()
}

