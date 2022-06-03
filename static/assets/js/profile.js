(function () {
    const user = JSON.parse(localStorage.getItem('user'));
    var nombre = user.username.charAt(0).toUpperCase() + user.username.slice(1);

    document.getElementById("profile-name").innerText = nombre;
    document.getElementById("profile-img").src = "assets/img/chimangos/" + user.username + ".jpg";
})();