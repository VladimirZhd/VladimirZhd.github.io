/* import all of the libraries from esri that we need to use */
import Map from "esri/Map";
import Basemap from "esri/Basemap";
import MapView from "esri/views/MapView";

import Locate from "esri/widgets/Locate";
import Search from "esri/widgets/Search";

import VectorTileLayer from "esri/layers/VectorTileLayer";
import FeatureLayer from "esri/layers/FeatureLayer";
import { whenFalse } from "esri/core/watchUtils";
import { whenTrueOnce } from "esri/core/watchUtils";
import { whenFalseOnce } from "esri/core/watchUtils";

import dom from "dojo/dom";
import on from "dojo/on";

import layerFunctions from "./extras/layerFunctions";
import Buttons from "./extras/floorButtons";
import menuLayers from "./extras/featureLayers";

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
const map = new Map({
    basemap: basemap
});

/* Creating a view centered on BYUI campus*/
const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 16,
    center: [-111.784, 43.818],
});

/* Create the locator widget with scaling on locating*/
let locate = new Locate({
    view: view,
    scale: 400
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
    sources: [],
    allPlaceholder: "Find a place"
});

/* Insert the search widget to the top right of the page*/
view.ui.add(search, "top-right");
/* For the bigger screens we want to move the search widget to  */
if (screen.width > 767) {
    view.ui.move(search, "top-left");
}
/* If large screen and not a mobile device we move buttons closer to zoom widget to get rid of the gap between them */
if (screen.width >= 1024 && device == true) {
    document.getElementById("floorLayers").style.bottom = "110px";
}

let lf = new layerFunctions({});
lf.addVectorLayersToMap(map);

let floorButton = new Buttons({});

floorButton.cid = 1;


whenFalse(view, "stationary", function () {
    if (!view.stationary) {
        whenTrueOnce(view, 'stationary', function () {
            if (view.extent) {
                if (view.scale <= 1128.497176) {
                    floorButton.displayFloorButtons(view.extent, dom);
                } else {
                    floorButton.hideFloorButtons(dom);
                }
            }
        });
    } else {
        whenFalseOnce(view, 'interacting', function (evt) {
            console.log(view.extent);
        });
    }
});

on(dom.byId("0floor"), "click", function () { floorButton.setVisibleFloor("0", lf.floors, dom) });
on(dom.byId("1floor"), "click", function () { floorButton.setVisibleFloor("1", lf.floors, dom) });
on(dom.byId("2floor"), "click", function () { floorButton.setVisibleFloor("2", lf.floors, dom) });
on(dom.byId("3floor"), "click", function () { floorButton.setVisibleFloor("3", lf.floors, dom) });
on(dom.byId("4floor"), "click", function () { floorButton.setVisibleFloor("4", lf.floors, dom) });
on(dom.byId("5floor"), "click", function () { floorButton.setVisibleFloor("5", lf.floors, dom) });


/* Change basemap on click */

on(dom.byId('basemapRoads'), 'click', function () {map.basemap = 'streets'});
on(dom.byId('basemapSatellite'), 'click', function () {map.basemap = 'satellite'});

/* Add feature layers event listener */

let fl = new menuLayers({});

let activeFloor = whatFloorIsActive();
console.log(activeFloor);

on(dom.byId('baby'), 'click', function () {fl.turnOnLayer('baby', map, dom.byId('baby').checked)});
on(dom.byId('bike'), 'click', function () {fl.turnOnLayer('bike', map)});
on(dom.byId('booth'), 'click', function () {fl.turnOnLayer('booth', map)});
on(dom.byId('food'), 'click', function () {fl.turnOnLayer('food', map)});
on(dom.byId('mothers-lounge'), 'click', function () {fl.turnOnLayer('mother-lounge', map)});
on(dom.byId('bw-printer'), 'click', function () {fl.turnOnLayer('bw-printer', map)});
on(dom.byId('clr-printer'), 'click', function () {fl.turnOnLayer('clr-printer', map)});
on(dom.byId('copy-scan'), 'click', function () {fl.turnOnLayer('copy-scan', map)});
on(dom.byId('vending'), 'click', function () {fl.turnOnLayer('vending', map)});

