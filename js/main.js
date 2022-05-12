import mainArr from "./../api/task.js";
import * as library from "./helper/library.js";

let database = window.localStorage;
let data = JSON.parse(database.getItem("todos"))
  ? JSON.parse(database.getItem("todos"))
  : mainArr;
console.log(data);

let mainList = document.querySelector(".list-group");
let todoText = document.querySelector(".text-todo");
let todoMaker = document.querySelector(".btn-add");

todoMaker.addEventListener("click", () => {
  if (todoText.value.trim().length < 3) {
    alert("Are u sure u want to do this task? Is it a code?");
    return;
  } else if (todoText.value.trim() === "") {
    alert("Don't be a lazy, bruuuh");
    return;
  }

  let newObj = library.objCreator(todoText.value);
  data.push(newObj);

  database.setItem("todos", JSON.stringify(data));

  let newNode = library.creator(newObj.id, newObj.isDone, newObj.text);

  mainList.prepend(newNode);
  todoText.value = "";
});

data.forEach((todo) => {
  let newNode = library.creator(todo.id, todo.isDone, todo.text);
  mainList.prepend(newNode);
});

mainList.addEventListener("click", (event) => {
  let clickedNode = event.target;
  console.log(clickedNode);

  if (!mainList.contains(clickedNode)) return;

  if (!clickedNode.closest("[data-type]")) return;

  switch (clickedNode.dataset.type) {
    case "delete":
      let deleted = clickedNode.parentNode.parentNode;
      //   console.log(deleted);
      data = data.filter((todo) => {
        return todo.id != deleted.dataset.id;
      });
      database.setItem("todos", JSON.stringify(data));
      deleted.remove();
      break;
  }
});
