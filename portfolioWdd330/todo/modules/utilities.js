//get list element
export const qs = selector => document.querySelector(selector);

//retrieve todo's from the data store
export const getFromLS = key => {
  return localStorage.getItem(key);
};
//save todo's to the data store
export const saveToLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

//set listener
export const setClick = (selector, callback) => {
  qs(selector).addEventListener('touchend', event => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
};

//display todos
export const showList = (arr, list) => {
  arr.forEach(element => {
    const li = document.createElement('li');
    li.innerHTML = element.text;
    list.appendChild(li);
  });
};
