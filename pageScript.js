tasks = document.getElementById("content")
taskNameField = document.getElementById('text')
let tasksList = {}
let lastId = 1

const addURL = "https://webtodolistbackend-production.up.railway.app/toDoList/addTask"
const testeAddURL = "http://localhost:8080/toDoList/addTask"
const getURL = "https://webtodolistbackend-production.up.railway.app/toDoList/getTasks"
const testeGetURL = "http://localhost:8080/toDoList/getTasks"

getTasks();

function getTasks(){
    fetch(getURL)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            initAddTask(element.name, element.id)
            tasksList[element.name] = element.id
            lastId = element.id
        });
    })
}

function initAddTask(taskName, id){
    htmlItem = `<nav class="defaultTaskNav"><p class="task">${taskName}</p><button class="removeBtn" onclick="removeTask(this)">Remover</button></nav>`
    tasks.innerHTML += htmlItem
    taskNameField.value = ""
}

function addTask(){
    if(taskNameField.value != ""){
        lastId++
        taskName = taskNameField.value
        htmlItem = `<nav class="defaultTaskNav"><p class="task">${taskName}</p><button class="removeBtn" onclick="removeTask(this)">Remover</button></nav>`
        tasksList[taskName] = lastId
        tasks.innerHTML += htmlItem
        taskNameField.value = ""
    }else{
        window.alert("Task vazia")
    }

    const newTask = {
        "name": taskName,
        "id": lastId
    }

    fetch(addURL, {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
    })
    
}

function removeTask(e){
    e.parentElement.remove()
    const data = e.parentElement.querySelector(".task").innerHTML
    const deleteURL = `https://webtodolistbackend-production.up.railway.app/toDoList/deleteTask/${tasksList[data]}`
    

    fetch(deleteURL, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    })
}