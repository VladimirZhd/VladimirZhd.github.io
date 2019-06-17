/************************************
 * Weather Site JavaScript Functions
 ************************************/

 console.log("My JavaScript is being read.");

// Calculate the Windchill
function buildWC(speed, temp) {
    const feelTemp = document.getElementById('feelTemp');
   
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
    feelTemp.innerHTML = wc;
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
     //check the condition and return appropriate condition
     if (conditionW.includes('wet') ||
         conditionW.includes('rainy'))
     {
        return "rain";
     }
     else if (conditionW.includes('cloudy') ||
              conditionW.includes('overcast'))
     {
         return "clouds";
     }
     else if (conditionW.includes('clear') ||
              conditionW.includes('sunny'))
     {
         return "clear";
     }
     else if (conditionW.includes('foggy'))
     {
         return "fog";
     }
     else (conditionW.includes('snowy') || conditionW.includes("blizzard"))
     {
         return "snow";
     }
 }

//Change weather picture
function changeSummaryPicture(weather) {
    let back = document.getElementById('summary');
    let name = document.getElementById('cond');
    let bigBack = document.getElementById('background');

    switch (weather) {
        case 'rain':
            back.setAttribute('class', 'rain');
            bigBack.setAttribute('class', 'bg-rain');
            name.innerHTML = "Rain";
            break;
        case 'snow':
            back.setAttribute('class', 'snow');
            bigBack.setAttribute('class', 'bg-snow');
            name.innerHTML = "Snow";
            break;
        case 'fog':
            back.setAttribute('class', 'fog');
            bigBack.setAttribute('class', 'bg-fog');
            name.innerHTML = "Fog";
            break;
        case 'cloud':
            back.setAttribute('class', 'cloud');
            bigBack.setAttribute('class', 'bg-cloud');
            name.innerHTML = "Cloudy";
            break;
        case 'clear':
            back.setAttribute('class', 'clear');
            bigBack.setAttribute('class', 'bg-clear');
            name.innerHTML = "Clear";
            break;
    }
}

//Function to convert meters to feet
function converMeters(meters)
{
    let feet = meters*3.2808;
    console.log(feet);
    feet = Math.floor(feet);
    console.log(feet);
    return feet;
}

 //Variables for function use
 const temp = 31;
 const speed = 5;
 const direction = 'W';
 let condition = "Blizzard";

 //getting elements from HTML
 let weather = getCondition(condition);
 console.log(weather);
 let meters = document.getElementById('elev').innerHTML;
 let feet = converMeters(meters);
 meters = document.getElementById('elev').innerHTML = feet + ' ft. ';

//Calling functions
 changeSummaryPicture(weather);
 buildWC(speed, temp);
 windDial(direction);