define([
    'dojo/_base/declare',
    'esri/tasks/support/Query',
    'esri/tasks/QueryTask',
], function (declare, query, task) {
    return declare(null, {
        getSearchTerm: async function (url, search, view) {
            let build = url.searchParams.get("building");
            let room = url.searchParams.get("room");
            let booth = url.searchParams.get("booth");
            let place = url.searchParams.get("space");
            let space = url.searchParams.get("place");

            if (build != null && room != null) {
                search.searchTerm = build + room;
            }

            if (booth != null) {
                search.searchTerm = booth;
            }

            if (place != null && space == null) {
                search.searchTerm = place;
            }

            if (place != null && space != null) {
                search.searchTerm = space + place;
            }

            if (build != null && room == null) {
                let t = new task("https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/4");
                let q = new query();
                q.where = "BUILDINGID = " + "'" + build + "'";
                q.outFields = "[SHORTNAME]";
                let event = await t.execute(q).then(function (evt) {
                    return evt;
                });
                search.searchTerm = event.features[0].attributes.SHORTNAME;
            }
        }
    })

});