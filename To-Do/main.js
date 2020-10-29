const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

function addTodo(event)
{
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value);

    const complete = document.createElement("button");
    complete.innerHTML = '<i class="fas fa-check"></i>';
    complete.classList.add("complete-button");
    todoDiv.appendChild(complete);

    const trash = document.createElement("button");
    trash.innerHTML = '<i class="fas fa-trash"></i>';
    trash.classList.add("trash-button");
    todoDiv.appendChild(trash);

    todoList.appendChild(todoDiv);

    localStorage.setItem("task", newTodo.innerText);

    todoInput.value = ""
}

function deleteCheck(e)
{
    const item = e.target;
    if (item.classList[0] === "trash-button")
    {
       const todo = item.parentElement;
       todo.classList.add("fall");
       removeLocalTodos(todo);
       todo.addEventListener("transitionend", function(){
           todo.remove();
       })     
    }

    if (item.classList[0] === "complete-button")
    {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function saveLocalTodos(todo)
{
    let todos;
    if(localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos()
{
    if(localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const complete = document.createElement("button");
        complete.innerHTML = '<i class="fas fa-check"></i>';
        complete.classList.add("complete-button");
        todoDiv.appendChild(complete);

        const trash = document.createElement("button");
        trash.innerHTML = '<i class="fas fa-trash"></i>';
        trash.classList.add("trash-button");
        todoDiv.appendChild(trash);

        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo)
{
    let todos;
    if(localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}