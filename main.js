// Elementos del DOM
const taskInput = document.getElementById('newTask');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

// Cargar las tareas almacenadas en localStorage al inicio
document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromLocalStorage();
});

// Manejador para agregar una nueva tarea
addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        addTaskToList(task);
        saveTaskToLocalStorage(task);
        taskInput.value = '';
    }
});

// Manejador para marcar una tarea como completada
taskList.addEventListener('click', (event) => {
    const targetElement = event.target;
    if (targetElement.classList.contains('task-text')) {
        const taskId = parseInt(targetElement.parentElement.dataset.taskId);
        toggleTaskCompleted(taskId);
    }
});

// Manejador para eliminar una tarea
taskList.addEventListener('click', (event) => {
    const targetElement = event.target;
    if (targetElement.classList.contains('delete-button')) {
        const taskId = parseInt(targetElement.parentElement.dataset.taskId);
        deleteTask(taskId);
    }
});

// Función para agregar una tarea a la lista
function addTaskToList(task) {
    const li = document.createElement('li');
    li.dataset.taskId = task.id;

    const taskTextElement = document.createElement('span');
    taskTextElement.classList.add('task-text');
    taskTextElement.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Eliminar';

    li.appendChild(taskTextElement);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Función para marcar una tarea como completada
function toggleTaskCompleted(taskId) {
    const taskElement = taskList.querySelector(`li[data-task-id="${taskId}"]`);
    if (taskElement) {
        const taskTextElement = taskElement.querySelector('.task-text');
        const taskCompleted = taskElement.classList.toggle('completed');
        const task = {
            id: taskId,
            text: taskTextElement.textContent,
            completed: taskCompleted
        };
        updateTaskInLocalStorage(task);
    }
}

// Función para eliminar una tarea
function deleteTask(taskId) {
    const taskElement = taskList.querySelector(`li[data-task-id="${taskId}"]`);
    if (taskElement) {
        taskElement.remove();
        deleteTaskFromLocalStorage(taskId);
    }
}

// Funciones para manejar el almacenamiento en localStorage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToList(task));
}

function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskInLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
        tasks[index] = task;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function deleteTaskFromLocalStorage(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}
const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

// Definir ruta estática para los archivos HTML, CSS y JS
app.use(express.static(path.join(__dirname, 'public')));

// Iniciar el servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
