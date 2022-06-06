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

function delayReset(){
    delay = true;
}

function removeToast(toast){
    toast.remove()
}

window.onload = () => {
    socket = io();
    currentUser = JSON.parse(localStorage.getItem('user'));
    room = "Main";
    dingSound = document.getElementById("AudioPlayer");
    

    socket.on("join", function(user){
        console.log("user joined")
    })

    socket.on("recieve", function(response){
        toastContainer = document.getElementById("toastContainer");
        toast = document.createElement('div');
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
        dingSound.src = "assests/audio/Ding.mp3"
        dingSound.currentTime = 0;
        dingSound.play();

        setTimeout(removeToast, 8000, toast);
        
        if (response.message.includes("$")){
            split = response.message.split(" ")
            cmd = split[0];
            split.shift();
            params = split;

            execCommand(cmd, params);
        }
      
    })

    Connect()
}

function execCommand(command, parameters){
    switch (command){
        /* cambia la musica del reproductor  */
        case "$play":
            musicIntput = document.getElementById("video-link");
            playButton = document.getElementById("cambiar-video");

            musicIntput.value = parameters[0];
            playButton.click();
            break;
        case "$playWav":
            audioPlayer = document.getElementById("AudioPlayer");
            audioPlayer.src = `assets/audio/${parameters[0]}.wav`
            audioPlayer.currentTime = 0;
            audioPlayer.play();
            break;
            
    }
}