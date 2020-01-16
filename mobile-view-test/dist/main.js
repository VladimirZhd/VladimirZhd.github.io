define(["esri/Map", "esri/views/MapView", "esri/widgets/Locate", "esri/widgets/Search", "esri/Basemap", "esri/layers/VectorTileLayer"], function (_Map, _MapView, _Locate, _Search, _Basemap, _VectorTileLayer) {
    "use strict";

    var _Map2 = _interopRequireDefault(_Map);

    var _MapView2 = _interopRequireDefault(_MapView);

    var _Locate2 = _interopRequireDefault(_Locate);

    var _Search2 = _interopRequireDefault(_Search);

    var _Basemap2 = _interopRequireDefault(_Basemap);

    var _VectorTileLayer2 = _interopRequireDefault(_VectorTileLayer);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var basemap = new _Basemap2.default({
        baseLayers: [new _VectorTileLayer2.default({
            portalItem: {
                id: "6b139d5d51124071961da673229b2aaa" // Forest and Parks Canvas
            }
        })],
        title: "Community Basemap",
        id: "communityBasemap"
    });

    var map = new _Map2.default({
        basemap: basemap
    });
    var view = new _MapView2.default({
        container: "viewDiv",
        map: map,
        zoom: 15,
        center: [-111.784, 43.818],
        sliderPosition: "top-right"
    });

    var locate = new _Locate2.default({
        view: view,
        scale: 900
    });
    var floorsWidget = document.getElementById("floorLayers");
    var device = isMobileDevice();
    view.ui.add(floorsWidget, "bottom-right");
    view.ui.move('zoom', "bottom-right");
    if (screen.width < 768) {
        view.ui.add(locate, "bottom-right");
    }
    if (device == true) {
        view.ui.add(locate, "bottom-right");
    }

    var search = new _Search2.default({
        view: view
    });

    view.ui.add(search, "top-right");
    if (screen.width > 767) {
        view.ui.move(search, "top-left");
    }

    if (screen.width >= 1024 && device == true) {
        document.getElementById("floorLayers").style.bottom = "110px";
    }

    console.log(device);
});
