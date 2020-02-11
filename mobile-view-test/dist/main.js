define(["esri/Map", "esri/Basemap", "esri/views/MapView", "esri/widgets/Locate", "esri/widgets/Search", "esri/layers/VectorTileLayer", "esri/layers/FeatureLayer", "esri/core/watchUtils", "dojo/dom", "dojo/on", "./extras/layerFunctions", "./extras/floorButtons", "./extras/featureLayers"], function (_Map, _Basemap, _MapView, _Locate, _Search, _VectorTileLayer, _FeatureLayer, _watchUtils, _dom, _on, _layerFunctions, _floorButtons, _featureLayers) {
    "use strict";

    var _Map2 = _interopRequireDefault(_Map);

    var _Basemap2 = _interopRequireDefault(_Basemap);

    var _MapView2 = _interopRequireDefault(_MapView);

    var _Locate2 = _interopRequireDefault(_Locate);

    var _Search2 = _interopRequireDefault(_Search);

    var _VectorTileLayer2 = _interopRequireDefault(_VectorTileLayer);

    var _FeatureLayer2 = _interopRequireDefault(_FeatureLayer);

    var _dom2 = _interopRequireDefault(_dom);

    var _on2 = _interopRequireDefault(_on);

    var _layerFunctions2 = _interopRequireDefault(_layerFunctions);

    var _floorButtons2 = _interopRequireDefault(_floorButtons);

    var _featureLayers2 = _interopRequireDefault(_featureLayers);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /* create a basemap using a community map with trees*/
    var basemap = new _Basemap2.default({
        baseLayers: [new _VectorTileLayer2.default({
            portalItem: {
                id: "6b139d5d51124071961da673229b2aaa" // Forest and Parks Canvas
            }
        })],
        title: "Community Basemap",
        id: "communityBasemap"
    });

    /* Creating a map with our tree basemap*/
    /* import all of the libraries from esri that we need to use */
    var map = new _Map2.default({
        basemap: basemap
    });

    /* Creating a view centered on BYUI campus*/
    var view = new _MapView2.default({
        container: "viewDiv",
        map: map,
        zoom: 16,
        center: [-111.784, 43.818]
    });

    /* Create the locator widget with scaling on locating*/
    var locate = new _Locate2.default({
        view: view,
        scale: 400
    });

    var floorsWidget = document.getElementById("floorLayers"); //Get floor buttons container 

    var device = isMobileDevice(); //calling function to identify the device

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
    var search = new _Search2.default({
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

    var lf = new _layerFunctions2.default({});
    lf.addVectorLayersToMap(map);

    var floorButton = new _floorButtons2.default({});

    floorButton.cid = "1";

    (0, _watchUtils.whenFalse)(view, "stationary", function () {
        if (!view.stationary) {
            (0, _watchUtils.whenTrueOnce)(view, 'stationary', function () {
                if (view.extent) {
                    if (view.scale <= 1128.497176) {
                        floorButton.displayFloorButtons(view.extent, _dom2.default);
                    } else {
                        floorButton.hideFloorButtons(_dom2.default);
                    }
                }
            });
        } else {
            (0, _watchUtils.whenFalseOnce)(view, 'interacting', function (evt) {
                console.log(view.extent);
            });
        }
    });

    (0, _on2.default)(_dom2.default.byId("0floor"), "click", function () {
        floorButton.setVisibleFloor("0", lf.floors, _dom2.default);
    });
    (0, _on2.default)(_dom2.default.byId("1floor"), "click", function () {
        floorButton.setVisibleFloor("1", lf.floors, _dom2.default);
    });
    (0, _on2.default)(_dom2.default.byId("2floor"), "click", function () {
        floorButton.setVisibleFloor("2", lf.floors, _dom2.default);
    });
    (0, _on2.default)(_dom2.default.byId("3floor"), "click", function () {
        floorButton.setVisibleFloor("3", lf.floors, _dom2.default);
    });
    (0, _on2.default)(_dom2.default.byId("4floor"), "click", function () {
        floorButton.setVisibleFloor("4", lf.floors, _dom2.default);
    });
    (0, _on2.default)(_dom2.default.byId("5floor"), "click", function () {
        floorButton.setVisibleFloor("5", lf.floors, _dom2.default);
    });

    /* Change basemap on click */

    (0, _on2.default)(_dom2.default.byId('basemapRoads'), 'click', function () {
        map.basemap = 'streets';
    });
    (0, _on2.default)(_dom2.default.byId('basemapSatellite'), 'click', function () {
        map.basemap = 'satellite';
    });

    /* Add feature layers event listener */

    var fl = new _featureLayers2.default({});
    floorButton.watch("cid", function () {
        fl.changeCurrentFloor(floorButton.get("cid"));
        fl.turnOnLayer('baby', map, _dom2.default.byId('baby').checked);
        fl.turnOnLayer('bike', map, _dom2.default.byId('bike').checked);
        fl.turnOnLayer('booth', map, _dom2.default.byId('booth').checked);
        fl.turnOnLayer('food', map, _dom2.default.byId('food').checked);
        fl.turnOnLayer('mothers-lounge', map, _dom2.default.byId('mothers-lounge').checked);
        fl.turnOnLayer('bw-printer', map, _dom2.default.byId('bw-printer').checked);
        fl.turnOnLayer('clr-printer', map, _dom2.default.byId('clr-printer').checked);
        fl.turnOnLayer('copy-scan', map, _dom2.default.byId('copy-scan').checked);
        fl.turnOnLayer('vending', map, _dom2.default.byId('vending').checked);
    });

    (0, _on2.default)(_dom2.default.byId('baby'), 'click', function () {
        fl.turnOnLayer('baby', map, _dom2.default.byId('baby').checked);
    });
    (0, _on2.default)(_dom2.default.byId('bike'), 'click', function () {
        fl.turnOnLayer('bike', map, _dom2.default.byId('bike').checked);
    });
    (0, _on2.default)(_dom2.default.byId('booth'), 'click', function () {
        fl.turnOnLayer('booth', map, _dom2.default.byId('booth').checked);
    });
    (0, _on2.default)(_dom2.default.byId('food'), 'click', function () {
        fl.turnOnLayer('food', map, _dom2.default.byId('food').checked);
    });
    (0, _on2.default)(_dom2.default.byId('mothers-lounge'), 'click', function () {
        fl.turnOnLayer('mothers-lounge', map, _dom2.default.byId('mothers-lounge').checked);
    });
    (0, _on2.default)(_dom2.default.byId('bw-printer'), 'click', function () {
        fl.turnOnLayer('bw-printer', map, _dom2.default.byId('bw-printer').checked);
    });
    (0, _on2.default)(_dom2.default.byId('clr-printer'), 'click', function () {
        fl.turnOnLayer('clr-printer', map, _dom2.default.byId('clr-printer').checked);
    });
    (0, _on2.default)(_dom2.default.byId('copy-scan'), 'click', function () {
        fl.turnOnLayer('copy-scan', map, _dom2.default.byId('copy-scan').checked);
    });
    (0, _on2.default)(_dom2.default.byId('vending'), 'click', function () {
        fl.turnOnLayer('vending', map, _dom2.default.byId('vending').checked);
    });
});
