import { TodoItem, TodoList } from "./todoList.js";

const todoList = TodoList.getInstance();

export const LocalStorage = {
  load() {
    if (localStorage.getItem("todos")) {
      //parse convierte texto JSON en objetos
      //en este caso, un array de objetos. Los objetos que devuelve NO son TodoItem
      /*
      localStorage devuelve algo como:

      '[{"text":"Comprar pan"},{"text":"Estudiar"}]'

      Luego parse() lo convierte en:

      [
        { text: "Comprar pan" },
        { text: "Estudiar" }
      ]
      */
      for (let item of JSON.parse(localStorage.getItem("todos"))) {
        todoList.add(new TodoItem(item.text));
      }
    }
  },
  save() {
    const array = Array.from(todoList.items);
    //stringify convierte objeto a texto JSON
    localStorage.setItem("todos", JSON.stringify(array));
  },
};

todoList.addObserver(LocalStorage.save);