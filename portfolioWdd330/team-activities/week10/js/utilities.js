export const convertToJson = res => {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
};

export const getJson = async url => {
  try {
    const data = await fetch(url).then(convertToJson);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getLocation = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};
