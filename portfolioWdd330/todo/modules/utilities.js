//get list element
export const qs = selector => document.querySelector(selector);

//retrieve todo's from the data store
export const getFromLS = (key, data) => {};
//save todo's to the data store
export const saveToLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
//set listener
