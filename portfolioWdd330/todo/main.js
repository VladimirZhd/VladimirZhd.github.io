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
import { qs, getFromLS, saveToLS } from './modules/utilities.js';
import Todo from './modules/todo.js';

const btn = qs('.btn');

btn.addEventListener('click', event => {
  const text = qs('.add-todo');
  console.log(text.value);
  const myTodo = new Todo('.todo-list', 'todoItem');

  console.log(text.value);

  myTodo.addNewTodo(text.value);
});
