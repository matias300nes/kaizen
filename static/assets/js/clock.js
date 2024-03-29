var days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  var d = new Date();
  var dayName = days[d.getDay()];

  var dayContainer = document.getElementById("nombreDia");
  dayContainer.innerHTML = dayName;

function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }

    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    if(h == 0 && m == 0 && s == 1){
        d = new Date();
        dayName = days[d.getDay()];
        dayContainer.innerHTML = dayName;
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

showTime();