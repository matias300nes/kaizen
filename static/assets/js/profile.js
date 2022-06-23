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
      db.collection("Chimangos").where("nombre", "==", nombre)
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

  function setHorarios(data){
      var estado = data.estado;

      var selectEstado = document.getElementById("selectEstado");
    
      var checklunes = document.getElementById("check-horario-lunes");
      checklunes.onclick = function() {
          checklunes.toggleAttribute("checked");
      }

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

    if(lunes.length == 2){
        checklunes.setAttribute("checked", "checked");
        document.getElementById("lunes-desde1").value = lunes[0];
        document.getElementById("lunes-hasta1").value = lunes[1];
    }else if(lunes.length == 4){
        checklunes.setAttribute("checked", "checked");
        document.getElementById("lunes-desde1").value = lunes[0];
        document.getElementById("lunes-hasta1").value = lunes[1];
        document.getElementById("lunes-desde2").value = lunes[3];
        document.getElementById("lunes-hasta2").value = lunes[4];
    }



  }
})();
