define([
    'dojo/_base/declare',
    'esri/request'
], function (declare, esriRequest) {
    return declare(null, {

        getParkingSymbols: function () {

            esriRequest({
                url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/Parking_Lots/MapServer/queryLegends?size=640&returnVisibleOnly=false&f=json',
                responseType: 'json',
            }).then((result) => {
                console.log(result);
            }).catch((err) => {
                console.error(err);
            });

        }

    })

});