var socket;
var messageInput;
var room;
var dingSound;
var currentUser;
var messages;
var delay = true;
var vMouse;
var mouseIsMoving;

function Connect() {
  socket.emit("join", room, currentUser);
}

function delayReset() {
  delay = true;
}

function removeToast(toast) {
  toast.remove();
}

function mouseTimeout(){
    mouseIsMoving = false
}

window.onload = () => {
  socket = io();
  currentUser = JSON.parse(localStorage.getItem("user"));
  room = "Main";
  dingSound = document.getElementById("AudioPlayer");
    vMouse = document.querySelector("#vMouse")

  socket.on("join", function (user) {
    console.log("user joined");
  });

  socket.on("recieve", function (response) {
    toastContainer = document.getElementById("toastContainer");
    toast = document.createElement("div");
    toast.classList.add("customToast");
    toast.innerHTML = `
            <div class="toastHeader">
                <img src="assets/img/chimangos/${response.user.username}.jpg" class="avatar avatar-sm me-3">
                <p>${response.user.username}</p>
            </div>
            <hr>
            <div class="toastMessage">${response.message}</div>
        `;
    toastContainer.appendChild(toast);

    console.log(response.message);
    dingSound.src = "assests/audio/Ding.mp3";
    dingSound.currentTime = 0;
    dingSound.play();

    setTimeout(removeToast, 8000, toast);

    if (response.message.includes("$")) {
      split = response.message.split(" ");
      cmd = split[0];
      split.shift();
      params = split;

      execCommand(cmd, params);
    }
  });

  socket.on("ping", function (data) {
    socket.emit("pong", { beat: 1 });
    console.log("pong");
  });

  socket.on("refreshDashboard", () => {
    clearHorarios();
    getChimangos().then((data) => {
      setHorarios(data);
    });
  });

    socket.on("mouseMove", (x,y) => {
        mouseIsMoving = true
        vMouse.style.top = `${y}px`
        vMouse.style.left = `${x}px`
        setInterval(mouseTimeout, 5000)
    })

    socket.on("mouseClick", (x,y) => {
        document.elementsFromPoint(x,y)[1].click()
    })

  Connect();
};

function execCommand(command, parameters) {
  switch (command) {
    /* cambia la musica del reproductor  */
    case "$play":
      musicIntput = document.getElementById("video-link");
      changeButton = document.getElementById("cambiar-video");
      playButton = document.getElementsByClassName("ytp-play-button");
      console.log(playButton);
      if (parameters[0]) {
        musicIntput.value = parameters[0];
        changeButton.click();
      } else {
        playButton.click(); /* No funciona */
      }
      break;
    case "$playWav":
      audioPlayer = document.getElementById("AudioPlayer");
      audioPlayer.src = `assets/audio/${parameters[0]}.wav`;
      audioPlayer.currentTime = 0;
      audioPlayer.play();
      break;
    case "$say":
      var msg = new SpeechSynthesisUtterance();
      str = "";
      parameters.forEach((item) => {
        str += " " + item;
      });
      msg.text = str;
      msg.lang = "es";
      window.speechSynthesis.speak(msg);
      break;
    case "$reload":
      location.reload();
      break;
    case "$lavarPlatos":
      btnLavar = document.querySelector("#sortearLavaplatos");
      btnLavar.click();
  }
}

var x = Math.floor(Math.random() * window.innerWidth);
var y = Math.floor(Math.random() * window.innerHeight);
var vx = Math.floor(Math.random() * 2);
var vy = Math.floor(Math.random() * 4);
var radius = 20;

timer = window.setInterval(function(){
    // Conditions sso that the ball bounces
    // from the edges
    if(!mouseIsMoving){
        if (radius + x > window.innerWidth)
        vx = 0 - vx;

        if (x - radius < 0)
            vx = 0 - vx;
    
        if (y + radius > window.innerHeight)
            vy = 0 - vy;
    
        if (y - radius < 0)
            vy = 0 - vy;
    
        x = x + vx;
        y = y + vy;
    
        vMouse.style.top = `${y}px`
        vMouse.style.left = `${x}px`
    }
    
}, 20);