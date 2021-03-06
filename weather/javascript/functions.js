/************************************
 * Weather Site JavaScript Functions
 ************************************/

 console.log("My JavaScript is being read.");

// Calculate the Windchill
function buildWC(speed, temp) {
// const feelTemp = document.getElementById('feelTemp');
   
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);
    // Round the answer down to integer
    wc = Math.floor(wc);
    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;
    // Display the windchill
    console.log(wc);
    // wc = 'Feels like '+wc+'°F';
    return wc;
}
 
 /* Wind Dial function */
 function windDial(direction) {
     const dial = document.getElementById('wind-picture');
     const direct = document.getElementById('dir');

     // Determine the dial class
    switch (direction){
    case "North":
    case "N":
     dial.setAttribute("class", "n"); //"n" is the CSS rule selector
     direct.innerHTML = " N";
     break;
    case "NE":
    case "NNE":
    case "ENE":
     dial.setAttribute("class", "ne");
     direct.innerHTML = " NE";
     break;
    case "NW":
    case "NNW":
    case "WNW":
     dial.setAttribute("class", "nw");
     direct.innerHTML = " NW";
     break;
    case "South":
    case "S":
     dial.setAttribute("class", "s");
     direct.innerHTML = " S";
     break;
    case "SE":
    case "SSE":
    case "ESE":
     dial.setAttribute("class", "se");
     direct.innerHTML = " SE";
     break;
    case "SW":
    case "SSW":
    case "WSW":
     dial.setAttribute("class", "sw");
     direct.innerHTML = " SW";
     break;
    case "East":
    case "E":
     dial.setAttribute("class", "e");
     direct.innerHTML = " E";
     break;
    case "West":
    case "W":
     dial.setAttribute("class", "w");
     direct.innerHTML = " W";
     break;
   }
 }

 //get weather condition
 function getCondition(conditionW)
 {
     let lowerCond = conditionW.toLowerCase();
     //check the condition and return appropriate condition
     if (lowerCond.includes('wet') ||
         lowerCond.includes('rainy') || 
         lowerCond.includes('thunderstorms'))
     {
        return "rain";
     }
     if (lowerCond.includes('cloudy') ||
              lowerCond.includes('overcast') || 
              lowerCond.includes('clouds') ||
              lowerCond.includes('cloud'))
     {
         return "cloud";
     }
     if (lowerCond.includes('clear') ||
              lowerCond.includes('sunny'))
     {
         return "clear";
     }
     if (lowerCond.includes('fog') || 
              lowerCond.includes('foggy'))
     {
         return "fog";
     }
     if (lowerCond.includes('snowy') || 
         lowerCond.includes("blizzard"))
     {
         return "snow";
     }
 }

//Change weather picture
function changeSummaryPicture(weather) {
    let back = document.getElementById('summary');
    // let name = document.getElementById('cond');
    let bigBack = document.getElementById('background');

    switch (weather) {
        case 'rain':
            back.setAttribute('class', 'rain');
            bigBack.setAttribute('class', 'bg-rain');
            break;
        case 'snow':
            back.setAttribute('class', 'snow');
            bigBack.setAttribute('class', 'bg-snow');
            break;
        case 'fog':
            back.setAttribute('class', 'fog');
            bigBack.setAttribute('class', 'bg-fog');
            break;
        case 'cloud':
            back.setAttribute('class', 'cloud');
            bigBack.setAttribute('class', 'bg-cloud');
            break;
        case 'clear':
            back.setAttribute('class', 'clear');
            bigBack.setAttribute('class', 'bg-clear');
            break;
    }
}

//Function to convert meters to feet
function converMeters(meters)
{
    let feet = meters*3.2808;
    console.log(feet);
    feet = Math.round(feet);
    console.log(feet);
    return feet;
}

// Convert, Format time to 12 hour format
function format_time(hour) {
    if(hour > 23){ 
     hour -= 24; 
    } 
    let amPM = (hour > 11) ? "pm" : "am"; 
    if(hour > 12) { 
     hour -= 12; 
    } 
    if(hour == 0) { 
     hour = "12"; 
    } 
    return hour + amPM;
}

// Build the hourly temperature list
function buildHourlyData(nextHour,hourlyTemps) {
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 8 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
     let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F | </li>';
     // Build the remaining list items using a for loop
     for (let i = 1, x = hourlyTemps.length; i < x; i++) {
      hourlyListItems += '<li>' + format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F | </li>';
     }
     console.log('HourlyList is: ' +hourlyListItems);
     return hourlyListItems;
}


// Gets longitude and latitude of current location
function getGeoLocation() {
    const status = document.getElementById('status');
    status.innerHTML = 'Getting Location...';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

          const lat = position.coords.latitude;
          const long = position.coords.longitude;
      
         // Combine the values
         const locale = lat + "," + long;
         console.log(`Lat and Long are: ${locale}.`);

         // Set lon lat to localStorage
         storage.setItem('long', long.toFixed(2));
         storage.setItem('lat', lat.toFixed(2));

         // Call getLocation function, send locale
         getLocation(locale);

        });

       } else {
        status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
       }
} // end getGeoLocation


// Gets location information from the NWS API
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale; 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeaders) 
    .then(function(response){
      if(response.ok){ 
        return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Json object from getLocation function:'); 
      console.log(data);
      // Store data to localstorage 
      storage.setItem("locName", data.properties.relativeLocation.properties.city); 
      storage.setItem("locState", data.properties.relativeLocation.properties.state);
      let gridXValue = data.properties.gridX;
      let gridYValue = data.properties.gridY;
      let cwaValue = data.properties.cwa;
      let gridPoints = cwaValue + '/' + gridXValue + ',' + gridYValue; // concatinate a part of url
      storage.setItem('gridPoints', gridPoints);
      
   
      // Next, get the weather station ID before requesting current conditions 
      // URL for station list is in the data object 
      let stationsURL = data.properties.observationStations; 
      // Call the function to get the list of weather stations
      getStationId(stationsURL); 
     }) 
    .catch(error =>  console.log('There was a getLocation error: ', error)) 
   } // end getLocation function




// Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getStationId function:'); 
      console.log(data);
    
      // Store station ID and elevation (in meters - will need to be converted to feet) 
      let stationId = data.features[0].properties.stationIdentifier; 
      let stationElevation = data.features[0].properties.elevation.value; 
      console.log('Station and Elevation are: ' + stationId, stationElevation); 
   
      // Store data to localstorage 
      storage.setItem("stationId", stationId); 
      storage.setItem("stationElevation", stationElevation); 
   
      // Request the Current Weather for this station 
      getWeather(stationId);
     }) 
    .catch(error => console.log('There was a getStationId error: ', error)) 
   } // end getStationId function

   
   
// Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeaders) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getWeather function:'); 
      console.log(data);
    
      // Store weather information to localStorage 
      storage.setItem("temperature", data.properties.temperature.value);
    //   storage.setItem("maxTemperature", data.properties.maxTemperatureLast24Hours.value);
    //   storage.setItem("minTemperature", data.properties.minTemperatureLast24Hours.value);
      storage.setItem("summary", data.properties.textDescription);
      storage.setItem("feelsLike", data.properties.heatIndex.value);
      storage.setItem("windDirection", data.properties.windDirection.value);
    //   storage.setItem("gusts", data.properties.windGust.value);
      storage.setItem("windSpeed", data.properties.windSpeed.value);
    
   
      // Build the page for viewing 
      buildPage();
     }) 
    .catch(error => console.log('There was a getWeather error: ', error)) 
   } // end getWeather function


// gets hourly forcast from local storage
function getHourly(nextHour) {
    let gridPoints = storage.getItem('gridPoints');
    // This is URl for hourly forcast
    const URL = 'https://api.weather.gov/gridpoints/' + gridPoints + '/forecast/hourly';
    fetch(URL, idHeaders)
    .then(function(response){
        if(response.ok){ 
         return response.json(); 
        } 
        throw new ERROR('Response not OK.');
      })
    .then(function (data) { 
        // Let's see what we got back
        console.log('From getHourly function:'); 
        console.log(data);
        let hours = [];


        // get data to local storage
        for (let i = 0; i < 13; i++) {
            // hours.push(data.properties.periods[i].temperature);
            hours[i] = data.properties.periods[i].temperature;
        }
        storage.setItem('hourly', hours);
        console.log(hours);
        let hourlyTemp = document.getElementById('scroll-bar');
        hourlyTemp = buildHourlyData(nextHour, hours);
        document.getElementById('scroll-bar').innerHTML = hourlyTemp;



    }) 
    .catch(error => console.log('There was a getWeather error: ', error)) 

}

function getForcast() {

    let gridPoints = storage.getItem('gridPoints');
    const URL = 'https://api.weather.gov/gridpoints/' + gridPoints + '/forecast'

    fetch(URL, idHeaders)
    .then(function (response){
        if (response.ok) {
           return response.json();
        }
        throw new ERROR('Response not OK.');

        })
        .then(function(data) {

        console.log('getForcast data: ', data);
        let thisAfternoon = data.properties.periods[0].isDaytime;
        let tonight = data.properties.periods[1].isDaytime;

        console.log(thisAfternoon, tonight);

        if (thisAfternoon == true) {
            storage.setItem('maxTemp', data.properties.periods[0].temperature);
        }else{
            storage.setItem('minTemp', data.properties.periods[0].temperature);
        }
        if (tonight != true) {
            storage.setItem('minTemp', data.properties.periods[1].temperature);
        }else{
            storage.setItem('maxTemp', data.properties.periods[1].temperature);
        }
        
        storage.setItem('gusts', data.properties.periods[0].windSpeed);    

        })

        .catch(error => console.log('There was a getWeather error: ', error)) 

}



// function build the page
function buildPage() {
    // Getting all data from local storage
    let locName = storage.getItem('locName'),
    locState = storage.getItem('locState'),
    locLong = storage.getItem('long'),
    locLat = storage.getItem('lat'),
    locWindSpeed = storage.getItem('windSpeed'),
    locGusts = storage.getItem('gusts'),
    locElev = storage.getItem('stationElevation'),
    locTemp = storage.getItem('temperature'),
    locMaxTemp = storage.getItem('maxTemp'),
    locMinTemp = storage.getItem('minTemp'),
    locSummary = storage.getItem('summary'),
    // locFeelsLike = storage.getItem('feelslike'),
    locWindDirect = storage.getItem('windDirection');

    // variables for hiding the page
    let pageNav = document.getElementById('nav-section');
    let statusContainer = document.getElementById('status');
    let contentContainer = document.getElementById('main-section');

    // getting a word for summary
    let weatherWord = getCondition(locSummary);
    console.log(weatherWord);
    // change summary picture
    changeSummaryPicture(weatherWord);
    // convert meters to feet
    let feet = converMeters(locElev);
    // convert degrees to a letter for direction 
    let winDirLetter = getWindDerectionLetter(locWindDirect);
    // show wind direction on the picture
    windDial(winDirLetter);
    console.log('Wind direction letter: ', winDirLetter);
    // convert celcius to fahrenheit for temperature
    let tempFahr = convertToFahrenheit(locTemp);
    console.log('Temperature in fahrenheits: ', tempFahr);

    // convert celcius to fahrenheit for max temperature
    // let maxTempFahr = convertToFahrenheit(locMaxTemp);
    // convert celcius to fahrenheit for min temperature
    // let minTempFahr = convertToFahrenheit(locMinTemp);

    // build wind chill 
    let feelsLike = buildWC(locWindSpeed, tempFahr);
    console.log('feels like temp: ', feelsLike);
    // concatinate website full name
    let siteName = locName + ', ' + locState;

    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('title');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(siteName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    

    // Set the Location information
    // Get the h1 to display the city location
    document.getElementById('content-heading').innerHTML = siteName;
    
    // set location information 
    document.getElementById('elev').innerHTML = feet + ' ft.'; 
    document.getElementById('long').innerHTML = locLong + '&deg;'; 
    document.getElementById('lat').innerHTML = locLat + '&deg;';

    // set temperature on the page
    getForcast();
    document.getElementById('temperature').innerHTML = tempFahr;
    document.getElementById('high').innerHTML = locMaxTemp + '&deg;F &nbsp;';
    document.getElementById('low').innerHTML = locMinTemp + '&deg;F';
    document.getElementById('feelTemp').innerHTML = feelsLike;

    // set wind information
    document.getElementById('windS').innerHTML = locWindSpeed;
    document.getElementById('dir').innerHTML = winDirLetter;
    document.getElementById('gustsV').innerHTML = locGusts;

    // set summary name
    document.getElementById('cond').innerHTML = locSummary; 


    // set visability
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container

}
// This function converts degrees to a letter 
function getWindDerectionLetter(degree) {

    if (degree == 0 || degree == 360 || (degree <= 360 && degree > 337)) {
        return 'N';
    }else if (degree <= 22 && degree > 0) {
        return 'NNE';
    }else if (degree <= 45 && degree > 22) {
        return 'NE';
    }else if (degree <= 67 && degree > 45) {
        return 'ENE';
    }else if (degree <= 90 && degree > 67) {
        return 'E';
    }else if (degree <= 112 && degree > 90) {
        return 'ESE';
    }else if (degree <= 135 && degree > 112) {
        return 'SE';
    }else if (degree <= 157 && degree > 135) {
        return 'SSE';
    }else if (degree <= 180 && degree > 157) {
        return 'S';
    }else if (degree <= 202 && degree > 180) {
        return 'SSW';
    }else if (degree <= 225 && degree > 202) {
        return 'SW';
    }else if (degree <= 247 && degree > 225) {
        return 'WSW';
    }else if (degree <= 270 && degree > 247) {
        return 'W';
    }else if (degree <= 292 && degree > 270) {
        return 'WNW';
    }else if (degree <= 315 && degree > 292) {
        return 'NW';
    }else if (degree <= 337 && degree > 337) {
        return 'NNW';
    }
}

// This function converts celsius to fahrenheits
function convertToFahrenheit(celsius) {
    let fahr = Math.round((celsius * (9/5)) + 32);
    return fahr;
}




//Variables for function use
let date = new Date();
let nextHour = date.getHours() + 1;
console.log(nextHour);

// var idHeaders = {
//     headers: {
//         "User-Agent": "Student Learning Project - zhd18001@byui.edu"
//          Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0
//     }
//   };

// var idHeader = new Headers({
//     "User-Agent" : "Student Learning Project - zhd18001@byui.edu"
//     });

var idHeaders = null;

var storage = window.localStorage;


// Calling wind direction function
//windDial(direction);
getHourly(nextHour);