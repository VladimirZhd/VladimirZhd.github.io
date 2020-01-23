/* import all of the libraries from esri that we need to use */
import Map from "esri/Map";
import MapView from "esri/views/MapView";
import Locate from "esri/widgets/Locate";
import Search from "esri/widgets/Search";
import Basemap from "esri/Basemap";
import VectorTileLayer from "esri/layers/VectorTileLayer";
import dom from "dojo/dom";
import watchUtils from "esri/core/watchUtils";
import layerFunctions from "./extras/layerFunctions";
import floorButtons from "./extras/floorButtons";



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
    document.getElementsByName("floorLayers").style.bottom = "110px";
}

let lf = new layerFunctions({});
lf.addBaseReferenceLayers(map);

let floorButton = new floorButtons({});

/* Check for map extent change */
watchUtils.whenFalse(view, 'stationary', function (evt) {
    if (!view.stationary) {
        watchUtils.whenTrueOnce(view, 'stationary', function (evt) {
            if (view.extent) {
                if (lf.getInteriorReferenceLayerMinScale()) {
                    if (lf.interiorReferenceLayerMinScale >= view.scale) {
                        floorButton.displayFloorButtons(view.extent, dom);
                    }
                    else {
                        floorButton.hideFloorButtons(dom);
                    }
                }
            }
        });
    } else {
        watchUtils.whenFalseOnce(view, 'interacting', function (evt) {
            console.log(view.extent);
        });
    }
})



on(dom.byId("0floor"), "click", function () { floorButton.setVisibleFloor("0", lf.interiorReferenceLayer, dom) });
on(dom.byId("1floor"), "click", function () { floorButton.setVisibleFloor("1", lf.interiorReferenceLayer, dom) });
on(dom.byId("2floor"), "click", function () { floorButton.setVisibleFloor("2", lf.interiorReferenceLayer, dom) });
on(dom.byId("3floor"), "click", function () { floorButton.setVisibleFloor("3", lf.interiorReferenceLayer, dom) });
on(dom.byId("4floor"), "click", function () { floorButton.setVisibleFloor("4", lf.interiorReferenceLayer, dom) });