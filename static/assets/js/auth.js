
//LOGIN

function login(e){
    e.preventDefault();
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;

    if (username == '' || password == '') {
        alert('Please fill in all fields');
    }
    else {
        url = 'https://flasktest.matiasendres.repl.co/login';
        data = {'username': username, 'password': password};
        
        fetch(url, {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .then(response => {
            console.log(response);
            if (response.id) {
                sessionStorage.setItem('user', JSON.stringify(response));
                window.location.href = 'index.html';
            }
            else {
                alert(response.message);
            }
        })
        .catch(error => console.error('Error:', error));
        
    }
}

function checkAuthenticated() {
    //user not exist in session storage redirect to login
    user = JSON.parse(sessionStorage.getItem('user'));
    if (user == null) {
        window.location.href = 'login.html';
    }
}

if (window.location.href.includes('login.html')) {
    document.getElementById('login-form').addEventListener('submit', login);
}else{
    checkAuthenticated();
}