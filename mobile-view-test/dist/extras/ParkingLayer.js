define([
    'dojo/_base/declare',
    'esri/layers/FeatureLayer',
    'esri/layers/MapImageLayer'
], function (declare, FeatureLayer, MapImageLayer) {
    return declare(null, {
        event: new MapImageLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/MapServer',
            sublayers: [
                {
                    id: 0,
                    visible: true
                }
            ]
        }),

        child: new MapImageLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/MapServer',
            sublayers: [
                {
                    id: 1,
                    visible: true
                }
            ]
        }),

        staff: new MapImageLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/MapServer',
            sublayers: [
                {
                    id: 2,
                    visible: true
                }
            ]
        }),

        ward: new MapImageLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/MapServer',
            sublayers: [
                {
                    id: 3,
                    visible: true
                }
            ]
        }),

        north: new MapImageLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/MapServer',
            sublayers: [
                {
                    id: 4,
                    visible: true
                }
            ]
        }),

        south: new MapImageLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/MapServer',
            sublayers: [
                {
                    id: 5,
                    visible: true
                }
            ]
        }),

        housing: new MapImageLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/MapServer',
            sublayers: [
                {
                    id: 6,
                    visible: true
                }
            ]
        }),

        longTerm: new MapImageLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/MapServer',
            sublayers: [
                {
                    id: 7,
                    visible: true
                }
            ]
        }),

        winterLT: new MapImageLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/MapServer',
            sublayers: [
                {
                    id: 8,
                    visible: true
                }
            ]
        }),

        FaWiLT: new MapImageLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/MapServer',
            sublayers: [
                {
                    id: 9,
                    visible: true
                }
            ]
        }),

        economy: new MapImageLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/MapServer',
            sublayers: [
                {
                    id: 10,
                    visible: true
                }
            ]
        }),

        visitors: new MapImageLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/MapServer',
            sublayers: [
                {
                    id: 11,
                    visible: true
                }
            ]
        }),


        turnOnParkingLayer: function (layerId, map, checked) {
            switch (layerId) {
                case 'event':
                    if (checked == true)
                        map.add(this.event);
                    else
                        map.remove(this.event);
                    break;
                case 'child':
                    if (checked == true)
                        map.add(this.child);
                    else
                        map.remove(this.child);
                    break;
                case 'staff':
                    if (checked == true)
                        map.add(this.staff);
                    else
                        map.remove(this.staff);
                    break;
                case 'ward':
                    if (checked == true)
                        map.add(this.ward);
                    else
                        map.remove(this.ward);
                    break;
                case 'north':
                    if (checked == true)
                        map.add(this.north);
                    else
                        map.remove(this.north);
                    break;
                case 'south':
                    if (checked == true)
                        map.add(this.south);
                    else
                        map.remove(this.south);
                    break;
                case 'housing':
                    if (checked == true)
                        map.add(this.housing);
                    else
                        map.remove(this.housing);
                    break;
                case 'longTerm':
                    if (checked == true)
                        map.add(this.longTerm);
                    else
                        map.remove(this.longTerm);
                    break;
                case 'winterLT':
                    if (checked == true)
                        map.add(this.winterLT);
                    else
                        map.remove(this.winterLT);
                    break;
                case '':
                    if (checked == true)
                        map.add(this.event);
                    else
                        map.remove(this.event);
                    break;
                case 'FaWiLT':
                    if (checked == true)
                        map.add(this.FaWiLT);
                    else
                        map.remove(this.FaWiLT);
                    break;
                case 'economy':
                    if (checked == true)
                        map.add(this.economy);
                    else
                        map.remove(this.economy);
                    break;
                case 'visitors':
                    if (checked == true)
                        map.add(this.visitors);
                    else
                        map.remove(this.visitors);
                    break;
            }
        }

    })
});