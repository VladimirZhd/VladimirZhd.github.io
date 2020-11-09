const url = 'https://api.eslgaming.com/play/v1/leagues';

const convertToJson = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
}


const getData = async (url) => {
  let data = await fetch(url).then(convertToJson);
  const csgoArray = [];
  for (let key in data) {
    if (data[key]['gameId'] === 6220 && data[key]['state'] === 'inProgress' && data[key]['state'] === 'pro_qualifier') {
      csgoArray.push(data[key]);
    }

  }
  console.log(csgoArray);
}

getData(url); 