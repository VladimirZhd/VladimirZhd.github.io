let weatherURL = "./javascript/weather.json";
fetchData(weatherURL);





let pageNav = document.getElementById('nav-section');
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('main-section');

function fetchData(weatherURL){
  let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(weatherURL)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })
  .then(function(data){
    // Check the data object that was retrieved
    console.log(data);
    // data is the full JavaScript object, but we only want the greenville part
    // shorten the variable and focus only on the data we want to reduce typing
    let g = data[cityName];

    // ************ Get the content ******************************

    // Get the location data
    let locName = g.City;
    let locState = g.State;
    // Put them together
    let fullName = locName+', '+locState;
    // See if it worked
    console.log('fullName is: '+fullName);

    // Get the temperature data
    let curTemp = g.Temp;
    let hightTemp = g.High;
    let lowTemp = g.Low; 

    // Get the wind data 
    let getWind = g.Wind;
    let getDirection = g.Direction;
    let getGusts = g.Gusts; 

    // Get the current conditions
    let currentCond = g.Summary;

    // Get location info
    let getLongitude = g.Longitude;
    let getLatitude = g.Latitude; 
    let getMeters = g.Elevation;
    let getZip = g.Zip; 

    // Get the hourly data 
    let hourly = g.Hourly; 
    // ************ Display the content ******************************
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('title');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Greenville, SC | The Weather Site

    // Set the Location information
    // Get the h1 to display the city location
    let contentHeading = document.getElementById('content-heading');
    contentHeading.innerHTML = fullName;
    // The h1 in main h1 should now say "Greenville, SC"

    // Set location on page
    let feet = converMeters(getMeters);
    document.getElementById('elev').innerHTML = feet + " ft.";
    document.getElementById('long').innerHTML = getLongitude;
    document.getElementById('lat').innerHTML = getLatitude;
    document.getElementById('zip').innerHTML = getZip;


    // Set the temperature information
    document.getElementById('temperature').innerHTML = curTemp;
    document.getElementById('high').innerHTML = hightTemp + "&deg;F ";
    document.getElementById('low').innerHTML = " " + lowTemp + "&deg;F";
    buildWC(getWind, curTemp);
 
    // Set the wind information
    document.getElementById('windS').innerHTML = getWind;
    document.getElementById('dir').innerHTML = getDirection;
    document.getElementById('gustsV').innerHTML = getGusts;
     

    // Set the current conditions information
    document.getElementById('cond').innerHTML = currentCond;
    changeSummaryPicture(currentCond);
    

    // Set the hourly temperature information
    let hourlyTemp = document.getElementById('scroll-bar');
    hourlyTemp = buildHourlyData(nextHour, hourly);
    document.getElementById('scroll-bar').innerHTML = hourlyTemp;
    


    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
}