/* 

add a new todo
remove or delete task
mark as complete task
sort tasks
filter task
complete by date

retrieve todo's from the data store
save todo's to the data store
remove from the data store

display the todo list
  get list element 
  retrieve todo's from the data store
  for each todo build out html
  add todo to list

*/

import { qs, saveToLS } from './utilities.js';

const todos = [];

const saveTodos = (key, data) => {
  saveToLS(key, data);
};

class Todo {
  constructor(parentId, key) {
    this.listElement = qs(parentId);
    this.key = key;
  }

  addNewTodo(text) {
    const newTodo = {
      id: new Date(),
      text: text,
      completed: false,
    };
    todos.push(newTodo);
    saveTodos(this.key, newTodo);
  }

  completeTodo(todo) {}

  listTodos() {}
}
export default Todo;
