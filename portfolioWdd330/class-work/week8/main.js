const url = 'https://pokeapi.co/api/v2/type/3';

let pokemon = [];

const convertToJson = res => {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
};

// const getPokemon = url => {
//   fetch(url)
//     .then(convertToJson)
//     .then(data => {
//       pokemon = data.pokemon;
//     });
// };

const getPokemonAsync = async url => {
  const data = await fetch(url).then(convertToJson);
  pokemon = data.pokemon;
  displayPokemon(pokemon);
};

const displayPokemon = list => {
  const listElement = document.getElementById('listElement');
  const newArray = list.map(item => {
    return `<li data-url='${item.pokemon.url}'>${item.pokemon.name}</li>`;
  });
  listElement.innerHTML = newArray.join('');
};

const pokemonClicked = async event => {
  console.log(event.target.dataset.url);
  const details = await fetch(event.target.dataset.url).then(convertToJson);
  console.log(details);
};

document.getElementById('listElement').addEventListener('click', pokemonClicked);
getPokemonAsync(url);
