import { CommandExecutor, Command, Commands } from "./services/command.js";
import { TodoList } from "./services/todoList.js";

globalThis.DOM = {};

const DOM = globalThis.DOM;

document.addEventListener("DOMContentLoaded", () => {
  DOM.todoList = document.getElementById("todo-list");
  DOM.addBtn = document.getElementById("add-btn");
  DOM.todoInput = document.getElementById("todo-input");

  const todoList = TodoList.getInstance();
  todoList.addObserver(render);

  DOM.addBtn.addEventListener("click", () => {
    //En JavaScript, si no pasas un argumento, su valor es undefined.
    const cmd = new Command(Commands.ADD);
    CommandExecutor.execute(cmd);
  });

  DOM.todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
    }
  });
});

function render() {
  const todoList = TodoList.getInstance();
  const template = document.getElementById("todo-template");

  //limpiar lista
  /*
  Por que cada vez que se llama a render, se carga todo lo que esta en #data
  a todo-list, es por eso que debemos limpiar todo-list antes de cargar un nuevo li
  para no tener duplicados
  */
  DOM.todoList.innerHTML = "";

  todoList.items.forEach((item) => {
    //OBTENEMOS UNA COPIA DEL PRIMER HIJO DE TODO-TEMPLATE
    //que en este caso seria todo-item
    //Si no estuviera todo-item, no usar firstElementChild
    //de lo contrario me devolveria solo todo-text
    const element = template.content.cloneNode(true).firstElementChild;

    //simplemente insertar texto en todo-text
    element.querySelector(".todo-text").textContent = item.text
    
    DOM.todoList.appendChild(element);
  });
}