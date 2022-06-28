(function () {
    const db = firebase.firestore();
  
    const user = JSON.parse(localStorage.getItem("user"));
    var nombre = user.username.charAt(0).toUpperCase() + user.username.slice(1);
  
    document.getElementById("profile-name").innerText = nombre;
    document.getElementById("profile-img").src =
      "assets/img/chimangos/" + user.username + ".jpg";
  
    nombre = nombre.toLowerCase();

    //when document is ready
    
  
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
     
    });
  
    var dias = ["lunes", "martes", "miercoles", "jueves", "viernes"];
  
  })();
  