/* import all of the libraries from esri that we need to use */
import Map from "esri/Map";
import MapView from "esri/views/MapView";
import Locate from "esri/widgets/Locate";
import Search from "esri/widgets/Search";
import Basemap from "esri/Basemap";
import VectorTileLayer from "esri/layers/VectorTileLayer";
import dom from "dojo/dom";

/* create a basemap using a community map with trees*/
let basemap = new Basemap({
    baseLayers: [
        new VectorTileLayer({
            portalItem: {
                id: "6b139d5d51124071961da673229b2aaa" // Forest and Parks Canvas
            }
        })
    ],
    title: "Community Basemap",
    id: "communityBasemap"
});

/* Creating a map with our tree basemap*/
var map = new Map({
    basemap: basemap
});

/* Creating a view centered on BYUI campus*/
var view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 15,
    center: [-111.784, 43.818],
});

/* Create the locator widget with scaling on locating*/
let locate = new Locate({
    view: view,
    scale: 900
});


let floorsWidget = document.getElementById("floorLayers"); //Get floor buttons container 

let device = isMobileDevice();  //calling function to identify the device

view.ui.add(floorsWidget, "bottom-right"); //inserting floor buttons to an esri container on the page
view.ui.move('zoom', "bottom-right"); //move zoome widget to bottom right corner
/* if the screen size is less than 768px we insert locator widget to bottom right corner */
if (screen.width < 768) {
    view.ui.add(locate, "bottom-right");
} 
/* if it is a mobile device we but with bigger screen resolution we still want to add the widget
   in case they will use an iPad the in landscape mode or an iPad pro*/
if (device == true) {
    view.ui.add(locate, "bottom-right");
}

/* Create a search widget*/
let search = new Search({
    view: view,
    id: "searchWidget"
});

/* Insert the search widget to the top right of the page*/
view.ui.add(search, "top-right");
/* For the bigger screens we want to move the search widget to  */
if (screen.width > 767) {
    view.ui.move(search, "top-left"); 
}

if (screen.width >= 1024 && device == true) {
    document.getElementsByName("floorLayers").style.bottom = "110px";
}

console.log(device);

let arraySearchBar = dom.byId("searchWidget-source-menu");


// let searchBar = arraySearchBar;
console.log(arraySearchBar);
// console.log(searchBar);