var socket;
var messageInput;
var room;
var dingSound;
var currentUser;
var messages;
var delay = true;
var userWriting;
var WritingTimeout;

function Connect() {
  socket.emit("join", room, currentUser);
}

function Send() {
  if (delay && messageInput.value.replace(/\s/g, "") != "") {
    delay = false;
    setTimeout(delayReset, 1000);
    socket.emit("send", messageInput.value);
    messageInput.value = "";
  }
}

function refreshDashboard() {
  setTimeout(function () {
    socket.emit("refreshDashboard");
  } , 2000);
}

function delayReset() {
  delay = true;
}

function getChatHistory() {
    chatHistory = JSON.parse(sessionStorage.getItem("chatHistory"));
    if (!chatHistory){
        chatHistory = []
    }
    chatHistory.forEach(msg => {
        showMessage(msg.time, msg.user, msg.message)
    })
}

function showMessage(time, username, message){
    if (document.getElementById("noHayMensajes")) {
      document.getElementById("noHayMensajes").remove();
    }
    var child = document.createElement("li");
    child.innerHTML = `
            <div class="avatar me-3">
                <img src="assets/img/chimangos/${username}.jpg" alt="kal" class="border-radius-lg shadow">
            </div>
            <div class="d-flex align-items-start flex-column justify-content-center">
                <h6 class="mb-0 text-sm">${username}</h6>
                <p class="mb-0 text-xs">${message}</p>
            </div>
            <a class="btn btn-link pe-3 ps-0 mb-0 ms-auto" href="javascript:;">${time}</a>
        `;
    child.classList.add(
      "list-group-item",
      "border-0",
      "d-flex",
      "align-items-center",
      "px-0",
      "mb-2"
    );
    messages.appendChild(child);
    messages.scrollTop = messages.scrollHeight;
}

window.onload = () => {
  socket = io();
  messageInput = document.getElementById("ComposedMessage");
  currentUser = JSON.parse(localStorage.getItem("user"));
  room = "Main";
  dingSound = document.getElementById("AudioPlayer");
  messages = document.getElementById("MessagesContainer");
    userWriting = document.getElementById("user-writing")

  function sendForm(event) {
    event.preventDefault();
  }

  document.getElementById("form-msg").addEventListener("submit", sendForm);

  document.getElementById("btnSendMessage").addEventListener("click", Send);
    
    getChatHistory()
    
    messageInput.addEventListener("input", (e)=>{
        socket.emit("userWriting", currentUser);
    });

  socket.on("join", function (user) {
    console.log(`${user.username} joined`);
  });

  socket.on("recieve", function (response) {
    var current = new Date();
    var time = `${current.getHours()}:${current.getMinutes()}`;

    chatHistory = JSON.parse(sessionStorage.getItem("chatHistory"));
    
    if (!chatHistory){
        chatHistory = []
    }
      
    chatHistory.push({
        time:time,
        user:response.user.username,
        message:response.message
    });

    sessionStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    
    showMessage(time, response.user.username, response.message)

    dingSound.currentTime = 0;
    dingSound.play();
  });

    socket.on("userWriting", (user) => {
        userWriting.innerHTML = `${user.username} está escribiendo...`;
        clearTimeout(WritingTimeout)
        WritingTimeout = setTimeout(()=>{
            userWriting.innerHTML = " "
        }, 1000);
    })
    
    socket.on("ping", function (data) {
        socket.emit("pong", { beat: 1 });
        console.log("pong");
    });

  Connect();
};
