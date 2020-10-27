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

import { qs, saveToLS, getFromLS } from './utilities.js';

const todos = [];

const saveTodos = key => {
  saveToLS(key, todos);
};

class Todo {
  constructor(parentId, key) {
    this.listElement = qs(parentId);
    this.key = key;
    this.listTodos();
  }

  addNewTodo(text) {
    const newTodo = {
      id: new Date(),
      text: text,
      completed: false,
    };
    todos.push(newTodo);
    saveTodos(this.key);
    console.log(todos);
  }

  completeTodo(todo) {}

  listTodos() {
    let li = document.createElement('li');
    todos.forEach(item => {
      li.id = item.id;
      li.innerText = item.text;
      this.listElement.appendChild(li);
    });
  }
}
export default Todo;
