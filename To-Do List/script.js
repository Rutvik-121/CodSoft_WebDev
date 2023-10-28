const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const totalTasksElement = document.getElementById("totalTasks");
const completedTasksElement = document.getElementById("completedTasks");

function updateTaskStats() {
    const totalTasks = taskList.children.length;
    totalTasksElement.innerText = totalTasks;

    const completedTasks = [...taskList.children].filter(li => li.querySelector("input").checked).length;
    completedTasksElement.innerText = completedTasks;
}

taskInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value;
    if (taskText === "") return;

    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", toggleTaskCompletion);

    const taskTextElement = document.createElement("span");
    taskTextElement.innerText = taskText;

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", editTask);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", deleteTask);

    li.appendChild(checkbox);
    li.appendChild(taskTextElement);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    taskInput.value = "";

    // Update task stats
    updateTaskStats();
}

function toggleTaskCompletion(event) {
    const taskTextElement = event.target.nextElementSibling;
    taskTextElement.classList.toggle("completed");

    if (event.target.checked) {
        taskTextElement.style.textDecoration = "line-through";
    } else {
        taskTextElement.style.textDecoration = "none";
    }

    // Update task stats
    updateTaskStats();
}

function deleteTask(event) {
    const li = event.target.parentElement;
    taskList.removeChild(li);

    // Update task stats
    updateTaskStats();
}

function editTask(event) {
    const li = event.target.parentElement;
    const taskTextElement = li.querySelector("span");
    const editButton = li.querySelector("button");
    const newTaskText = prompt("Edit task:", taskTextElement.innerText);

    if (newTaskText !== null && newTaskText !== "") {
        taskTextElement.innerText = newTaskText;
    }

    // Update task stats
    updateTaskStats();
}
