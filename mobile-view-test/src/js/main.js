/* import all of the libraries from esri that we need to use */
import Map from "esri/Map";
import Basemap from "esri/Basemap";
import esriRequest from 'esri/request';
import MapView from "esri/views/MapView";

import Locate from "esri/widgets/Locate";
import Search from "esri/widgets/Search";

import VectorTileLayer from "esri/layers/VectorTileLayer";
import MapImageLayer from 'esri/layers/MapImageLayer';
import { whenFalse } from "esri/core/watchUtils";
import { whenTrueOnce } from "esri/core/watchUtils";
import { whenFalseOnce } from "esri/core/watchUtils";
import Point from 'esri/geometry/Point';
import Graphic from 'esri/Graphic';
import FeatureLayer from 'esri/layers/FeatureLayer';

import dom from "dojo/dom";
import on from "dojo/on";
import dojo from "dojo";
import query from 'esri/tasks/support/Query';
import task from 'esri/tasks/QueryTask';

import LayerFunctions from "./extras/LayerFunctions";
import Buttons from "./extras/FloorButtons";
import MenuLayers from "./extras/FeatureLayers";
import Sources from "./extras/Sources";
import FindNearest from "./extras/FindNearest";
import ParkingLayer from "./extras/ParkingLayer";
import ParkingSymbology from "./extras/ParkingSymbology";

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

let construction = new MapImageLayer({
    url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/campusFeatures/MapServer',
    sublayers: [
        {
            id: 1,
            visible: true
        }
    ]
});
map.add(construction);

/* Create the locator widget with scaling on locating*/
let locate = new Locate({
    view: view,
    scale: 250
});

const findNear = new FindNearest({});
map.add(findNear.graphicsLayer);

let floorButton = new Buttons({});
floorButton.cid = "1";

let device = isMobileDevice();  //calling function to identify the device

if (screen.width >= 1024) {
    view.on('click', function (evt) {
        let locationOnClick = new Point({
            latitude: evt.mapPoint.latitude,
            longitude: evt.mapPoint.longitude
        })

        let content = '<a href="#" id="near-printer" class="near-lg">Printer</a>' +
            '<a href="#" id="near-restroom" class="near-lg">Restroom</a>' +
            '<a href="#" id="near-fountain" class="near-lg">Drinking Fountain</a>' +
            '<a href="#" id="near-elevator" class="near-lg">Elevator</a>' +
            '<a href="#" id="near-vending" class="near-lg">Vending Machine</a>' +
            '<a href="#" id="near-aed" class="near-lg">AED</a>' +
            '<a href="#" id="near-fire" class="near-lg">Fire Extinguisher</a>';

        let template = {
            content: function () {
                let div = document.createElement('div');
                div.className = 'buttons-container';
                div.innerHTML = content;
                return div;
            }
        }

        view.popup.visible = true;
        view.popup.location = locationOnClick;
        view.popup.title = "Find Nearest";
        view.popup.content = template.content();

        view.popup.reposition();

        floorButton.watch('cid', function () {
            if (findNear.currentSelection != null) {
                findNear.changeCurrentFloor(floorButton.get('cid'));
                findNear.displayNearest(findNear.graphicsLayer, locationOnClick, map, view, findNear.currentSelection);
            }
        });


        on(dom.byId('near-restroom'), 'click', function () { findNear.displayNearest(findNear.graphicsLayer, locationOnClick, map, view, 0); });
        on(dom.byId('near-printer'), 'click', function () { findNear.displayNearest(findNear.graphicsLayer, locationOnClick, map, view, 1) });
        on(dom.byId('near-fountain'), 'click', function () { findNear.displayNearest(findNear.graphicsLayer, locationOnClick, map, view, 2) });
        on(dom.byId('near-aed'), 'click', function () { findNear.displayNearest(findNear.graphicsLayer, locationOnClick, map, view, 3) });
        on(dom.byId('near-elevator'), 'click', function () { findNear.displayNearest(findNear.graphicsLayer, locationOnClick, map, view, 4) });
        on(dom.byId('near-vending'), 'click', function () { findNear.displayNearest(findNear.graphicsLayer, locationOnClick, map, view, 5) });
        on(dom.byId('near-fire'), 'click', function () { findNear.displayNearest(findNear.graphicsLayer, locationOnClick, map, view, 6) });

        $(document).ready(function () {
            $('.near-lg').click(function () {
                view.popup.close();
            });

            $(".near-lg").on("click", function () {
                $('.clear-nearest').css('display', 'flex');
            });
        });
    });
} else {
    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function positionRecieved(pos) {
        let coords = pos.coords;
        let locationPoint = new Point({
            latitude: coords.latitude,
            longitude: coords.longitude
        });

        floorButton.watch('cid', function () {
            if (findNear.currentSelection != null) {
                findNear.changeCurrentFloor(floorButton.get('cid'));
                findNear.displayNearest(findNear.graphicsLayer, locationPoint, map, view, findNear.currentSelection);
            }
        });

        on(dom.byId('nearest-restroom'), 'click', function () { findNear.displayNearest(findNear.graphicsLayer, locationPoint, map, view, 0) });
        on(dom.byId('nearest-printer'), 'click', function () { findNear.displayNearest(findNear.graphicsLayer, locationPoint, map, view, 1) });
        on(dom.byId('nearest-fountain'), 'click', function () { findNear.displayNearest(findNear.graphicsLayer, locationPoint, map, view, 2) });
        on(dom.byId('nearest-aed'), 'click', function () { findNear.displayNearest(findNear.graphicsLayer, locationPoint, map, view, 3) });
        on(dom.byId('nearest-elevator'), 'click', function () { findNear.displayNearest(findNear.graphicsLayer, locationPoint, map, view, 4) });
        on(dom.byId('nearest-vending'), 'click', function () { findNear.displayNearest(findNear.graphicsLayer, locationPoint, map, view, 5) });
        on(dom.byId('nearest-fire'), 'click', function () { findNear.displayNearest(findNear.graphicsLayer, locationPoint, map, view, 6) });
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(positionRecieved, error, options);
}


let floorsWidget = document.getElementById("floorLayers"); //Get floor buttons container 


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
    allPlaceholder: "Kimball or KIM170",
    includeDefaultSources: false
});
const { sources } = Sources();
search.sources = sources;

search.on('select-result', function (evt) {
    let floorNumber = evt.target.selectedResult.feature.attributes.FLOOR;
    if (floorNumber) {
        floorButton.setVisibleFloor(floorNumber, lf.floors, dom);
        view.scale = 400;
    } else {
        floorButton.setVisibleFloor('1', lf.floors, dom);
    }
});

search.on('search-complete', function (evt) {
    let phraseFeature = new FeatureLayer({
        url: "https://tomlinson.byui.edu/arcgis/rest/services/SearchPhrase/SearchPhrase/FeatureServer/0"
    });

    if (search.searchTerm != "") {
        let newFeature = {
            "attributes": {
                "SEARCHPHRASE": search.searchTerm
            }
        }
        phraseFeature.applyEdits({
            addFeatures: [newFeature]
        });
    }
})

let searchLog = '';
search.on('search-start', () => {
    searchLog += [search.searchTerm] + ", ";
})

/* Insert the search widget to the top right of the page*/
view.ui.add(search, "top-right");
/* For the bigger screens we want to move the search widget to  */
if (screen.width > 600) {
    view.ui.move(search, "top-left");
}
console.log(device);
/* If large screen and not a mobile device we move buttons closer to zoom widget to get rid of the gap between them */
if (screen.width >= 1024 && device == true) {
    document.getElementById("floorLayers").style.bottom = "110px";
}
if (screen.width <= 1024) {
    document.getElementById("near-mobile").style.display = "block";
}

let lf = new LayerFunctions({});
lf.addVectorLayersToMap(map);

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

on(dom.byId('basemapRoads'), 'click', function () { map.basemap = 'streets' });
on(dom.byId('basemapSatellite'), 'click', function () { map.basemap = 'satellite' });

/* Add feature layers event listener */

let fl = new MenuLayers({});
floorButton.watch("cid", function () {
    fl.changeCurrentFloor(floorButton.get("cid"));
    fl.turnOnLayer('baby', map, dom.byId('baby').checked);
    fl.turnOnLayer('bike', map, dom.byId('bike').checked);
    fl.turnOnLayer('booth', map, dom.byId('booth').checked);
    fl.turnOnLayer('food', map, dom.byId('food').checked);
    fl.turnOnLayer('mothers-lounge', map, dom.byId('mothers-lounge').checked);
    fl.turnOnLayer('bw-printer', map, dom.byId('bw-printer').checked);
    fl.turnOnLayer('clr-printer', map, dom.byId('clr-printer').checked);
    fl.turnOnLayer('copy-scan', map, dom.byId('copy-scan').checked);
    fl.turnOnLayer('vending', map, dom.byId('vending').checked);
});

on(dom.byId('baby'), 'click', function () { fl.turnOnLayer('baby', map, dom.byId('baby').checked); });
on(dom.byId('bike'), 'click', function () { fl.turnOnLayer('bike', map, dom.byId('bike').checked) });
on(dom.byId('booth'), 'click', function () { fl.turnOnLayer('booth', map, dom.byId('booth').checked) });
on(dom.byId('food'), 'click', function () { fl.turnOnLayer('food', map, dom.byId('food').checked) });
on(dom.byId('mothers-lounge'), 'click', function () { fl.turnOnLayer('mothers-lounge', map, dom.byId('mothers-lounge').checked) });
on(dom.byId('bw-printer'), 'click', function () { fl.turnOnLayer('bw-printer', map, dom.byId('bw-printer').checked) });
on(dom.byId('clr-printer'), 'click', function () { fl.turnOnLayer('clr-printer', map, dom.byId('clr-printer').checked) });
on(dom.byId('copy-scan'), 'click', function () { fl.turnOnLayer('copy-scan', map, dom.byId('copy-scan').checked) });
on(dom.byId('vending'), 'click', function () { fl.turnOnLayer('vending', map, dom.byId('vending').checked) });
on(dom.byId('outdoor'), 'click', function () { fl.turnOnLayer('outdoor', map, dom.byId('outdoor').checked) });
on(dom.byId('spaces'), 'click', function () { fl.turnOnLayer('spaces', map, dom.byId('spaces').checked) });
on(dom.byId('playfield'), 'click', function () { fl.turnOnLayer('playfield', map, dom.byId('playfield').checked) });
on(dom.byId('boundary'), 'click', function () { fl.turnOnLayer('boundary', map, dom.byId('boundary').checked) });

on(dom.byId('btn-clear'), 'click', function () { findNear.graphicsLayer.removeAll(); findNear.currentSelection = null; });

let string = window.location.href;
let url = new URL(string);
let build = url.searchParams.get("building");
let room = url.searchParams.get("room");
let booth = url.searchParams.get("booth");
let place = url.searchParams.get("space");
let space = url.searchParams.get("place");

if (build != null && room != null) {
    search.searchTerm = build + room;
}

if (booth != null) {
    search.searchTerm = booth;
}

if (place != null && space == null) {
    search.searchTerm = place;
}

if (place != null && space != null) {
    search.searchTerm = place + space;
}

if (build != null && room == null) {
    let t = new task("https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/16");
    let q = new query();

    q.where = "BUILDINGID = " + "'" + build + "'";
    q.outFields = "[SHORTNAME]";

    t.execute(q).then(function (evt) {
        search.searchTerm = evt.features[0].attributes.SHORTNAME;
        console.log("Here " + search.searchTerm);
    });
}

dojo.addOnLoad(function () {
    $('.esri-search__submit-button')[0].click();
});

let pl = new ParkingLayer();

on(dom.byId('event'), 'click', function (e) { e.stopPropagation(); pl.turnOnParkingLayer('event', map, dom.byId('event').checked) });
on(dom.byId('child'), 'click', function (e) { pl.turnOnParkingLayer('child', map, dom.byId('child').checked) });
on(dom.byId('staff'), 'click', function () { pl.turnOnParkingLayer('staff', map, dom.byId('staff').checked) });
on(dom.byId('ward'), 'click', function () { pl.turnOnParkingLayer('ward', map, dom.byId('ward').checked) });
on(dom.byId('north'), 'click', function (e) { pl.turnOnParkingLayer('north', map, dom.byId('north').checked) });
on(dom.byId('south'), 'click', function () { pl.turnOnParkingLayer('south', map, dom.byId('south').checked) });
on(dom.byId('housing'), 'click', function () { pl.turnOnParkingLayer('housing', map, dom.byId('housing').checked) });
on(dom.byId('longTerm'), 'click', function () { pl.turnOnParkingLayer('longTerm', map, dom.byId('longTerm').checked) });
on(dom.byId('winterLT'), 'click', function () { pl.turnOnParkingLayer('winterLT', map, dom.byId('winterLT').checked) });
on(dom.byId('FaWiLT'), 'click', function () { pl.turnOnParkingLayer('FaWiLT', map, dom.byId('FaWiLT').checked) });
on(dom.byId('economy'), 'click', function () { pl.turnOnParkingLayer('economy', map, dom.byId('economy').checked) });
on(dom.byId('visitors'), 'click', function () { pl.turnOnParkingLayer('visitors', map, dom.byId('visitors').checked) });


let ps = new ParkingSymbology();
ps.getParkingSymbols();
