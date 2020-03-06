define(["esri/Map", "esri/Basemap", "esri/views/MapView", "esri/widgets/Locate", "esri/widgets/Search", "esri/PopupTemplate", "esri/layers/VectorTileLayer", "esri/layers/GraphicsLayer", "esri/core/watchUtils", "esri/geometry/Point", "esri/Graphic", "esri/layers/MapImageLayer", "dojo/dom", "dojo/on", "dojo/touch", "./extras/LayerFunctions", "./extras/FloorButtons", "./extras/FeatureLayers", "./extras/Sources", "./extras/FindNearest"], function (_Map, _Basemap, _MapView, _Locate, _Search, _PopupTemplate, _VectorTileLayer, _GraphicsLayer, _watchUtils, _Point, _Graphic, _MapImageLayer, _dom, _on, _touch, _LayerFunctions, _FloorButtons, _FeatureLayers, _Sources2, _FindNearest) {
    "use strict";

    var _Map2 = _interopRequireDefault(_Map);

    var _Basemap2 = _interopRequireDefault(_Basemap);

    var _MapView2 = _interopRequireDefault(_MapView);

    var _Locate2 = _interopRequireDefault(_Locate);

    var _Search2 = _interopRequireDefault(_Search);

    var _PopupTemplate2 = _interopRequireDefault(_PopupTemplate);

    var _VectorTileLayer2 = _interopRequireDefault(_VectorTileLayer);

    var _GraphicsLayer2 = _interopRequireDefault(_GraphicsLayer);

    var _Point2 = _interopRequireDefault(_Point);

    var _Graphic2 = _interopRequireDefault(_Graphic);

    var _MapImageLayer2 = _interopRequireDefault(_MapImageLayer);

    var _dom2 = _interopRequireDefault(_dom);

    var _on2 = _interopRequireDefault(_on);

    var _touch2 = _interopRequireDefault(_touch);

    var _LayerFunctions2 = _interopRequireDefault(_LayerFunctions);

    var _FloorButtons2 = _interopRequireDefault(_FloorButtons);

    var _FeatureLayers2 = _interopRequireDefault(_FeatureLayers);

    var _Sources3 = _interopRequireDefault(_Sources2);

    var _FindNearest2 = _interopRequireDefault(_FindNearest);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /* create a basemap using a community map with trees*/
    /* import all of the libraries from esri that we need to use */
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

    var construction = new _MapImageLayer2.default({
        url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/campusFeatures/MapServer',
        sublayers: [{
            id: 1,
            visible: true
        }]
    });
    map.add(construction);

    /* Create the locator widget with scaling on locating*/
    var locate = new _Locate2.default({
        view: view,
        scale: 250
    });

    var findNear = new _FindNearest2.default({});
    map.add(findNear.graphicsLayer);

    var floorButton = new _FloorButtons2.default({});
    floorButton.cid = "1";

    var device = isMobileDevice(); //calling function to identify the device

    if (screen.width >= 1024) {
        view.on('click', function (evt) {
            var locationOnClick = new _Point2.default({
                latitude: evt.mapPoint.latitude,
                longitude: evt.mapPoint.longitude
            });

            var _content = '<a href="#" id="near-printer" class="near-lg">Printer</a>' + '<a href="#" id="near-restroom" class="near-lg">Restroom</a>' + '<a href="#" id="near-fountain" class="near-lg">Drinking Fountain</a>' + '<a href="#" id="near-elevator" class="near-lg">Elevator</a>' + '<a href="#" id="near-vending" class="near-lg">Vending Machine</a>' + '<a href="#" id="near-aed" class="near-lg">AED</a>' + '<a href="#" id="near-fire" class="near-lg">Fire Extinguisher</a>';

            var template = {
                content: function content() {
                    var div = document.createElement('div');
                    div.className = 'buttons-container';
                    div.innerHTML = _content;
                    return div;
                }
            };

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

            (0, _on2.default)(_dom2.default.byId('near-restroom'), 'click', function () {
                findNear.displayNearest(findNear.graphicsLayer, locationOnClick, map, view, 0);
            });
            (0, _on2.default)(_dom2.default.byId('near-printer'), 'click', function () {
                findNear.displayNearest(findNear.graphicsLayer, locationOnClick, map, view, 1);
            });
            (0, _on2.default)(_dom2.default.byId('near-fountain'), 'click', function () {
                findNear.displayNearest(findNear.graphicsLayer, locationOnClick, map, view, 2);
            });
            (0, _on2.default)(_dom2.default.byId('near-aed'), 'click', function () {
                findNear.displayNearest(findNear.graphicsLayer, locationOnClick, map, view, 3);
            });
            (0, _on2.default)(_dom2.default.byId('near-elevator'), 'click', function () {
                findNear.displayNearest(findNear.graphicsLayer, locationOnClick, map, view, 4);
            });
            (0, _on2.default)(_dom2.default.byId('near-vending'), 'click', function () {
                findNear.displayNearest(findNear.graphicsLayer, locationOnClick, map, view, 5);
            });
            (0, _on2.default)(_dom2.default.byId('near-fire'), 'click', function () {
                findNear.displayNearest(findNear.graphicsLayer, locationOnClick, map, view, 6);
            });

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
        var positionRecieved = function positionRecieved(pos) {
            var coords = pos.coords;
            var locationPoint = new _Point2.default({
                latitude: coords.latitude,
                longitude: coords.longitude
            });

            floorButton.watch('cid', function () {
                if (findNear.currentSelection != null) {
                    findNear.changeCurrentFloor(floorButton.get('cid'));
                    findNear.displayNearest(findNear.graphicsLayer, locationPoint, map, view, findNear.currentSelection);
                }
            });

            (0, _on2.default)(_dom2.default.byId('nearest-restroom'), 'click', function () {
                findNear.displayNearest(findNear.graphicsLayer, locationPoint, map, view, 0);
            });
            (0, _on2.default)(_dom2.default.byId('nearest-printer'), 'click', function () {
                findNear.displayNearest(findNear.graphicsLayer, locationPoint, map, view, 1);
            });
            (0, _on2.default)(_dom2.default.byId('nearest-fountain'), 'click', function () {
                findNear.displayNearest(findNear.graphicsLayer, locationPoint, map, view, 2);
            });
            (0, _on2.default)(_dom2.default.byId('nearest-aed'), 'click', function () {
                findNear.displayNearest(findNear.graphicsLayer, locationPoint, map, view, 3);
            });
            (0, _on2.default)(_dom2.default.byId('nearest-elevator'), 'click', function () {
                findNear.displayNearest(findNear.graphicsLayer, locationPoint, map, view, 4);
            });
            (0, _on2.default)(_dom2.default.byId('nearest-vending'), 'click', function () {
                findNear.displayNearest(findNear.graphicsLayer, locationPoint, map, view, 5);
            });
            (0, _on2.default)(_dom2.default.byId('nearest-fire'), 'click', function () {
                findNear.displayNearest(findNear.graphicsLayer, locationPoint, map, view, 6);
            });
        };

        var error = function error(err) {
            console.warn("ERROR(" + err.code + "): " + err.message);
        };

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(positionRecieved, error, options);
    }

    var floorsWidget = document.getElementById("floorLayers"); //Get floor buttons container 


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
        allPlaceholder: "Kimball or KIM170",
        includeDefaultSources: false
    });

    var _Sources = (0, _Sources3.default)(),
        sources = _Sources.sources;

    search.sources = sources;

    search.on('select-result', function (evt) {
        var floorNumber = evt.target.selectedResult.feature.attributes.FLOOR;
        console.log(evt.target.selectedResult);
        if (floorNumber) {
            floorButton.setVisibleFloor(floorNumber, lf.floors, _dom2.default);
            view.scale = 400;
        } else {
            floorButton.setVisibleFloor('1', lf.floors, _dom2.default);
        }
    });

    /* Insert the search widget to the top right of the page*/
    view.ui.add(search, "top-right");
    /* For the bigger screens we want to move the search widget to  */
    if (screen.width > 600) {
        view.ui.move(search, "top-left");
    }
    /* If large screen and not a mobile device we move buttons closer to zoom widget to get rid of the gap between them */
    if (screen.width >= 1024 && device == true) {
        document.getElementById("floorLayers").style.bottom = "110px";
    }

    var lf = new _LayerFunctions2.default({});
    lf.addVectorLayersToMap(map);

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

    var fl = new _FeatureLayers2.default({});
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

    (0, _on2.default)(_dom2.default.byId('btn-clear'), 'click', function () {
        findNear.graphicsLayer.removeAll();findNear.currentSelection = null;
    });

    (0, _on2.default)(_dom2.default.byId('near-mobile'), 'drag', function (e) {
        console.log(e);
    });
});
