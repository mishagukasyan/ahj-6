import { saveTasks } from "./local_storage.js";

document.addEventListener("DOMContentLoaded", () => {
  let actualElement;
  let shiftX, shiftY;
  const container = document.querySelector(".main-container");

  function createPlaceholder() {
    const plaseEl = document.createElement("div");
    plaseEl.classList.add("placeholder");
    plaseEl.style.width = actualElement.offsetWidth + "px";
    plaseEl.style.height = actualElement.offsetHeight + "px";
    return plaseEl;
  }

  function removePlaceholder() {
    const plaseEl = document.querySelector(".placeholder");
    if (!plaseEl) return;
    plaseEl.remove();
  }

  function mouseDown(e) {
    e.preventDefault();
    actualElement = e.target.closest(".task");
    if (!actualElement) {
      return;
    }

    const { left, top } = actualElement.getBoundingClientRect();
    shiftX = e.clientX - left;
    shiftY = e.clientY - top;

    actualElement.classList.add("dragged");
    actualElement.style.cursor = "grab";

    container.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mouseover", onMouseOver);
  }

  container.addEventListener("mousedown", mouseDown);

  function onMouseOver(e) {
    actualElement.style.top = e.clientY - shiftY + "px";
    actualElement.style.left = e.clientX - shiftX + "px";
    removePlaceholder();
    const plaseEl = createPlaceholder();
    const mouseOverItem = e.target;
    const closestTask = mouseOverItem.closest(".task");
    if (!closestTask) {
      const closestTasksContainer = mouseOverItem.querySelector(".tasks");
      if (!closestTasksContainer) return;
      closestTasksContainer.appendChild(plaseEl);
    } else {
      const parentElement = closestTask.closest(".tasks");
      parentElement.insertBefore(plaseEl, closestTask);
    }
  }

  function onMouseUp(e) {
    console.log(e);
    const mouseUpItem = e.target;
    const closestTask = mouseUpItem.closest(".task");

    if (!closestTask) {
      const closestTasksContainer = mouseUpItem.querySelector(".tasks");
      if (!closestTasksContainer) return;
      closestTasksContainer.appendChild(actualElement);
    } else {
      const parentElement = closestTask.closest(".tasks");
      parentElement.insertBefore(actualElement, closestTask);
    }

    actualElement.classList.remove("dragged");
    actualElement = undefined;
    removePlaceholder();

    container.removeEventListener("mouseup", onMouseUp);
    container.removeEventListener("mouseover", onMouseOver);

    saveTasks();
  }
});
