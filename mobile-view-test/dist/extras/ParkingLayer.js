define([
    'dojo/_base/declare',
    'esri/layers/FeatureLayer',
    'esri/layers/MapImageLayer'
], function (declare, FeatureLayer, MapImageLayer) {
    return declare(null, {
        event: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/FeatureServer/0'
        }),

        child: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/FeatureServer/1'
        }),

        staff: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/FeatureServer/2'
        }),

        ward: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/FeatureServer/3'
        }),

        north: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/FeatureServer/4'
        }),

        south: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/FeatureServer/5'
        }),

        housing: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/FeatureServer/6'
        }),

        longTerm: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/FeatureServer/7'
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

        economy: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/FeatureServer/10'
        }),

        visitors: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/FeatureServer/11'
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