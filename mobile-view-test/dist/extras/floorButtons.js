define([
    'dojo/_base/declare',
    'esri/tasks/support/Query',
    'esri/tasks/QueryTask'
], function (declare, Query, QueryTask) {
    return declare(null, {
        selectedFloor: null,
        cid: null,

        constructor: function (options) {
            this.selectedFloor = options.selectedFloor || '1';
            this.selectedFloorTitle = options.selectedFloorTitle || "1st Floor";
        },

        displayFloorButtons: function (geometryInput, dom) {
            this.hideFloorButtons(dom);

            let floorQueryTask = new QueryTask("https://tomlinson.byui.edu/arcgis/rest/services/interactive/campusFeatures/MapServer/7");
            let floorQuery = new Query();
            floorQuery.geometry = geometryInput;
            floorQuery.returnGeometry = false;
            floorQuery.outFields = ["FLOOR"];
            floorQueryTask.execute(floorQuery).then(function (results) {

                let resultCount = results.features.length;
                for (let i = 0; i < resultCount; i++) {
                    let featureAttributes = results.features[i].attributes;
                    for (let attr in featureAttributes) {
                        switch (featureAttributes[attr]) {
                            case 'B':
                                dom.byId('0floor').style.display = 'block';
                                break;
                            case '1':
                                dom.byId('1floor').style.display = 'block';
                                break;
                            case '2':
                                dom.byId('2floor').style.display = 'block';
                                break;
                            case '3':
                                dom.byId('3floor').style.display = 'block';
                                break;
                            case '4':
                                dom.byId('4floor').style.display = 'block';
                                break;
                            case '5':
                                dom.byId('5floor').style.display = 'block';
                                break;
                            default:
                        }
                    }
                }

            });
        },

        setVisibleFloor: function (floorNumber, floorVectorTileLayers, dom) {
            this.selectedFloor = floorNumber;

            dom.byId('0floor').className = "button-floor";
            dom.byId('1floor').className = "button-floor";
            dom.byId('2floor').className = "button-floor";
            dom.byId('3floor').className = "button-floor";
            dom.byId('4floor').className = "button-floor";
            dom.byId('5floor').className = "button-floor";

            dom.byId(floorNumber + 'floor').className = "button-floor-selected";

            floorVectorTileLayers[this.cid].visible = false;
            this.cid = floorNumber;
            floorVectorTileLayers[floorNumber].visible = true;
        },

        hideFloorButtons: function (dom) {
            //Hide Floor Buttons 
            dom.byId("0floor").style.display = "none";
            dom.byId("1floor").style.display = "none";
            dom.byId("2floor").style.display = "none";
            dom.byId("3floor").style.display = "none";
            dom.byId("4floor").style.display = "none";
            dom.byId("5floor").style.display = "none";
        }
    })
})