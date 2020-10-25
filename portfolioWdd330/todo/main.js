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
import { qs, getFromLS, saveToLS, setClick, showList } from './modules/utilities.js';
import Todo from './modules/todo.js';

const myTodo = new Todo('.todo-list', 'todos');
const list = qs('.todo-list');
const todoArray = JSON.parse(getFromLS('todos'));

if (todoArray) {
  showList(todoArray, list);
}

setClick('.btn', async () => {
  const text = qs('.add-todo');
  await myTodo.addNewTodo(text.value);
  const updatedArray = JSON.parse(getFromLS('todos'));
  list.innerHtml = '';
  showList(updatedArray, list);
});
