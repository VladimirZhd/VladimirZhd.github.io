define([
    'dojo/_base/declare',
    'esri/layers/FeatureLayer'
], function (declare, FeatureLayer) {
    return declare(null, {
        currentFloor: "1",

        featureLayerBaby: new FeatureLayer({
            url: "https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/1",
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "http://127.0.0.1:5502/src/img/changingStation.png",
                    width: '50px',
                    height: '50px'
                }
            }
        }),

        featureLayerBike: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/2',
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "http://127.0.0.1:5502/src/img/bikerack.png",
                    width: '50px',
                    height: '50px'
                }
            }
        }),

        featureLayerBooth: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/3',
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "http://127.0.0.1:5502/src/img/booth.png",
                    width: '50px',
                    height: '50px'
                }
            }
        }),

        featureLayerFood: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/4',
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "http://127.0.0.1:5502/src/img/foodAndDining.png",
                    width: '50px',
                    height: '50px'
                }
            }
        }),

        featureLayerMothersLounge: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/5',
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "http://127.0.0.1:5502/src/img/mothersLounge.png",
                    width: '50px',
                    height: '50px'
                }
            }
        }),

        featureLayerBwPrinter: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/7',
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "http://127.0.0.1:5502/src/img/bwprinter.png",
                    width: '50px',
                    height: '50px'
                }
            }
        }),

        featureLayerClrPrinter: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/8',
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "http://127.0.0.1:5502/src/img/colorprinter.png",
                    width: '50px',
                    height: '50px'
                }
            }
        }),

        featureLayerCopyScan: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/9',
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "http://127.0.0.1:5502/src/img/copyscanemail.png",
                    width: '50px',
                    height: '50px'
                }
            }
        }),

        featureLayerVending: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/0',
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "http://127.0.0.1:5502/src/img/vendingMachine.png",
                    width: '50px',
                    height: '50px'
                }
            }
        }),

        changeCurrentFloor: function (floorId) {
            this.currentFloor = floorId;
        },

        turnOnLayer: function (layerId, map, checked) {
            switch (layerId) {
                case 'baby':
                    if (checked == true) {
                        let sql = "FLOOR = " + this.currentFloor;
                        this.featureLayerBaby.definitionExpression = sql;
                        map.add(this.featureLayerBaby);
                    }
                    else
                        map.remove(this.featureLayerBaby);
                    break;

                case 'bike':
                    if (checked == true)
                        map.add(this.featureLayerBike);
                    else
                        map.remove(this.featureLayerBike);
                    break;

                case 'booth':
                    if (checked == true) {
                        let sql = "Floor = " + this.currentFloor;
                        this.featureLayerBooth.definitionExpression = sql;
                        map.add(this.featureLayerBooth);
                    }
                    else
                        map.remove(this.featureLayerBooth);
                    break;

                case 'food':
                    if (checked == true) {
                        let sql = "FLOOR = " + this.currentFloor;
                        this.featureLayerFood.definitionExpression = sql;
                        map.add(this.featureLayerFood);
                    }
                    else
                        map.remove(this.featureLayerFood);
                    break;

                case 'mothers-lounge':
                    if (checked == true) {
                        let sql = "FLOOR = " + this.currentFloor;
                        this.featureLayerMothersLounge.definitionExpression = sql;
                        map.add(this.featureLayerMothersLounge);
                    }
                    else
                        map.remove(this.featureLayerMothersLounge);
                    break;

                case 'bw-printer':
                    if (checked == true) {
                        let sql = "FLOOR = " + this.currentFloor;
                        this.featureLayerBwPrinter.definitionExpression = sql;
                        map.add(this.featureLayerBwPrinter);
                    }
                    else
                        map.remove(this.featureLayerBwPrinter);
                    break;

                case 'clr-printer':
                    if (checked == true) {
                        let sql = "FLOOR = " + this.currentFloor;
                        this.featureLayerClrPrinter.definitionExpression = sql;
                        map.add(this.featureLayerClrPrinter);
                    }
                    else
                        map.remove(this.featureLayerClrPrinter);
                    break;

                case 'copy-scan':
                    if (checked == true) {
                        let sql = "FLOOR = " + this.currentFloor;
                        this.featureLayerCopyScan.definitionExpression = sql;
                        map.add(this.featureLayerCopyScan);
                    }
                    else
                        map.remove(this.featureLayerCopyScan);
                    break;

                case 'vending':
                    if (checked == true) {
                        let sql = "FLOOR = " + this.currentFloor;
                        this.featureLayerVending.definitionExpression = sql;
                        map.add(this.featureLayerVending);
                    }
                    else
                        map.remove(this.featureLayerVending);
                    break;
                default:
            }
        }
    })
})