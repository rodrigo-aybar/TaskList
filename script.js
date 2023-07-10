const input = document.getElementById("task-input");
const form = document.getElementById("task-form");
const tasksList = document.getElementById("tasks-list");
const deleteBtn = document.getElementById("clear-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const saveLocalStorage = (taskList) => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
};

// Render
const createTask = (task) => {
    return `
    <li class="card">
        ${task.name}
        <img src="./img/delete.png" alt="boton de borrar" data-id="${task.taskId}">
    </li>
    `;
}

const renderTaskList = (todoList) => {
    tasksList.innerHTML = todoList.map(task => createTask(task)).join('');
}

const hideDeleteAll = (taskList) => {
    if (!taskList.length){
        deleteBtn.classList.add("hidden");
        return
    } else {
        deleteBtn.classList.remove("hidden");
    }
};


const deleteTask = (e) => {
    //if(e.target.classList.contains('card')) return
    const filterId = Number(e.target.dataset.id);
    tasks = tasks.filter(task => task.taskId !== filterId);
    saveLocalStorage(tasks);
    renderTaskList(tasks);
    hideDeleteAll(tasks);
};

const deleteAll = () => {
    tasks = []
    saveLocalStorage(tasks);
    renderTaskList(tasks);
    hideDeleteAll(tasks);
}

const addTask = (e) => {
    e.preventDefault()
    const taskName = input.value.trim();
    if(!taskName.length){
        alert("Agregar un nombre a la Tarea");
        return;
    } else if(tasks.some(task => task.name.toUpperCase() === taskName.toUpperCase())){
        alert("Esta tarea ya existe");
        return;
    }

    tasks = [...tasks, { name: taskName, taskId: tasks.length++}]; 
    input.value = '';

    saveLocalStorage(tasks);
    renderTaskList(tasks);
    hideDeleteAll(tasks);
}

const init = () => {
    renderTaskList(tasks);
    form.addEventListener('submit', addTask);
    deleteBtn.addEventListener('click', deleteAll);
    tasksList.addEventListener('click', deleteTask);
    hideDeleteAll(tasks);
}

init();