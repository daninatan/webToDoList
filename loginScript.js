let loginButton = document.getElementById("login-button")
let user = document.getElementById("user")
let password = document.getElementById("password")
let login = false

const loginURL = "https://webtodolistbackend-production.up.railway.app/login"
const testeLoginURL = "http://localhost:8080/login"

const updateURL = "https://webtodolistbackend-production.up.railway.app/toDoList/createController"
const testeUpdateURL = "http://localhost:8080/toDoList/createController"

function update(){
    fetch(updateURL)
    .then(response => response.text())
    .then(data => {
        console.log(data)
    })
}

loginButton.addEventListener("click", function() {
    const userData ={
        "username": user.value,
        "password": password.value,
        "id": -1
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
            update()
            window.location.href = "page.html"
        }else{
            window.alert("Usuário ou senha incorretos")
        }
    }) 
})