define([
    'dojo/_base/declare',
    'esri/tasks/support/Query',
    'esri/tasks/QueryTask',
    'esri/layers/FeatureLayer',
    "dojo"
], function (declare, query, task, FeatureLayer, dojo) {
    return declare(null, {
        currentFloor: null,
        layersMap: new Map([
            ["1", new FeatureLayer({
                url: "https://tomlinson.byui.edu/arcgis/rest/services/SeatingSection/SeatingSection_1/FeatureServer/0",
                outFields: ['*'],
                popupTemplate: {
                    outFields: ['SECTION', 'ImageURL', 'Location', 'FLOOR'],
                    title: function (feature) {
                        if (feature.graphic.attributes.Location == "HRT-GYM") {
                            return "HART GYM " + feature.graphic.attributes.SECTION;
                        }
                        else {
                            return "BYU-I Center " + feature.graphic.attributes.SECTION;
                        }
                    },
                    content: function (feature) {
                        let div = document.createElement("div");
                        div.innerHTML = "<img style='margin-top:10px;' src=\"" + feature.graphic.attributes.ImageURL + "\"/>";
                        return div;
                    }
                }
            })],
            ["2", new FeatureLayer({
                url: "https://tomlinson.byui.edu/arcgis/rest/services/SeatingSection/SeatingSection_2/FeatureServer/0",
                outFields: ['*'],
                popupTemplate: {
                    outFields: ['SECTION', 'ImageURL', 'Location', 'FLOOR'],
                    title: function (feature) {
                        if (feature.graphic.attributes.Location == "HRT-GYM") {
                            return "HART GYM " + feature.graphic.attributes.SECTION;
                        }
                        else {
                            return "BYU-I Center " + feature.graphic.attributes.SECTION;
                        }
                    },
                    content: function (feature) {
                        let div = document.createElement("div");
                        div.innerHTML = "<img style='margin-top:10px;' src=\"" + feature.graphic.attributes.ImageURL + "\"/>";
                        return div;
                    }
                }
            })],
            ["3", new FeatureLayer({
                url: "https://tomlinson.byui.edu/arcgis/rest/services/SeatingSection/SeatingSection_3/FeatureServer/0",
                outFields: ['*'],
                popupTemplate: {
                    outFields: ['SECTION', 'ImageURL', 'Location', 'FLOOR'],
                    title: function (feature) {
                        if (feature.graphic.attributes.Location == "HRT-GYM") {
                            return "HART GYM " + feature.graphic.attributes.SECTION;
                        }
                        else {
                            return "BYU-I Center " + feature.graphic.attributes.SECTION;
                        }
                    },
                    content: function (feature) {
                        let div = document.createElement("div");
                        div.innerHTML = "<img style='margin-top:10px;' src=\"" + feature.graphic.attributes.ImageURL + "\"/>";
                        return div;
                    }
                }
            })],
            ["4", new FeatureLayer({
                url: "https://tomlinson.byui.edu/arcgis/rest/services/SeatingSection/SeatingSection_4/FeatureServer/0",
                outFields: ['*'],
                popupTemplate: {
                    outFields: ['SECTION', 'ImageURL', 'Location', 'FLOOR'],
                    title: function (feature) {
                        if (feature.graphic.attributes.Location == "HRT-GYM") {
                            return "HART GYM " + feature.graphic.attributes.SECTION;
                        }
                        else {
                            return "BYU-I Center " + feature.graphic.attributes.SECTION;
                        }
                    },
                    content: function (feature) {
                        let div = document.createElement("div");
                        div.innerHTML = "<img style='margin-top:10px;' src=\"" + feature.graphic.attributes.ImageURL + "\"/>";
                        return div;
                    }
                }
            })]]
        ),
        defaultFloorLayer: new FeatureLayer({
            url: "https://tomlinson.byui.edu/arcgis/rest/services/SeatingSection/SeatingSection_default/FeatureServer/0",
            outFields: ['*'],
            popupEnabled: false
        }),
        getSceneView: async function (section, build, view) {
            let hasPercent = section.includes("%");
            if (hasPercent == true) {
                section = section.replace("%", " ");
            }
            let t = new task("https://tomlinson.byui.edu/arcgis/rest/services/SeatingSection/SeatingSection_default/FeatureServer/0");
            let q = new query();
            q.where = "SECTION = " + "'" + section + "' AND Location ='" + build + "'";
            q.returnGeometry = true;
            q.outFields = ["*"];
            let event = await t.execute(q).then(function (evt) {
                return evt;
            });
            view.goTo({ target: event.features[0], zoom: 19 });
            let floor = event.features.map(function (feature) {
                return feature.attributes.FLOOR;
            });
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", false, true);
            dojo.byId(floor + 'floor').dispatchEvent(evt);
        },
        getSceneLayer: function (map, view, fb) {
            let cFloor = fb.get("cid");
            map.add(this.defaultFloorLayer);
            map.add(this.layersMap.get(cFloor));
            this.currentFloor = cFloor;
            fb.watch("cid", function () {
                if (this.currentFloor != null) {
                    let cFloor = fb.get("cid");
                    map.remove(this.layersMap.get(this.currentFloor));
                    map.add(this.layersMap.get(cFloor));
                    this.currentFloor = cFloor;
                }
            }.bind(this));
            let btnClear = document.createElement('button');
            btnClear.classList = 'nav-btn';
            btnClear.innerHTML = "Clear";
            btnClear.addEventListener("click", function () {
                map.remove(this.defaultFloorLayer);
                map.remove(this.layersMap.get(this.currentFloor));
                view.ui.remove(btnClear);
                this.currentFloor = null;
            }.bind(this));
            view.ui.add(btnClear, "top-trailing");
        }
    })
})



