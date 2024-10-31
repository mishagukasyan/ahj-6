import { createTask } from "./app.js";

export function saveTasks() {
  const tasks = {
    todo: getTasks(".todo"),
    progress: getTasks(".progress"),
    done: getTasks(".done"),
  };
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks(selector) {
  const tasks = [];
  document.querySelectorAll(`${selector} .task .text`).forEach((task) => {
    tasks.push(task.textContent);
  });
  return tasks;
}

export function loadTasks(toDo, inProcess, done) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    return;
  }

  tasks.todo.forEach((task) => {
    addTaskToColumn(task, toDo);
  });
  tasks.progress.forEach((task) => {
    addTaskToColumn(task, inProcess);
  });
  tasks.done.forEach((task) => {
    addTaskToColumn(task, done);
  });
}

function addTaskToColumn(taskContent, column) {
  const task = createTask(taskContent);
  column.appendChild(task);
}
