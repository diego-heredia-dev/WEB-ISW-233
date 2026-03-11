import { TodoItem, TodoList } from "./todoList.js";
import { TodoHistory } from "./memento.js";

export class Command {
  name;
  args;
  constructor(name, args) {
    this.name = name;
    this.args = args;
  }
}

export const Commands = {
  ADD: "add",
  DELETE: "delete",
  UNDO: "undo"
};

export const CommandExecutor = {
  execute(command) {
    const todoList = TodoList.getInstance();
    switch (command.name) {
      case Commands.ADD:
        const todoInput = DOM.todoInput;
        const todoText = todoInput.value.trim();

        if (todoText !== "") {
          todoList.add(new TodoItem(todoText));
          todoInput.value = "";
        }
        break;
      case Commands.DELETE:
        //"Toma el primer elemento del array command.args y guárdalo en la variable textTodo."
        const [textTodo] = command.args;
        todoList.delete(command.args);
        break;
      case Commands.UNDO:
        const goBack = TodoHistory.pop();
        todoList.replaceList(goBack);
    }
  },
};
