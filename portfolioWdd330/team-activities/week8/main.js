const url = 'https://swapi.dev/api/people';

const convertToJson = res => {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
};

const getData = async url => {
  const data = await fetch(url).then(convertToJson);
  if (data.next) {
    document.getElementById('next').setAttribute('data-url', data.next);
  }
  if (data.previous) {
    document.getElementById('prev').setAttribute('data-url', data.previous);
  }
  displayData(data.results);
};

const showDetails = details => {
  const name = details.name;
  const birth = details.birth_year;
  const height = details.height;
  const starships = details.starships;
  const vehicles = details.vehicles;

  let starshipsData = [];

  starships.forEach(async item => {
    const starshipData = await fetch(item).then(convertToJson);
    starshipsData.push({ name: starshipData.name });
  });
  console.log(starshipsData);
  console.log(typeof starshipsData);
  const startshipString = starshipsData.map(item => {
    console.log('Im here');
    return item.name;
  });

  const detailsDiv = document.getElementById('detailsDiv');
  const detailsHTML = `<ul>
      <li>${name}</li>
      <li>${birth}</li>
      <li>${height}</li>
      <li>${startshipString.join('')}</li>
      <li></li>
    </ul>`;
  detailsDiv.innerHTML = detailsHTML;
};

const displayData = list => {
  const listElement = document.getElementById('listElement');
  const newArray = list.map(item => {
    return `<li data-url='${item.url}'>${item.name}</li>`;
  });
  listElement.innerHTML = newArray.join('');
};

const itemClicked = async event => {
  const data = await fetch(event.target.dataset.url).then(convertToJson);
  console.log(data);
  showDetails(data);
};

document.getElementById('listElement').addEventListener('click', itemClicked);

const buttons = document.getElementsByTagName('button');
Array.from(buttons).forEach(item => {
  item.addEventListener('click', event => {
    getData(event.target.dataset.url);
  });
});

getData('https://swapi.dev/api/people');
