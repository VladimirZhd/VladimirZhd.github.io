define([
    'dojo/_base/declare',
    'esri/layers/FeatureLayer',
    'dojo/on',
    'dojo/dom'
], function (declare, FeatureLayer, on, dom) {
    return declare(null, {
        currentFloor: "1",

        featureLayerBaby: new FeatureLayer({
            url: "https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/1",
            outFields: ['*'],
            popupTemplate: {
                title: '{TYPE} restroom',
                content: 'This is a {TYPE} restroom on the {FLOOR} floor'
            },
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/b91ec1d719704cc9809d5aa519418f3d/data",
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
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/eeea98a8ae2b4b41bcb7a85abb33d010/data",
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
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/251eb928faf645d2b6eb6d210e2b8f2c/data",
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
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/54215fb119fe49c68855fd42078e7069/data",
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
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/55ce763449f84cdca3bac2debcdc4776/data",
                    width: '50px',
                    height: '50px'
                }
            }
        }),

        featureLayerBwPrinter: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/6',
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/9daeacb316954b4dbd5bb5380c82c9b4/data",
                    width: '50px',
                    height: '50px'
                }
            }
        }),

        featureLayerClrPrinter: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/7',
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/d9109de72b154d30a6b639f0ab678cc2/data",
                    width: '50px',
                    height: '50px'
                }
            }
        }),

        featureLayerCopyScan: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/8',
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/eb70818451354c98bf49128e9c7442dd/data",
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
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/855a85653467457c94cebc6edfcdacbf/data",
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
                    if (checked == true) {
                        map.add(this.featureLayerBike);
                    }
                    else
                        map.remove(this.featureLayerBike);
                    break;

                case 'booth':
                    if (checked == true) {
                        let sql = "FLOOR = " + this.currentFloor;
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
        },

        activeFloor: function () {
            let floor;
            on(dom.byId('floorLayers'), 'click', function () { 
                let active = dom.byId(document.getElementsByClassName("button-floor-selected"));
                floor = active[0].innerText;
                console.log(floor);
            });
            return floor;
        }
    })
})