define([
    'dojo/_base/declare',
    'esri/request'
], function (declare, esriRequest) {
    return declare(null, {

        getParkingSymbols: function () {

            let url = 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/MapServer/queryLegends?size=640&returnVisibleOnly=false&f=json';
            esriRequest(url, {
                responceType: 'json'
            }).then((res) => {
                console.log(res.data.layers);
                res.data.layers.forEach((layer) => {
                    let layerName = layer.layerName;
                    let symbol = layer.legend[0].imageData
                    let img = "<img class='parking-symbology' src=\"data:image/png;base64," + symbol + "\" />";

                    switch (layerName) {
                        case 'Event Parking':
                            $('#parking-item--event').before(img);
                            break;
                        case 'Child Lab':
                            $('#parking-item--child').before(img);
                            break;
                        case 'Faculty / Staff':
                            $('#parking-item--staff').before(img);
                            break;
                        case '4th Ward':
                            $('#parking-item--ward').before(img);
                            break;
                        case 'North':
                            $('#parking-item--north').before(img);
                            break;
                        case 'South':
                            $('#parking-item--south').before(img);
                            break;
                        case 'Housing':
                            $('#parking-item--housing').before(img);
                            break;
                        case 'Long-Term':
                            $('#parking-item--long').before(img);
                            break;
                        case 'Winter Long-Term':
                            $('#parking-item--winterLong').before(img);
                            break;
                        case 'FW Long-Term':
                            $('#parking-item--fwLong').before(img);
                            break;
                        case 'Economy':
                            $('#parking-item--economy').before(img);
                            break;
                        case 'Visitors':
                            $('#parking-item--visitors').before(img);
                            break;
                        default:
                    }
                    console.log(layerName);
                    // console.log(symbol);
                })
            }).catch((err) => {
                console.error(err);
            })
        }
    })
});