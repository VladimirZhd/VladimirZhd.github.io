define([
    'esri/layers/VectorTileLayer',
    'dojo/_base/declare',
    'esri/layers/FeatureLayer'
], function (VectorTileLayer, declare, FeatureLayer) {
    return declare(null, {
        floors: null,
        interriorReferenceLayer: null,
        interriorReferenceLayerMinScale: null,
        loaded: false,

        constructor: function (options) {
            this.interiorReferenceLayerMinScale = options.interiorReferenceLayerMinScale || null;
        },

        addVectorLayersToMap: function (map) {
            let basement = new VectorTileLayer({
                url: "https://tomlinson.byui.edu/arcgis/rest/services/Hosted/Basement/VectorTileServer",
                visible: false,
                id: "B"
            });

            let firstFloor = new VectorTileLayer({
                url: "https://tomlinson.byui.edu/arcgis/rest/services/Hosted/1st_Floor/VectorTileServer",
                visible: true,
                id: 1
            });

            let secondFoor = new VectorTileLayer({
                url: "https://tomlinson.byui.edu/arcgis/rest/services/Hosted/2nd_Floor/VectorTileServer",
                visible: false,
                id: 2
            });

            let thirdFloor = new VectorTileLayer({
                url: "https://tomlinson.byui.edu/arcgis/rest/services/Hosted/3rd_Floor/VectorTileServer",
                visible: false,
                id: 3
            });

            let fourthFloor = new VectorTileLayer({
                url: "https://tomlinson.byui.edu/arcgis/rest/services/Hosted/4th_Floor/VectorTileServer",
                visible: false,
                id: 4
            });

            let fifthFloor = new VectorTileLayer({
                url: "https://tomlinson.byui.edu/arcgis/rest/services/Hosted/5th_Floor/VectorTileServer",
                visible: false,
                id: 5
            });
            this.floors = [basement, firstFloor, secondFoor, thirdFloor, fourthFloor, fifthFloor];
            map.addMany(this.floors);
        },



        getInterirorVectorLayerMinScale: function (map) {
            let buildingInteriorSpace = new FeatureLayer({
                url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/campusFeatures/MapServer/7',
                visible: false
            });
            map.add(buildingInteriorSpace);

            if (this.interriorReferenceLayerMinScale) {
                return this.interriorReferenceLayerMinScale
            } else {
                this.interriorReferenceLayerMinScale = buildingInteriorSpace.minScale;
            }
        }
    });
});