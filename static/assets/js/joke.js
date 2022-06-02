function checkJoke(){
    fetch('https://flasktest.matiasendres.repl.co/isJoke')
    .then(response => response.json())
    .then(data => {
        if (data.joke == true){
            alert("JOKE!!")
            sendJoke(false)
        }
    });
    
    setTimeout(checkJoke, 3000);
    
}

function sendJoke(state){
    var url = 'https://flasktest.matiasendres.repl.co/setJoke';
    var data = {joke: state};
    
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    
}

checkJoke();