(function () {
  const db = firebase.firestore();

  const user = JSON.parse(localStorage.getItem("user"));
  var nombre = user.username.charAt(0).toUpperCase() + user.username.slice(1);

  document.getElementById("profile-name").innerText = nombre;
  document.getElementById("profile-img").src =
    "assets/img/chimangos/" + user.username + ".jpg";

  nombre = nombre.toLowerCase();

  var fondoReproductor = document.getElementById("fondo-reproductor");
  var fondoPerfil = document.getElementById("fondo-perfil");
  var random = Math.floor(Math.random() * 10);
  fondoReproductor.style =
    "background-image: url('../assets/img/curved-images/curved" +
    random +
    ".jpg')";
  fondoPerfil.style =
    "background-image: url('assets/img/curved-images/curved" +
    random +
    ".jpg'); background-position-y: 50%;";

  var modalError = new bootstrap.Modal(document.getElementById("errorModal"), {
    keyboard: false,
  });

  var modalExito = new bootstrap.Modal(document.getElementById("exitoModal"), {
    keyboard: false,
  });

  var comandos = [
    {
      comando: "$play ",
      ejemplo: "$play + [link]",
      descripcion: "Reproducir un video de YouTube",
    },
    {
      comando: "$lavarPlatos",
      ejemplo: "$lavarPlatos",
      descripcion: "Sortear quien lava los platos",
    },
    {
      comando: "$play",
      ejemplo: "$play",
      descripcion: "Pausar o reproducir el video",
    },
  ];

  function getChimangos() {
    return new Promise((resolve, reject) => {
      db.collection("Chimangos")
        .where("nombre", "==", nombre)
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
    var estado = document.getElementById("selectEstado");
    estado.value = data[0].estado;
    var rangoText = document.getElementById("rango");
    rangoText.innerText =
      data[0].rango.charAt(0).toUpperCase() + data[0].rango.slice(1);
    setHorarios(data[0]);
  });

  function getVideos() {
    return new Promise((resolve, reject) => {
      db.collection("Videos")
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

  var btnVerComandos = document.getElementById("btnVerComandos");
  btnVerComandos.addEventListener("click", () => {
    setComandos();
  });

  var btnGuardarEstado = document.getElementById("saveEstado");
  btnGuardarEstado.addEventListener("click", () => {
    saveEstado();
  });

  function setComandos() {
    var div = document.getElementById("modal-comandos");
    div.innerHTML = "";
    comandos.forEach((element) => {
      var a = document.createElement("a");
      a.className = "btn btn-link text-dark px-3 mb-0";
      a.innerText = element.ejemplo + " - " + element.descripcion;
      div.appendChild(a);
      a.addEventListener("click", () => {
        document.getElementById("ComposedMessage").value = element.comando;
        document.getElementById("btn-close-comandos").click();
      });
    });
  }

  function saveEstado() {
    var estado = document.getElementById("selectEstado");
    var estado = estado.value;
    db.collection("Chimangos")
      .where("nombre", "==", nombre)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection("Chimangos").doc(doc.id).update({
            estado: estado,
          });
        });
      })
      .then(() => {
        document.getElementById("modalSaveText").innerHTML = "Estado guardado";
        refreshDashboard();
        modalExito.show();
      })
      .catch((error) => {
        modalError.show();
      });
  }

  getVideos().then((data) => {
    setVideos(data);
  });

  function setVideos(data) {
    var listaVideos = document.getElementById("lista-videos");
    console.log(listaVideos);
    data.forEach((element) => {
      var li = document.createElement("li");
      li.className =
        "list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg";
      var div = document.createElement("div");
      div.className = "d-flex align-items-center";
      var button = document.createElement("button");
      button.className =
        "btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-3 btn-sm d-flex align-items-center justify-content-center";
      button.setAttribute("id", "video-" + element.link);
      var icon = document.createElement("i");
      icon.className = "fa fa-play";
      var div2 = document.createElement("div");
      div2.className = "d-flex flex-column";
      var h6 = document.createElement("h6");
      h6.className = "mb-1 text-dark text-sm";
      h6.innerHTML = element.nombre;
      var div3 = document.createElement("div");
      div3.className = "d-flex flex-column";

      div2.appendChild(h6);
      button.appendChild(icon);
      div3.appendChild(button);
      div.appendChild(div3);
      div.appendChild(div2);
      li.appendChild(div);

      listaVideos.appendChild(li);

      button = document.getElementById("video-" + element.link);
      button.addEventListener("click", () => {
        console.log(element.link);
        var campoMsg = document.getElementById("ComposedMessage");
        campoMsg.value = "$play " + element.link;
        var btnSend = document.getElementById("btnSendMessage");
        btnSend.click();
      });
    });
  }

  var inputSearchSong = document.getElementById("InputSearchSong");
  inputSearchSong.addEventListener("input", (e) => {
    var listaVideos = document.getElementById("lista-videos");
    childs = listaVideos.querySelectorAll("li");
    childs.forEach((child) => {
      name = child.querySelector("h6").innerHTML.toLowerCase();
      if (name.includes(inputSearchSong.value.toLowerCase())) {
        child.classList.remove("hidden");
      } else {
        child.classList.add("hidden");
      }
    });
  });

  var dias = ["lunes", "martes", "miercoles", "jueves", "viernes"];

  function toggleDisabled(dia) {
    document.getElementById(dia + "-desde1").toggleAttribute("disabled");
    document.getElementById(dia + "-hasta1").toggleAttribute("disabled");
    document.getElementById(dia + "-desde2").toggleAttribute("disabled");
    document.getElementById(dia + "-hasta2").toggleAttribute("disabled");
  }

  function getDataHorario(day) {
    var result = "";
    var desde1 = document.getElementById(day + "-desde1");
    var hasta1 = document.getElementById(day + "-hasta1");
    var desde2 = document.getElementById(day + "-desde2");
    var hasta2 = document.getElementById(day + "-hasta2");
    if (desde1.getAttribute("disabled") == null) {
      result += desde1.value + " - " + hasta1.value;
    }
    if (
      desde2.getAttribute("disabled") == null &&
      desde2.classList.contains("hidden") == false
    ) {
      result += " - " + desde2.value + " - " + hasta2.value;
    }
    return result;
  }

  function validarHorarios(horarios) {
    var array = horarios.replace(/ /g, "");
    array = horarios.split("-");
    if (array.length > 1) {
      var horario1 = array[0];
      var horario2 = array[1];

      var horario1 = horario1.split(":");
      var horario2 = horario2.split(":");

      var minutos1 = parseInt(horario1[1]);
      var horario1 = parseInt(horario1[0]);
      var minutos2 = parseInt(horario2[1]);
      var horario2 = parseInt(horario2[0]);

      if (
        horario1 > horario2 ||
        (horario1 == horario2 && minutos1 > minutos2) ||
        (horario1 == horario2 && minutos1 == minutos2)
      ) {
        return false;
      }

      if (array.length == 4) {
        var horario3 = array[2];
        var horario4 = array[3];

        var horario3 = horario3.split(":");
        var horario4 = horario4.split(":");

        //convert string to int
        var minutos3 = parseInt(horario3[1]);
        var horario3 = parseInt(horario3[0]);
        var minutos4 = parseInt(horario4[1]);
        var horario4 = parseInt(horario4[0]);

        if (
          horario3 > horario4 ||
          (horario3 == horario4 && minutos3 > minutos4) ||
          (horario3 == horario4 && minutos3 == minutos4)
        ) {
          return false;
        }
      }
      return true;
    } else if (horarios === "") {
      return true;
    } else {
      return false;
    }
  }

  var formHorarios = document.getElementById("form-horarios");
  formHorarios.addEventListener("submit", (e) => {
    e.preventDefault();

    var horariosLunes = getDataHorario("lunes");
    var horariosMartes = getDataHorario("martes");
    var horariosMiercoles = getDataHorario("miercoles");
    var horariosJueves = getDataHorario("jueves");
    var horariosViernes = getDataHorario("viernes");

    if (
      validarHorarios(horariosLunes) &&
      validarHorarios(horariosMartes) &&
      validarHorarios(horariosMiercoles) &&
      validarHorarios(horariosJueves) &&
      validarHorarios(horariosViernes)
    ) {
      db.collection("Chimangos")
        .where("nombre", "==", nombre)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            db.collection("Chimangos").doc(doc.id).update({
              lunes: horariosLunes,
              martes: horariosMartes,
              miercoles: horariosMiercoles,
              jueves: horariosJueves,
              viernes: horariosViernes,
            });
          });
        })
        .then(() => {
          document.getElementById("modalSaveText").innerHTML =
            "Horarios guardados";
          refreshDashboard();
          modalExito.show();
        });
    } else {
      modalError.show();
    }
  });

  function setHorarios(data) {
    var checklunes = document.getElementById("check-horario-lunes");
    checklunes.onclick = function () {
      checklunes.toggleAttribute("checked");
      toggleDisabled("lunes");
    };

    var checkmartes = document.getElementById("check-horario-martes");
    checkmartes.onclick = function () {
      checkmartes.toggleAttribute("checked");
      toggleDisabled("martes");
    };

    var checkmiercoles = document.getElementById("check-horario-miercoles");
    checkmiercoles.onclick = function () {
      checkmiercoles.toggleAttribute("checked");
      toggleDisabled("miercoles");
    };

    var checkjueves = document.getElementById("check-horario-jueves");
    checkjueves.onclick = function () {
      checkjueves.toggleAttribute("checked");
      toggleDisabled("jueves");
    };

    var checkviernes = document.getElementById("check-horario-viernes");
    checkviernes.onclick = function () {
      checkviernes.toggleAttribute("checked");
      toggleDisabled("viernes");
    };

    var toggleLunes = document.getElementById("agregar-horario-lunes");
    toggleLunes.onclick = function () {
      toggle2nd("lunes");
    };

    var toggleMartes = document.getElementById("agregar-horario-martes");
    toggleMartes.onclick = function () {
      toggle2nd("martes");
    };

    var toggleMiercoles = document.getElementById("agregar-horario-miercoles");
    toggleMiercoles.onclick = function () {
      toggle2nd("miercoles");
    };

    var toggleJueves = document.getElementById("agregar-horario-jueves");
    toggleJueves.onclick = function () {
      toggle2nd("jueves");
    };

    var toggleViernes = document.getElementById("agregar-horario-viernes");
    toggleViernes.onclick = function () {
      toggle2nd("viernes");
    };

    if (data.nombre != "moni") {
      var lunes = data.lunes.replace(/ /g, "");
      var martes = data.martes.replace(/ /g, "");
      var miercoles = data.miercoles.replace(/ /g, "");
      var jueves = data.jueves.replace(/ /g, "");
      var viernes = data.viernes.replace(/ /g, "");

      lunes = lunes.split("-");
      martes = martes.split("-");
      miercoles = miercoles.split("-");
      jueves = jueves.split("-");
      viernes = viernes.split("-");

      function toggle2nd(param) {
        document
          .getElementById("agregar-horario-" + param)
          .classList.toggle("fa-plus");
        document
          .getElementById("agregar-horario-" + param)
          .classList.toggle("fa-minus");
        document.getElementById(param + "-desde2").classList.toggle("hidden");
        document.getElementById(param + "-hasta2").classList.toggle("hidden");
      }

      if (lunes.length == 2) {
        checklunes.setAttribute("checked", "checked");
        document.getElementById("lunes-desde1").value = lunes[0];
        document.getElementById("lunes-hasta1").value = lunes[1];
      } else if (lunes.length == 4) {
        checklunes.setAttribute("checked", "checked");
        toggle2nd("lunes");
        document.getElementById("lunes-desde1").value = lunes[0];
        document.getElementById("lunes-hasta1").value = lunes[1];
        document.getElementById("lunes-desde2").value = lunes[2];
        document.getElementById("lunes-hasta2").value = lunes[3];
      }

      if (martes.length == 2) {
        checkmartes.setAttribute("checked", "checked");
        document.getElementById("martes-desde1").value = martes[0];
        document.getElementById("martes-hasta1").value = martes[1];
      } else if (martes.length == 4) {
        checkmartes.setAttribute("checked", "checked");
        toggle2nd("martes");
        document.getElementById("martes-desde1").value = martes[0];
        document.getElementById("martes-hasta1").value = martes[1];
        document.getElementById("martes-desde2").value = martes[2];
        document.getElementById("martes-hasta2").value = martes[3];
      }

      if (miercoles.length == 2) {
        checkmiercoles.setAttribute("checked", "checked");
        document.getElementById("miercoles-desde1").value = miercoles[0];
        document.getElementById("miercoles-hasta1").value = miercoles[1];
      } else {
        checkmiercoles.setAttribute("checked", "checked");
        toggle2nd("miercoles");
        document.getElementById("miercoles-desde1").value = miercoles[0];
        document.getElementById("miercoles-hasta1").value = miercoles[1];
        document.getElementById("miercoles-desde2").value = miercoles[2];
        document.getElementById("miercoles-hasta2").value = miercoles[3];
      }
      2;
      if (jueves.length == 2) {
        checkjueves.setAttribute("checked", "checked");
        document.getElementById("jueves-desde1").value = jueves[0];
        document.getElementById("jueves-hasta1").value = jueves[1];
      } else if (jueves.length == 4) {
        checkjueves.setAttribute("checked", "checked");
        toggle2nd("jueves");
        document.getElementById("jueves-desde1").value = jueves[0];
        document.getElementById("jueves-hasta1").value = jueves[1];
        document.getElementById("jueves-desde2").value = jueves[2];
        document.getElementById("jueves-hasta2").value = jueves[3];
      }

      if (viernes.length == 2) {
        checkviernes.setAttribute("checked", "checked");
        document.getElementById("viernes-desde1").value = viernes[0];
        document.getElementById("viernes-hasta1").value = viernes[1];
      } else if (viernes.length == 4) {
        checkviernes.setAttribute("checked", "checked");
        toggle2nd("viernes");
        document.getElementById("viernes-desde1").value = viernes[0];
        document.getElementById("viernes-hasta1").value = viernes[1];
        document.getElementById("viernes-desde2").value = viernes[2];
        document.getElementById("viernes-hasta2").value = viernes[3];
      }
    }
  }
})();
