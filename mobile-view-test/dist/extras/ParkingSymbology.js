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
                res.data.layers.forEach((layer) => {
                    let layerName = layer.layerName;
                    let symbol = layer.legend[0].imageData

                    switch (layerName) {
                        case 'Event Parking':
                            document.styleSheets[1].insertRule(`#parking-item--event:before { 
                                content: url(data:image/png;base64,${symbol}); 
                                background-size: 30px 30px;
                                background-repeat: no-repeat;
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                                padding-right: 8px;
                                margin-bottom: -10px;
                            }`, 0);
                            break;
                        case 'Child Lab':
                            document.styleSheets[1].insertRule(`#parking-item--child:before { 
                                content: url(data:image/png;base64,${symbol}); 
                                background-size: 30px 30px;
                                background-repeat: no-repeat;
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                                padding-right: 8px;
                                margin-bottom: -10px;
                            }`, 0);
                            break;
                        case 'Faculty / Staff':
                            document.styleSheets[1].insertRule(`#parking-item--staff:before { 
                                content: url(data:image/png;base64,${symbol}); 
                                background-size: 30px 30px;
                                background-repeat: no-repeat;
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                                padding-right: 8px;
                                margin-bottom: -10px;
                            }`, 0);
                            break;
                        case '4th Ward':
                            document.styleSheets[1].insertRule(`#parking-item--ward:before { 
                                content: url(data:image/png;base64,${symbol}); 
                                background-size: 30px 30px;
                                background-repeat: no-repeat;
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                                padding-right: 8px;
                                margin-bottom: -10px;
                            }`, 0);
                            break;
                        case 'North':
                            document.styleSheets[1].insertRule(`#parking-item--north:before { 
                                content: url(data:image/png;base64,${symbol}); 
                                background-size: 30px 30px;
                                background-repeat: no-repeat;
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                                padding-right: 8px;
                                margin-bottom: -10px;
                            }`, 0);
                            break;
                        case 'South':
                            document.styleSheets[1].insertRule(`#parking-item--south:before { 
                                content: url(data:image/png;base64,${symbol}); 
                                background-size: 30px 30px;
                                background-repeat: no-repeat;
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                                padding-right: 8px;
                                margin-bottom: -10px;
                            }`, 0);
                            break;
                        case 'Housing':
                            document.styleSheets[1].insertRule(`#parking-item--housing:before { 
                                content: url(data:image/png;base64,${symbol}); 
                                background-size: 30px 30px;
                                background-repeat: no-repeat;
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                                padding-right: 8px;
                                margin-bottom: -10px;
                            }`, 0);
                            break;
                        case 'Long-Term':
                            document.styleSheets[1].insertRule(`#parking-item--long:before { 
                                content: url(data:image/png;base64,${symbol}); 
                                background-size: 30px 30px;
                                background-repeat: no-repeat;
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                                padding-right: 8px;
                                margin-bottom: -10px;
                            }`, 0);
                            break;
                        case 'Winter Long-Term':
                            document.styleSheets[1].insertRule(`#parking-item--winterLong:before { 
                                content: url(data:image/png;base64,${symbol});
                                background-size: 30px 30px;
                                background-repeat: no-repeat;
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                                padding-right: 8px;
                                margin-bottom: -10px;
                            }`, 0);
                            break;
                        case 'FW Long-Term':
                            document.styleSheets[1].insertRule(`#parking-item--fwLong:before { 
                                content: url(data:image/png;base64,${symbol}); 
                                background-size: 30px 30px;
                                background-repeat: no-repeat;
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                                padding-right: 8px;
                                margin-bottom: -10px;
                            }`, 0);
                            break;
                        case 'Economy':
                            document.styleSheets[1].insertRule(`#parking-item--economy:before { 
                                content: url(data:image/png;base64,${symbol}); 
                                background-size: 30px 30px;
                                background-repeat: no-repeat;
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                                padding-right: 8px;
                                margin-bottom: -10px;
                            }`, 0);
                            break;
                        case 'Visitors':
                            document.styleSheets[1].insertRule(`#parking-item--visitors:before { 
                                content: url(data:image/png;base64,${symbol}); 
                                background-size: 30px 30px;
                                background-repeat: no-repeat;
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                                padding-right: 8px;
                                margin-bottom: -10px;
                            }`, 0);
                            break;
                        default:
                    }
                })
            }).catch((err) => {
                console.error(err);
            })
        }
    })
});