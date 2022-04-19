//selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const checkedList = document.querySelector(".completed-task")
const todoContainer = document.querySelector(".todo-container")

//event listeners
document.addEventListener("DOMContentLoaded", getTodos);
document.addEventListener("DOMContentLoaded", getChecked);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteNow);
todoList.addEventListener("click", checked);
checkedList.addEventListener("click", deleteNow);
checkedList.addEventListener("click", checked);

document.addEventListener("DOMContentLoaded", function() {
    todoButton.disabled = true;

    todoInput.onkeyup = () => {
        if (todoInput.value.length > 0) {
            todoButton.disabled = false;
        } else {
            todoButton.disabled = true;
        }
    }
})

function addTodo(e) {
    e.preventDefault();
    //TODO div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todoDiv');

    const checkedCircle = document.createElement('button');
    checkedCircle.innerHTML='<i class="far fa-circle"></i>';
    checkedCircle.classList.add("checked-btn")
    todoDiv.appendChild(checkedCircle);

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    save(todoInput.value);

    const trashButton = document.createElement('button');
    trashButton.innerHTML= '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
}

function checked(e) {
    const item = e.target;

    if (item.classList[0] === "checked-btn"){
        const finished = item.parentElement;
        finished.classList.add("checkedList");
        todoList.removeChild(finished);

        checkedList.append(finished);

        checkedLocalStorage(finished.innerText);
    }
}

function deleteNow(e) {
    const item = e.target;

    if (item.classList[0] === "trash-btn"){

        const todo = item.parentElement;
        todo.remove();

        deleteLocalStorage(todo.innerText);

    }
}

function save(todo){
    let todos;

    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;

    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todoDiv');

        const checkedCircle = document.createElement('button');
        checkedCircle.innerHTML='<i class="far fa-circle"></i>';
        checkedCircle.classList.add("checked-btn")
        todoDiv.appendChild(checkedCircle);

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const trashButton = document.createElement('button');
        trashButton.innerHTML= '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn")
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);

        todoInput.value = "";
        })
    }


function deleteLocalStorage(todo){
    let todos;
    let checkedTodo;

    if (localStorage.getItem("todos") === null){
        todos = [];
    } if (localStorage.getItem("checkedTodo") === null){
        checkedTodo = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
        checkedTodo = JSON.parse(localStorage.getItem("checkedTodo"));
    } 

    let todoIndex = todos.indexOf(todo);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));

    let checkedIndex = checkedTodo.indexOf(todo);
    checkedTodo.splice(checkedIndex, 1);
    localStorage.setItem('checkedTodo', JSON.stringify(checkedTodo));

    console.log(checkedIndex);
}

function checkedLocalStorage(todo){
    let checked;

    let todos = JSON.parse(localStorage.getItem('todos'));

    if (localStorage.getItem("checkedTodo") === null){
        checked = [];
    }
    else{
        checked = JSON.parse(localStorage.getItem('checkedTodo'));
    } 
    checked.push(todo);
    console.log(checked);
    localStorage.setItem('checkedTodo', JSON.stringify(checked));
    let todoIndex = todos.indexOf(todo);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getChecked(){
    let checked;

    if (localStorage.getItem("checkedTodo") === null){
        checked = [];
    }
    else{
        checked = JSON.parse(localStorage.getItem('checkedTodo'));
    } 
    checked.forEach(function(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todoDiv');
        todoDiv.classList.add('checkedList');

        const checkedCircle = document.createElement('button');
        checkedCircle.innerHTML='<i class="far fa-circle"></i>';
        checkedCircle.classList.add("checked-btn")
        todoDiv.appendChild(checkedCircle);

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const trashButton = document.createElement('button');
        trashButton.innerHTML= '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn")
        todoDiv.appendChild(trashButton);

        checkedList.appendChild(todoDiv);

        todoInput.value = "";
    })
}