define([
    'dojo/_base/declare',
    'esri/tasks/support/Query',
    'esri/tasks/QueryTask',
    'esri/layers/FeatureLayer',
    "esri/geometry/Point",
], function (declare, query, task, FeatureLayer, Point) {
    return declare(null, {
        layer: new FeatureLayer({
            url: "https://tomlinson.byui.edu/arcgis/rest/services/interactive/SectionViews/FeatureServer/0",
            outFields: ['*'],
            popupTemplate: {
                title: function(feature) {
                    if (feature.graphic.attributes.Location == "HRT-GYM") {
                        return "HART GYM: " + feature.graphic.attributes.SECTION;
                    }
                    else {
                        return "BYU-I Center: " + feature.graphic.attributes.SECTION;
                    }
                },
                content: function (feature) {
                    let viewImages = new Map([
                        [1, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [2, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [3, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [4, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [5, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [6, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [7, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [8, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [9, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [10, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [11, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [12, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [13, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [14, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [15, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [16, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [17, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [18, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [19, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [20, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [21, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [22, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [23, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [24, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [25, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [26, "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data"],
                        [27, "url"],
                        [28, "url"],
                        [29, "url"],
                        [30, "url"],
                        [31, "url"],
                        [32, "url"],
                        [33, "url"],
                        [34, "url"],
                        [35, "url"],
                        [36, "url"],
                        [37, "url"],
                        [38, "url"],
                        [39, "url"],
                        [40, "url"],
                        [41, "url"],
                        [42, "url"],
                        [43, "url"],
                        [44, "url"],
                        [45, "url"],
                        [46, "url"],
                        [47, "url"],
                        [48, "url"],
                        [49, "url"],
                        [50, "url"],
                        [51, "url"],
                        [52, "url"],
                        [53, "url"],
                        [54, "url"],
                        [55, "url"],
                        [56, "url"],
                        [57, "url"],
                        [58, "url"],
                        [59, "url"],
                        [60, "url"],
                    ]);
                    let div = document.createElement("div");
                    div.innerHTML = "<img src=\"" + viewImages.get(feature.graphic.attributes.OBJECTID) + "\"/>"
                    return div;
                }
            }
        }),
        getSceneView: async function (section, build, view) {
            if (section != null) {
                let hasPercent = section.includes("%");
                if (hasPercent == true) {
                    section = section.replace("%", " ");
                }
                let t = new task("https://tomlinson.byui.edu/arcgis/rest/services/interactive/SectionViews/FeatureServer/0");
                let q = new query();
                q.where = "SECTION = " + "'" + section + "' AND Location ='" + build + "'";
                q.returnGeometry = true;
                q.outFields = ['OBJECTID'];
                let event = await t.execute(q).then(function (evt) {
                    return evt;
                });
                view.goTo({ target: event.features[0], zoom: 19 });
            }
        },
        getSceneLayer: function (map, view) {
            map.add(this.layer);
            let fLayer = this.layer;
            let btnClear = document.createElement('button');
            btnClear.classList = 'nav-btn';
            btnClear.innerHTML = "Clear";
            btnClear.addEventListener("click", function () {
                map.remove(fLayer);
                view.ui.remove(btnClear);
            });
            view.ui.add(btnClear, "top-trailing");
        }
    })
})



