(function () {
  const db = firebase.firestore();

  const user = JSON.parse(localStorage.getItem("user"));
  var nombre = user.username.charAt(0).toUpperCase() + user.username.slice(1);

  document.getElementById("profile-name").innerText = nombre;
  document.getElementById("profile-img").src =
    "assets/img/chimangos/" + user.username + ".jpg";

  nombre = nombre.toLowerCase();

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
    setHorarios(data[0]);
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

  var formHorarios = document.getElementById("form-horarios");
  formHorarios.addEventListener("submit", (e) => {
    e.preventDefault();

    var horariosLunes = getDataHorario("lunes");
    var horariosMartes = getDataHorario("martes");
    var horariosMiercoles = getDataHorario("miercoles");
    var horariosJueves = getDataHorario("jueves");
    var horariosViernes = getDataHorario("viernes");

    //update in firebase
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
        alert("Horarios actualizados");
      });

    // db.collection("Chimangos")
    //   .doc(nombre)
    //   .set(horarios)
    //   .then(() => {
    //     alert("Horarios actualizados");
    //   }
    //   )
    //   .catch((error) => {
    //     alert("Error al actualizar horarios");
    //   }
    //   );
  });

  function setHorarios(data) {
    var estado = data.estado;

    var selectEstado = document.getElementById("selectEstado");

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

    console.log(miercoles);

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
})();
