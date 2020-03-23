define([
    'esri/layers/FeatureLayer',
    'dojo/_base/declare',
    'esri/PopupTemplate'
], function (FeatureLayer, declare, PopupTemplate) {
    return declare(null, {
        sources: [
            {
                layer: new FeatureLayer({
                    url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/4',
                    outFields: ['*']
                }),
                searchFields: ["BUILDINGID", "SHORTNAME", "LONGNAME", "SEARCHALIAS", "INFORMATION", "MAINNAVIGATIONROOM"],
                displayField: 'SHORTNAME',
                exactMatch: false,
                outFields: ['*'],
                name: 'Buildings',
                placeholder: 'Kimball',
                maxCharacters: 2,
                maxSuggestions: 5,
                autonavigate: true,
                popupTemplate: new PopupTemplate({
                    title: "{LONGNAME} Building",
                    content: "<p><img src=\"http://www.byui.edu/images/buildings/{BUILDINGID}.jpg\" /></p>" +
                        "<p><strong>Hours:</strong> {OPERDAYS} {OPERHOURS}</p>" +
                        "<p><strong>Info:</strong> {INFORMATION}</p>"
                }),
                resultGraphicEnabled: false
            },
            {
                layer: new FeatureLayer({
                    url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/0',
                    outFields: ['*']
                }),
                searchFields: ['LONGNAME', 'FLOOR', 'SHORTNAME', 'SPACETYPE', 'BUILDING'],
                displayField: 'LONGNAME',
                exactMatch: false,
                outFields: ['*'],
                name: 'Rooms',
                placeholder: 'KIM170',
                maxResults: 15,
                minSuggestCharacters: 2,
                maxSuggestions: 15,
                autonavigate: true,
                popupTemplate: new PopupTemplate({
                    title: "Room: {LONGNAME}",
                    content: `<p><strong>Room:</strong> {SHORTNAME}</p>` +
                        "<p><strong>Building:</strong> {BUILDING}</p>" +
                        "<p><strong>Floor:</strong> {FLOOR} </p>" +
                        "<p><strong>Space Type:</strong> {SPACETYPE}</p>"
                }),
                resultGraphicEnabled: true,
                resultSymbol: {
                    type: 'picture-marker',
                    url: 'https://tomlinson.byui.edu/portal/sharing/rest/content/items/d45ff7d3e9aa4931b29a3854ebd11d13/data',
                    width: '64px',
                    height: '64px',
                    yoffset: '32px'
                },
                scale: 200
            },
            {
                layer: new FeatureLayer({
                    url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/5',
                    outFields: ['*']
                }),
                searchFields: ['SHORTNAME', 'LONGNAME', 'OBJECTID', 'DESCRIP', 'SPACETYPE'],
                displayField: 'DESCRIP',
                exactMatch: false,
                outFields: ['*'],
                name: 'Outdoor places',
                placeholder: 'Example: stadium field',
                maxResults: 15,
                minSuggestCharacters: 4,
                maxSuggestions: 5,
                autoNavigate: true,
                popupTemplate: new PopupTemplate({
                    title: "{DESCRIP}",
                    content: "<p><strong>Info:</strong> {SPACETYPE}</p>"
                }),
                resultGraphicEnabled: false
            },
            {
                layer: new FeatureLayer({
                    url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/1',
                    outFields: ['*']
                }),
                searchFields: ['NAME', 'BUILDING', 'FLOOR', 'HOURS', 'DESCRIP'],
                displayField: 'NAME',
                exactMatch: false,
                outFields: ['*'],
                name: 'Food and Dining',
                placeholder: 'Example: Fries',
                maxResults: 15,
                minSuggestCharacters: 2,
                maxSuggestions: 5,
                autoNavigate: true,
                resultSymbol: {
                    type: 'picture-marker',
                    url: 'https://tomlinson.byui.edu/portal/sharing/rest/content/items/54215fb119fe49c68855fd42078e7069/data',
                    height: '64px',
                    width: '64px'
                },
                resultGraphicEnabled: true,
                popupTemplate: new PopupTemplate({
                    title: "{NAME}",
                    content: "<p><strong>Hours:</strong> {HOURS}</p>" +
                        "<p><strong>Info:</strong> {DESCRIP}</p>" +
                        "<p><strong>Floor: </strong> {FLOOR}</p>"
                })
            },
            {
                layer: new FeatureLayer({
                    url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/2',
                    outFields: ['*']
                }),
                searchFields: ['LOTNAME', 'PERMITTYPE'],
                displayField: 'LOTNAME',
                exactMatch: false,
                outFelds: ['*'],
                name: 'Parking',
                placeholder: 'Exampe: Taylor lot',
                maxResults: 15,
                minSuggestCharacters: 1,
                maxSuggestions: 5,
                autoNavigate: true,
                resultGraphicEnabled: false
            }
        ]
    })
})