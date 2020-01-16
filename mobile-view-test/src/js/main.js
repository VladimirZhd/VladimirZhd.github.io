import Map from "esri/Map";
import MapView from "esri/views/MapView";
import Locate from "esri/widgets/Locate";
import Search from "esri/widgets/Search";
import Basemap from "esri/Basemap";
import VectorTileLayer from "esri/layers/VectorTileLayer";

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

var map = new Map({
    basemap: basemap
});
var view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 15,
    center: [-111.784, 43.818],
    sliderPosition: "top-right"
});

let locate = new Locate({
    view: view
});
let floorsWidget = document.getElementById("floorLayers");

view.ui.add(floorsWidget, "bottom-right");
view.ui.move('zoom', "bottom-right");
if (screen.width < 768) {
    view.ui.add(locate, "bottom-right");
}


let search = new Search({
    view: view
});

view.ui.add(search, "top-right");
if (screen.width > 768) {
    view.ui.move(search, "top-left"); 
}

let device = isMobileDevice();
console.log(device);

