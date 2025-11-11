const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'tasks.json');


function loadTasks() {
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath);
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

let tasks = loadTasks();
let idCounter = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

function getAllTasks() {
  return tasks;
}

function addTask(title) {
  const task = { id: idCounter++, title, completed: false };
  tasks.push(task);
  saveTasks(tasks);
  return task;
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks(tasks);
  }
  return task;
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);
}

function getTaskById(id) {
  return tasks.find(t => t.id === id);
}

module.exports = {
  getAllTasks,
  addTask,
  toggleTask,
  deleteTask,
  getTaskById
};
