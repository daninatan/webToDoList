let loginButton = document.getElementById("login-button")
let user = document.getElementById("user")
let password = document.getElementById("password")
let login = false

const loginURL = "webtodolistbackend-production.up.railway.app/login"

loginButton.addEventListener("click", function() {
    const userData ={
        "username": user.value,
        "password": password.value
    }

    fetch(loginURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        login = data;
        if(login){
            window.location.href = "page.html"
        }else{
            window.alert("Usuário ou senha incorretos")
        }
    }) 
})