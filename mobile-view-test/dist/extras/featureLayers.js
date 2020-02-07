define([
    'dojo/_base/declare',
    'esri/layers/FeatureLayer'
], function (declare, FeatureLayer) {
    return declare(null, {
        featureLayer: null,
        iconRenderer: null,


        turnOnLayer: function (layerId, map, checked) {
            console.log(checked);
            switch (layerId) {
                case 'baby':
                    this.featureLayer = new FeatureLayer({});
                    this.featureLayer.url = "https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/1";
                    this.iconRenderer = {
                        type: 'simple',
                        symbol: {
                            type: 'picture-marker',
                            url: "http://127.0.0.1:5502/src/img/changingStation.png",
                            width: '50px',
                            height: '50px'
                        }
                    };
                    this.featureLayer.renderer = this.iconRenderer;
                    if (checked == true) {
                        map.add(this.featureLayer);
                    }
                    if (checked == false) {
                        this.featureLayer.visible = false;
                        this.featureLayer = null;
                        
                    }
                    break;

                case 'bike':
                    this.featureLayer.url = 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/2';
                    this.iconRenderer = {
                        type: 'simple',
                        symbol: {
                            type: 'picture-marker',
                            url: "http://127.0.0.1:5502/src/img/bikerack.png",
                            width: '50px',
                            height: '50px'
                        }
                    };
                    this.featureLayer.renderer = this.iconRenderer;
                    map.add(this.featureLayer);
                    break;

                case 'booth':
                    this.featureLayer.url = 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/3';
                    this.iconRenderer = {
                        type: 'simple',
                        symbol: {
                            type: 'picture-marker',
                            url: "http://127.0.0.1:5502/src/img/booth.png",
                            width: '50px',
                            height: '50px'
                        }
                    };
                    this.featureLayer.renderer = this.iconRenderer;
                    map.add(this.featureLayer);
                    break;

                case 'food':
                    this.featureLayer.url = 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/4';
                    this.iconRenderer = {
                        type: 'simple',
                        symbol: {
                            type: 'picture-marker',
                            url: "http://127.0.0.1:5502/src/img/foodAndDining.png",
                            width: '50px',
                            height: '50px'
                        }
                    };
                    this.featureLayer.renderer = this.iconRenderer;
                    map.add(this.featureLayer);
                    break;

                case 'mothers-lounge':
                    this.featureLayer.url = 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/5';
                    this.iconRenderer = {
                        type: 'simple',
                        symbol: {
                            type: 'picture-marker',
                            url: "http://127.0.0.1:5502/src/img/mothersLounge.png",
                            width: '50px',
                            height: '50px'
                        }
                    };
                    this.featureLayer.renderer = this.iconRenderer;
                    map.add(this.featureLayer);
                    break;

                case 'bw-printer':
                    this.featureLayer.url = 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/7';
                    this.iconRenderer = {
                        type: 'simple',
                        symbol: {
                            type: 'picture-marker',
                            url: "http://127.0.0.1:5502/src/img/bwprinter.png",
                            width: '50px',
                            height: '50px'
                        }
                    };
                    this.featureLayer.renderer = this.iconRenderer;
                    map.add(this.featureLayer);
                    break;

                case 'clr-printer':
                    this.featureLayer.url = 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/8';
                    this.iconRenderer = {
                        type: 'simple',
                        symbol: {
                            type: 'picture-marker',
                            url: "http://127.0.0.1:5502/src/img/colorprinter.png",
                            width: '50px',
                            height: '50px'
                        }
                    };
                    this.featureLayer.renderer = this.iconRenderer;
                    map.add(this.featureLayer);
                    break;

                case 'copy-scan':
                    this.featureLayer.url = 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/9';
                    this.iconRenderer = {
                        type: 'simple',
                        symbol: {
                            type: 'picture-marker',
                            url: "http://127.0.0.1:5502/src/img/copyscanemail.png",
                            width: '50px',
                            height: '50px'
                        }
                    };
                    this.featureLayer.renderer = this.iconRenderer;
                    map.add(this.featureLayer);
                    break;

                case 'vending':
                    this.featureLayer.url = 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/menuFeatures/MapServer/0';
                    this.iconRenderer = {
                        type: 'simple',
                        symbol: {
                            type: 'picture-marker',
                            url: "http://127.0.0.1:5502/src/img/vendingMachine.png",
                            width: '50px',
                            height: '50px'
                        }
                    };
                    this.featureLayer.renderer = this.iconRenderer;
                    map.add(this.featureLayer);
                    break;
                default:
            }
        }
    })
})