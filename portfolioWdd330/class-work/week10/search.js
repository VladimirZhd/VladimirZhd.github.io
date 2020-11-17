/* 
  When user types ini input bar:
    get what they type
    make a call ti a search api sending query 
    when the result comes back
      foreach result generate html and add to our list
*/

import { foodKey } from './keys.js';

const baseUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=`;

const convertToJson = res => {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
};

const getSearchResults = async query => {
  const data = await fetch(`${baseUrl}${foodKey}&query=${query}`).then(convertToJson);
  return data;
};

const renderSearchResults = results => {
  const list = document.getElementById('listElement');
  const listElements = results
    .map(result => {
      return `
      <li>${result.description}</li>
    `;
    })
    .join('');
  list.innerHTML = listElements;
};

export const search = async event => {
  const query = event.target.value;
  if (query.length > 2) {
    const results = await getSearchResults(query);
    renderSearchResults(results.foods);
  }
};
