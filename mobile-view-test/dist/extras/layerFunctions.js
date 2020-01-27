define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "esri/core/watchUtils",
    "esri/layers/MapImageLayer",
    "esri/layers/TileLayer",
    "esri/layers/VectorTileLayer"
],
    function (declare, lang, watchUtils, MapImageLayer, TileLayer, VectorTileLayer) {
        return declare(null, {
            interiorReferenceLayer: null,
            interiorReferenceLayerMinScale: null,
            loaded: false, 

            constructor: function (options) {
                this.interiorReferenceLayerMinScale = options.interiorReferenceLayerMinScale || null;
            },

            addBaseReferenceLayers: function (map) {
                /*Add building layer with representation of buildings as 3D images exported from Revit models.*/
                var tileLayer3DBuilding = new TileLayer({
                    url: "https://maps.byui.edu/arcgis/rest/services/Interactive/3DBuilding/MapServer",
                    maxScale: 1500
                });

                // map.add(tileLayer3DBuilding);

                /*Add interior reference layer to map. This layer shows interior room numbers, bathrooms, drinking fountains. It is toggled by the floor buttons*/
                this.interiorReferenceLayer = new MapImageLayer({
                    id: "interiorReferenceLayer",
                    url: "https://maps.byui.edu/arcgis/rest/services/Interactive/InteriorReference/MapServer/"
                });
                
                map.add(this.interiorReferenceLayer);                                             
            },

            getInteriorReferenceLayerMinScale: function ()
            {
                if (this.interiorReferenceLayerMinScale)
                    return this.interiorReferenceLayerMinScale
                else
                {
                    //Find the minimum scale of the Building Interior Spaces in the InteriorReference web service to show floor buttons when zoomed in to the proper level.
                    var buildingInteriorSpaceSubLayer = this.interiorReferenceLayer.allSublayers.find(function (sublayer) {
                        return sublayer.title === "Building Interior Spaces";
                    });
                    this.interiorReferenceLayerMinScale = buildingInteriorSpaceSubLayer.minScale;
                }
            }
        })
    }
);