define([
    'dojo/_base/declare',
    'esri/tasks/support/Query',
    'esri/tasks/QueryTask',
], function (declare, query, task) {
    return declare(null, {
        hrtSec1: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f385b530c24341798c8651b770d710ff/data",
        getSceneView: async function (section, build, view, floorButton, lf, dom) {
            if (section != null) {
                let hasPercent = section.includes("%");
                if (hasPercent == true) {
                    section = section.replace("%", " ");
                }
                let t = new task("https://tomlinson.byui.edu/arcgis/rest/services/interactive/SectionViews/FeatureServer/0");
                let q = new query();
                q.where = "SECTION = " + "'" + section + "' AND Location ='" + build + "'";
                q.returnGeometry = true;
                let event = await t.execute(q).then(function (evt) {
                    return evt;
                });
                if (build == "HRT-GYM") {
                    floorButton.setVisibleFloor("2", lf.floors, dom);
                }
                view.goTo({ target: event.features[0], zoom: 19 });
                view.popup.open({
                    title: build + " " + section,
                    content: "<p><img src=\"" + this.hrtSec1 + "\"/></p>"
                });
            }
        }
    })
})



