define(["esri/Map", "esri/Basemap", "esri/views/MapView", "esri/widgets/Locate", "esri/widgets/Search", "esri/layers/VectorTileLayer", "esri/core/watchUtils", "dojo/dom", "dojo/on", "./extras/layerFunctions", "./extras/floorButtons"], function (_Map, _Basemap, _MapView, _Locate, _Search, _VectorTileLayer, _watchUtils, _dom, _on, _layerFunctions, _floorButtons) {
    "use strict";

    var _Map2 = _interopRequireDefault(_Map);

    var _Basemap2 = _interopRequireDefault(_Basemap);

    var _MapView2 = _interopRequireDefault(_MapView);

    var _Locate2 = _interopRequireDefault(_Locate);

    var _Search2 = _interopRequireDefault(_Search);

    var _VectorTileLayer2 = _interopRequireDefault(_VectorTileLayer);

    var _dom2 = _interopRequireDefault(_dom);

    var _on2 = _interopRequireDefault(_on);

    var _layerFunctions2 = _interopRequireDefault(_layerFunctions);

    var _floorButtons2 = _interopRequireDefault(_floorButtons);

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
        zoom: 15,
        center: [-111.784, 43.818]
    });

    /* Create the locator widget with scaling on locating*/
    var locate = new _Locate2.default({
        view: view,
        scale: 900
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
        document.getElementsByName("floorLayers").style.bottom = "110px";
    }

    var lf = new _layerFunctions2.default({});
    lf.addBaseReferenceLayers(map);

    var floorButton = new _floorButtons2.default({});

    /* Check for map extent change */
    (0, _watchUtils.whenFalse)(view, 'stationary', function (evt) {
        if (!view.stationary) {
            (0, _watchUtils.whenTrueOnce)(view, 'stationary', function (evt) {
                if (view.extent) {
                    if (lf.getInteriorReferenceLayerMinScale()) {
                        if (lf.interiorReferenceLayerMinScale >= view.scale) {
                            floorButton.displayFloorButtons(view.extent, _dom2.default);
                        } else {
                            floorButton.hideFloorButtons(_dom2.default);
                        }
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
        floorButton.setVisibleFloor("0", lf.interiorReferenceLayer, _dom2.default);
    });
    (0, _on2.default)(_dom2.default.byId("1floor"), "click", function () {
        floorButton.setVisibleFloor("1", lf.interiorReferenceLayer, _dom2.default);
    });
    (0, _on2.default)(_dom2.default.byId("2floor"), "click", function () {
        floorButton.setVisibleFloor("2", lf.interiorReferenceLayer, _dom2.default);
    });
    (0, _on2.default)(_dom2.default.byId("3floor"), "click", function () {
        floorButton.setVisibleFloor("3", lf.interiorReferenceLayer, _dom2.default);
    });
    (0, _on2.default)(_dom2.default.byId("4floor"), "click", function () {
        floorButton.setVisibleFloor("4", lf.interiorReferenceLayer, _dom2.default);
    });
});
