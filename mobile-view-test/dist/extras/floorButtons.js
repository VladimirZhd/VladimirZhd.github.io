define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/_base/array",
    "esri/tasks/support/Query",
    "esri/tasks/QueryTask",
],
    function (declare, lang, arrayUtils, Query, QueryTask) {
        return declare(null, {
            selectedFloor: null,

            constructor: function (options) {
                this.selectedFloor = options.selectedFloor || "1";
                this.selectedFloorTitle = options.selectedFloorTitle || "1st Floor";
            },

            displayFloorButtons: function (geometryInput, dom) {
                //Hide Floor Buttons so that only floors that are currently in the extent will be visible after the following query task
                this.hideFloorButtons(dom);

                //Determine which floors are currently in the view extent
                var floorQueryTask = new QueryTask("https://maps.byui.edu/arcgis/rest/services/Interactive/InteractiveRoomFloor/MapServer/13");
                var floorQuery = new Query();
                floorQuery.geometry = geometryInput;
                floorQuery.returnGeometry = false;
                floorQuery.outFields = ["FLOOR"];
                floorQueryTask.execute(floorQuery).then(function (results) {
                    /**
                    * Display floor buttons that when clicked display the floors associated with the floor layer
                    */
                    var resultCount = results.features.length;
                    for (var i = 0; i < resultCount; i++) {
                        var featureAttributes = results.features[i].attributes;
                        for (var attr in featureAttributes) {
                            switch (featureAttributes[attr]) {
                                case "B":
                                    dom.byId("0floor").style.display = "block";
                                    break;
                                case "1":
                                    dom.byId("1floor").style.display = "block";
                                    break;
                                case "2":
                                    dom.byId("2floor").style.display = "block";
                                    break;
                                case "3":
                                    dom.byId("3floor").style.display = "block";
                                    break;
                                case "4":
                                    dom.byId("4floor").style.display = "block";
                                    break;
                                // case "5":
                                //     dom.byId("5floor").style.display = "block";
                                //     break;
                            }
                        }
                    }
                });
            },

            hideFloorButtons: function (dom) {
                //Hide Floor Buttons 
                dom.byId("0floor").style.display = "none";
                dom.byId("1floor").style.display = "none";
                dom.byId("2floor").style.display = "none";
                dom.byId("3floor").style.display = "none";
                dom.byId("4floor").style.display = "none";
                // dom.byId("5floor").style.display = "none";
            },

            setVisibleFloor: function (floorNumber, interiorReferenceLayer, dom) {
                //Set the floor for reference when needed
                this.selectedFloor = floorNumber;

                //Change base interior reference visible floor
                this.changeInteriorReferenceLayerVisibleFloor(floorNumber, interiorReferenceLayer)

                //Change Food and Dining visible by floor

                //Reset the floor buttons to show which floor was selected
                dom.byId("0floor").className = "button-floor";
                dom.byId("1floor").className = "button-floor";
                dom.byId("2floor").className = "button-floor";
                dom.byId("3floor").className = "button-floor";
                dom.byId("4floor").className = "button-floor";
                // dom.byId("5floor").className = "floorButton";

                dom.byId(floorNumber + 'floor').className = "button-floor-selected";
            },

            changeInteriorReferenceLayerVisibleFloor: function (floorNumber, interiorReferenceLayer) {
                var targetSubLayer;
                var oldSubLayer;
                var floorTitle;

                //Get the floor title based on selected floor number. Use this title to determine sub layers to turn on/off after finding it. These values come from the InteriorReference web service
                switch (floorNumber) {
                    case "0":
                        floorTitle = "Basement"
                        break;
                    case "1":
                        floorTitle = "1st Floor";
                        break;
                    case "2":
                        floorTitle = "2nd Floor";
                        break;
                    case "3":
                        floorTitle = "3rd Floor";
                        break;
                    case "4":
                        floorTitle = "4th Floor";
                        break;
                    // case "5":
                    //     floorTitle = "5th Floor";
                    //     break;
                    // case "6":
                    //     floorTitle = "6th Floor";
                    //     break;
                    default:
                };
                
                //Find the floor layers to turn off (This is the floor that was visible before clicking a new floor number)
                var t = this.selectedFloorTitle;
                oldSubLayer = interiorReferenceLayer.allSublayers.find(function (sublayer) {
                    return sublayer.title === t;
                });

                //Turn off all floor sublayers currently visible in map
                oldSubLayer.visible = false;
                arrayUtils.forEach(oldSubLayer.sublayers.items, function (sub) {
                    sub.visible = false;
                });

                //Find the floor layers to turn on
                targetSubLayer = interiorReferenceLayer.allSublayers.find(function (sublayer) {
                    return sublayer.title === floorTitle;
                });

                //Turn on layers for current floor
                targetSubLayer.visible = true;
                arrayUtils.forEach(targetSubLayer.sublayers.items, function (sub) {
                    sub.visible = true;
                });

                //Set the global floor title value
                this.selectedFloorTitle = floorTitle;
            }
        })
    }
);