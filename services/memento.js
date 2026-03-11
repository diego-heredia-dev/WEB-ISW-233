import { TodoList } from "./todoList.js";

export const TodoHistory = {
    history: [],

    push(state) {
        if (state) {
            //debemos convertir cada state en un new Set para que sean objetos diferentes y no referencias de uno del otro
            //new Set convierte state en nuevo Set, evitando dar referencia al mismo state/set
            this.history.push(new Set([...state]));
        }
    },

    pop() {
        if (this.history.length > 1) {
            //imagina que nuestro historial es esto: [s1, s2, s3], nosotros estamos en s3
            //si queremos volver a s2, primero debemos quitar s3 => history.pop()
            //y despues devolver s2 => return history.pop()
            this.history.pop();
            return this.history.pop();
        }
    },
};

//Basicamente agrega la funcion lambda a observer, la cual es llamda cada vez que se elimina o agrega un nuevo item
//atra vez de la funcion notify() que se llama al final de las funciones add() y delete() de TodoList
TodoList.getInstance().addObserver(() => {
    TodoHistory.push(TodoList.getInstance().items);
});