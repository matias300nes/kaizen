const config = {
  apiKey: "AIzaSyD6Epld_Zia8rhLFAok1ImjH2Nj1AnQFh0",
  authDomain: "kaizen-d1fe5.firebaseapp.com",
  projectId: "kaizen-d1fe5",
  storageBucket: "kaizen-d1fe5.appspot.com",
  messagingSenderId: "627837625104",
  appId: "1:627837625104:web:0f4ccf647fd88d748dbb95",
};
firebase.initializeApp(config);
const db = firebase.firestore();

function getChimangos() {
  return new Promise((resolve, reject) => {
    db.collection("Chimangos")
      .get()
      .then((snapshot) => {
        let data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        resolve(data);
      });
  });
}

getChimangos().then((data) => {
  setHorarios(data);
});

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

function setHorarios(chimangos) {
  chimangos.forEach((element) => {
    var horario = document.getElementById("horario-" + element.nombre);
    var horario2 = document.getElementById("horario2-" + element.nombre);
    var arrayHorarios = [];
    switch (dayName) {
      case "Lunes":
        arrayHorarios = element.lunes.replace(/ /g, "");
        break;
      case "Martes":
        arrayHorarios = element.martes.replace(/ /g, "");
        break;
      case "Miercoles":
        arrayHorarios = element.miercoles.replace(/ /g, "");
        break;
      case "Jueves":
        arrayHorarios = element.jueves.replace(/ /g, "");
        break;
      case "Viernes":
        arrayHorarios = element.viernes.replace(/ /g, "");
        break;
    }
    
    var arrayHorariosSplit = arrayHorarios.split("|");
    switch(arrayHorariosSplit.length){
        case 1:
            var horario1 = arrayHorarios.split("-");
            break;
        case 2:
            var horario1 = arrayHorariosSplit[0].split("-");
            var horario2 = arrayHorariosSplit[1].split("-");
            console.log(horario1);
    console.log(horario2);
            break;
        case 3:
            var horario1 = arrayHorariosSplit[0].split("-");
            var horario2 = arrayHorariosSplit[1].split("-");
            var horario3 = arrayHorariosSplit[2].split("-");
            break;
    }

    var cantidadHorarios = arrayHorariosSplit.length;
    
      if (cantidadHorarios === 1) {
        var nombre = element.nombre;
        var horarioEntrada = horario1[0];
        var horarioSalida = horario1[1];

        var horaEntrada = horarioEntrada.split(":")[0];
        var minEntrada = horarioEntrada.split(":")[1];

        var horaSalida = horarioSalida.split(":")[0];
        var minSalida = horarioSalida.split(":")[1];

        if (minEntrada === "00") {
          const divEntrada = document.createElement("div");
          divEntrada.className = "hour-start color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioEntrada;
          divEntrada.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaEntrada)
            .appendChild(divEntrada);
        } else {
          const divEntrada = document.createElement("div");
          divEntrada.className = "hour-start-half color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioEntrada;
          divEntrada.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaEntrada)
            .appendChild(divEntrada);
        }

        if (minSalida === "00") {
          const divSalida = document.createElement("div");
          divSalida.className = "hour-end color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioSalida;
          divSalida.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaSalida)
            .appendChild(divSalida);
        } else {
          const divSalida = document.createElement("div");
          divSalida.className = "hour-end-half color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioSalida;
          divSalida.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaSalida)
            .appendChild(divSalida);
        }

        for (
          let index = parseInt(horaEntrada) + 1;
          index < parseInt(horaSalida);
          index++
        ) {
          const divDurante = document.createElement("div");
          divDurante.className = "hour-during color-" + nombre;
          document
            .getElementById("col-" + nombre + "-" + index)
            .appendChild(divDurante);
        }
      } else if (cantidadHorarios === 2) {
        var nombre = element.nombre;
        var horarioEntrada1 = horario1[0];
        var horarioSalida1 = horario1[1];
        var horarioEntrada2 = horario2[0];
        var horarioSalida2 = horario2[1];

        var horaEntrada1 = horarioEntrada1.split(":")[0];
        var minEntrada1 = horarioEntrada1.split(":")[1];
        var horaEntrada2 = horarioEntrada2.split(":")[0];
        var minEntrada2 = horarioEntrada2.split(":")[1];

        var horaSalida1 = horarioSalida1.split(":")[0];
        var minSalida1 = horarioSalida1.split(":")[1];
        var horaSalida2 = horarioSalida2.split(":")[0];
        var minSalida2 = horarioSalida2.split(":")[1];

        if (minEntrada1 === "00") {
          const divEntrada = document.createElement("div");
          divEntrada.className = "hour-start color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioEntrada1;
          divEntrada.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaEntrada1)
            .appendChild(divEntrada);
        } else {
          const divEntrada = document.createElement("div");
          divEntrada.className = "hour-start-half color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioEntrada1;
          divEntrada.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaEntrada1)
            .appendChild(divEntrada);
        }

        if (minSalida1 === "00") {
          const divSalida = document.createElement("div");
          divSalida.className = "hour-end color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioSalida1;
          divSalida.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaSalida1)
            .appendChild(divSalida);
        } else {
          const divSalida = document.createElement("div");
          divSalida.className = "hour-end-half color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioSalida1;
          divSalida.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaSalida1)
            .appendChild(divSalida);
        }

        for (
          let index = parseInt(horaEntrada1) + 1;
          index < parseInt(horaSalida1);
          index++
        ) {
          console.log(index);
          const divDurante = document.createElement("div");
          divDurante.className = "hour-during color-" + nombre;
          document
            .getElementById("col-" + nombre + "-" + index)
            .appendChild(divDurante);
        }

        if (minEntrada2 === "00") {
          const divEntrada = document.createElement("div");
          divEntrada.className = "hour-start color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioEntrada2;
          divEntrada.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaEntrada2)
            .appendChild(divEntrada);
        } else {
          const divEntrada = document.createElement("div");
          divEntrada.className = "hour-start-half color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioEntrada2;
          divEntrada.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaEntrada2)
            .appendChild(divEntrada);
        }

        if (minSalida2 === "00") {
          const divSalida = document.createElement("div");
          divSalida.className = "hour-end color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioSalida2;
          divSalida.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaSalida2)
            .appendChild(divSalida);
        } else {
          const divSalida = document.createElement("div");
          divSalida.className = "hour-end-half color-" + nombre;
          const textoHora = document.createElement("h5");
          textoHora.innerHTML = horarioSalida2;
          divSalida.appendChild(textoHora);
          document
            .getElementById("col-" + nombre + "-" + horaSalida2)
            .appendChild(divSalida);
        }

        for (
          let index = parseInt(horaEntrada2) + 1;
          index < parseInt(horaSalida2);
          index++
        ) {
          console.log(index);
          const divDurante = document.createElement("div");
          divDurante.className = "hour-during color-" + nombre;
          document
            .getElementById("col-" + nombre + "-" + index)
            .appendChild(divDurante);
        }
      }
  });
}

setHorarios();