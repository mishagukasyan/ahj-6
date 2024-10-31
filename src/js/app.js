import { saveTasks, loadTasks } from "./local_storage.js";

export function createTask(textContent) {
  const task = document.createElement("div");
  task.classList.add("task");
  const text = document.createElement("span");
  text.classList.add("text");
  text.textContent = textContent;

  const removeButn = document.createElement("button");
  removeButn.classList.add("close");
  const cross = document.createElement("span");
  cross.classList.add("cross");
  cross.textContent = "×";

  removeButn.appendChild(cross);
  task.appendChild(text);
  task.appendChild(removeButn);
  removeButn.addEventListener("click", deleteTask);
  removeButn.addEventListener("mousedown", (event) => {
    event.stopPropagation();
  });

  return task;
}

function deleteTask(event) {
  event.preventDefault();
  const el = event.currentTarget;
  const parent = el.closest(".task");
  parent.remove();
  saveTasks();
}

document.addEventListener("DOMContentLoaded", () => {
  const btns = document.querySelectorAll(".adding");
  const toDo = document.querySelector(".todo");
  const inProcess = document.querySelector(".progress");
  const done = document.querySelector(".done");

  function createTextField(event) {
    const el = event.currentTarget;
    const parent = el.closest(".container");

    const currentForm = document.querySelector(".formWrapper");
    if (currentForm) {
      currentForm.remove();
    }

    const formContainer = document.createElement("div");
    formContainer.classList.add("formWrapper");
    const form = document.createElement("form");
    form.classList.add("myForm");

    const field = document.createElement("textarea");
    field.classList.add("text_field");
    field.placeholder = "enter a title for this card ...";
    field.addEventListener("mousedown", (event) => {
      event.stopPropagation();
    });

    const createBtn = document.createElement("button");
    createBtn.classList.add("formBtn", "create");
    createBtn.textContent = "Add Card";

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("cross", "close_form");
    closeBtn.textContent = "\u2715";

    form.appendChild(field);
    form.appendChild(createBtn);
    form.appendChild(closeBtn);
    formContainer.appendChild(form);

    if (parent.querySelector(".todo")) {
      createBtn.classList.add("toDoColumn");
      toDo.appendChild(formContainer);
    } else if (parent.querySelector(".progress")) {
      createBtn.classList.add("processColumn");
      inProcess.appendChild(formContainer);
    } else if (parent.querySelector(".done")) {
      createBtn.classList.add("doneColumn");
      done.appendChild(formContainer);
    }

    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      formContainer.remove();
    });

    createBtn.addEventListener("click", addNewTask);
  }

  btns.forEach((btn) => {
    btn.addEventListener("click", createTextField);
  });

  function addNewTask(event) {
    event.preventDefault();
    const el = event.currentTarget;
    const formContainer = document.querySelector(".formWrapper");
    const field = document.querySelector(".text_field");
    if (field.value.trim() === "") {
      return;
    }
    const task = createTask(field.value);

    if (el.classList.contains("toDoColumn")) {
      toDo.appendChild(task);
    } else if (el.classList.contains("processColumn")) {
      inProcess.appendChild(task);
    } else if (el.classList.contains("doneColumn")) {
      done.appendChild(task);
    }
    formContainer.remove();
    saveTasks();
  }

  loadTasks(toDo, inProcess, done);
});
