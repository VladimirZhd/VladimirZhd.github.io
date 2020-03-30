define([
    'dojo/_base/declare',
    'dojo/dom',
    'esri/Graphic',
    'esri/geometry/geometryEngine',
    'esri/layers/FeatureLayer',
    'esri/tasks/support/Query',
    'esri/tasks/QueryTask',
    'esri/geometry/support/webMercatorUtils',
    "esri/layers/GraphicsLayer",
    'esri/geometry/Extent'
], function (declare, dom, Graphic, geometryEngine, FeatureLayer, Query, QueryTask, webMercatorUtils, GraphicsLayer, Extent) {
    return declare(null, {
        currentFloor: '1',
        currentSelection: null,
        restroom: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/10',
        }),
        fountain: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/12'
        }),
        elevator: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/13'
        }),
        printer: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/8'
        }),
        fire: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/11'
        }),
        aed: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/7'
        }),
        vending: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/9'
        }),
        graphicsLayer: new GraphicsLayer({}),


        queryNearest: function (featureLayer, layerBufferWebMercator) {
            let queryBuffTask = new QueryTask(featureLayer);
            let queryBuff = new Query();
            queryBuff.geometry = layerBufferWebMercator;
            queryBuff.returnGeometry = true;
            queryBuff.outFields = ['*'];
            let result = queryBuffTask.execute(queryBuff);
            return result;
        },

        changeCurrentFloor: function (floorId) {
            this.currentFloor = floorId;
        },

        displayPopUp(floors, popup) {
            document.getElementById('nearest-item').innerHTML = 'printers';
            document.getElementById('found-item').innerHTML = 'printer(s)';
            popup.style.display = 'block';
            document.getElementById('found').style.display = 'block';
            document.getElementById('found-floor').innerHTML = floors;
            setTimeout(function () { popup.style.display = 'none'; }, 3000);
        },

        displayNearest: async function (layer, locationPoint, map, view, index) {
            this.currentSelection = index;
            layer.removeAll();
            let result;
            let point = {
                type: 'point',
                latitude: locationPoint.latitude,
                longitude: locationPoint.longitude
            };
            let pointMarker = {
                type: 'simple-marker',
                color: '#007AC2',
                size: '14px',
                outline: {
                    color: [0, 255, 255],
                    width: 2
                }
            };
            let pointGraphic = new Graphic({
                geometry: point,
                symbol: pointMarker
            });
            layer.add(pointGraphic);
            let floor = this.currentFloor;
            let count = 0;
            let set = new Set();
            let popup = dom.byId('popup-warning');
            let floors = [];
            switch (index) {
                case 0:
                    result = this.incrementBuffer(locationPoint, this.restroom.parsedUrl.path);
                    result.then(function (evt) {
                        view.center = evt[2];
                        view.extent = evt[1];
                        console.log(this.currentSelection);
                        evt[0].features.forEach(function (feature) {
                            if (feature.attributes.FLOOR == floor) {
                                count++;
                                let g = new Graphic();
                                if (feature.attributes.TYPE == 'FEMALE') {
                                    g = {
                                        geometry: feature.geometry,
                                        attributes: feature.attributes,
                                        symbol: {
                                            type: 'picture-marker',
                                            url: 'https://tomlinson.byui.edu/portal/sharing/rest/content/items/d75df889bfbb452389c4658fa77ad6d6/data',
                                            width: '64px',
                                            height: '64px',
                                            yoffset: '32px'
                                        }
                                    }
                                }
                                if (feature.attributes.TYPE == 'MALE') {
                                    g = {
                                        geometry: feature.geometry,
                                        attributes: feature.attributes,
                                        symbol: {
                                            type: 'picture-marker',
                                            url: 'https://tomlinson.byui.edu/portal/sharing/rest/content/items/05b6496cc5f547cbba755234aaf3420c/data',
                                            width: '64px',
                                            height: '64px',
                                            yoffset: '32px'
                                        }
                                    }
                                }
                                if (feature.attributes.TYPE == 'FAMILY') {
                                    g = {
                                        geometry: feature.geometry,
                                        attributes: feature.attributes,
                                        symbol: {
                                            type: 'picture-marker',
                                            url: 'https://tomlinson.byui.edu/portal/sharing/rest/content/items/b6d855e18bf04b1c96f9cdfa53b794fc/data',
                                            width: '64px',
                                            height: '64px',
                                            yoffset: '32px'
                                        }
                                    }
                                }
                                if (feature.attributes.TYPE == 'MOTHER') {
                                    g = {
                                        geometry: feature.geometry,
                                        attributes: feature.attributes,
                                        symbol: {
                                            type: 'picture-marker',
                                            url: 'https://tomlinson.byui.edu/portal/sharing/rest/content/items/55ce763449f84cdca3bac2debcdc4776/data',
                                            width: '64px',
                                            height: '64px',
                                            yoffset: '32px'
                                        }
                                    }
                                }
                                layer.add(g);
                            }
                            set.add(" " + feature.attributes.FLOOR);
                            floors = [...set];
                        });
                    });
                    if (await result) {
                        if (count == 0) {
                            document.getElementById('nearest-item').innerHTML = 'restrooms';
                            document.getElementById('found-item').innerHTML = 'restroom(s)';
                            popup.style.display = 'block';
                            document.getElementById('found-floor').innerHTML = floors;
                            setTimeout(function () { popup.style.display = 'none'; }, 5000);
                        }
                    }
                    break;
                case 1:
                    result = this.incrementBuffer(locationPoint, this.printer.parsedUrl.path);
                    result.then(function (evt) {
                        view.center = evt[2];
                        view.extent = evt[1];
                        evt[0].features.forEach(function (feature) {
                            if (feature.attributes.Floor == floor) {
                                count++;
                                let g = new Graphic({
                                    geometry: feature.geometry,
                                    attributes: feature.attributes,
                                    symbol: {
                                        type: 'picture-marker',
                                        url: 'https://tomlinson.byui.edu/portal/sharing/rest/content/items/9daeacb316954b4dbd5bb5380c82c9b4/data',
                                        width: '64px',
                                        height: '64px',
                                        yoffset: '32px'
                                    }
                                });
                                layer.add(g);
                            }
                            set.add(' ' + feature.attributes.Floor);
                            floors = [...set];
                        });
                    });
                    if (await result) {
                        if (count == 0) {
                            document.getElementById('nearest-item').innerHTML = 'printers';
                            document.getElementById('found-item').innerHTML = 'printer(s)';
                            popup.style.display = 'block';
                            document.getElementById('found-floor').innerHTML = floors;
                            setTimeout(function () { popup.style.display = 'none'; }, 4000);
                        }
                    }
                    break;
                case 2:
                    result = this.incrementBuffer(locationPoint, this.fountain.parsedUrl.path);
                    result.then(function (evt) {
                        view.center = evt[2];
                        view.extent = evt[1];
                        evt[0].features.forEach(function (feature) {
                            if (feature.attributes.FLOOR == floor) {
                                count++;
                                let g = new Graphic({
                                    geometry: feature.geometry,
                                    attributes: feature.attributes,
                                    symbol: {
                                        type: 'picture-marker',
                                        url: 'https://tomlinson.byui.edu/portal/sharing/rest/content/items/927b05e70d3d4a33978a55bd34d98156/data',
                                        width: '64px',
                                        height: '64px',
                                        yoffset: '32px'
                                    }
                                });
                                layer.add(g);
                            }
                            set.add(feature.attributes.FLOOR);
                            floors = [...set];
                        });
                    });
                    if (await result) {
                        if (count == 0) {
                            document.getElementById('nearest-item').innerHTML = 'drinking fountains';
                            document.getElementById('found-item').innerHTML = 'drinking fontain(s)';
                            popup.style.display = 'block';
                            document.getElementById('found-floor').innerHTML = floors;
                            setTimeout(function () { popup.style.display = 'none'; }, 4000);
                        }
                    }
                    break;
                case 3:
                    result = this.incrementBuffer(locationPoint, this.aed.parsedUrl.path);
                    result.then(function (evt) {
                        view.center = evt[2];
                        view.extent = evt[1];
                        evt[0].features.forEach(function (feature) {
                            if (feature.attributes.FLOOR == floor) {
                                count++;
                                let g = new Graphic({
                                    geometry: feature.geometry,
                                    attributes: feature.attributes,
                                    symbol: {
                                        type: 'picture-marker',
                                        url: 'https://tomlinson.byui.edu/portal/sharing/rest/content/items/a2bde6d508cd4b2c8fc265412ff71c97/data',
                                        width: '64px',
                                        height: '64px',
                                        yoffset: '32px'
                                    }
                                });
                                layer.add(g);
                            }
                            set.add(feature.attributes.FLOOR);
                            floors = [...set];
                        });
                    });
                    if (await result) {
                        if (count == 0) {
                            document.getElementById('nearest-item').innerHTML = "AED's";
                            document.getElementById('found-item').innerHTML = 'AED(s)';
                            popup.style.display = 'block';
                            document.getElementById('found-floor').innerHTML = floors;
                            setTimeout(function () { popup.style.display = 'none'; }, 4000);
                        }
                    }
                    break;
                case 4:
                    result = this.incrementBuffer(locationPoint, this.elevator.parsedUrl.path);
                    result.then(function (evt) {
                        view.center = evt[2];
                        view.extent = evt[1];
                        evt[0].features.forEach(function (feature) {
                            if (feature.attributes.FLOOR == floor) {
                                count++;
                                let g = new Graphic({
                                    geometry: feature.geometry,
                                    attributes: feature.attributes,
                                    symbol: {
                                        type: 'picture-marker',
                                        url: 'https://tomlinson.byui.edu/portal/sharing/rest/content/items/444d4103775c425aaa84490b8611cf61/data',
                                        width: '64px',
                                        height: '64px',
                                        yoffset: '32px'
                                    }
                                });
                                layer.add(g);
                            }
                            set.add(feature.attributes.FLOOR);
                            floors = [...set];
                        });
                    });
                    if (await result) {
                        if (count == 0) {
                            document.getElementById('nearest-item').innerHTML = 'elevators';
                            document.getElementById('found-item').innerHTML = 'elevator(s)';
                            popup.style.display = 'block';
                            document.getElementById('found-floor').innerHTML = floors;
                            setTimeout(function () { popup.style.display = 'none'; }, 4000);
                        }
                    }
                    break;
                case 5:
                    result = this.incrementBuffer(locationPoint, this.vending.parsedUrl.path);
                    result.then(function (evt) {
                        view.center = evt[2];
                        view.extent = evt[1];
                        evt[0].features.forEach(function (feature) {
                            if (feature.attributes.Floor == floor) {
                                count++;
                                let g = new Graphic({
                                    geometry: feature.geometry,
                                    attributes: feature.attributes,
                                    symbol: {
                                        type: 'picture-marker',
                                        url: 'https://tomlinson.byui.edu/portal/sharing/rest/content/items/855a85653467457c94cebc6edfcdacbf/data',
                                        width: '64px',
                                        height: '64px',
                                        yoffset: '32px'
                                    }
                                });
                                layer.add(g);
                            }
                            set.add(feature.attributes.Floor);
                            floors = [...set];
                        });
                    });
                    if (await result) {
                        if (count == 0) {
                            document.getElementById('nearest-item').innerHTML = 'vendings';
                            document.getElementById('found-item').innerHTML = 'vending(s)';
                            popup.style.display = 'block';
                            document.getElementById('found-floor').innerHTML = floors;
                            setTimeout(function () { popup.style.display = 'none'; }, 4000);
                        }
                    }
                    break;
                case 6:
                    result = this.incrementBuffer(locationPoint, this.fire.parsedUrl.path);
                    result.then(function (evt) {
                        view.center = evt[2];
                        view.extent = evt[1];
                        evt[0].features.forEach(function (feature) {
                            let g = new Graphic({
                                geometry: feature.geometry,
                                attributes: feature.attributes,
                                symbol: {
                                    type: 'picture-marker',
                                    url: 'https://tomlinson.byui.edu/portal/sharing/rest/content/items/3c9d050e2d9a4dd5930ca54e558b24e9/data',
                                    width: '64px',
                                    height: '64px',
                                    yoffset: '32px'
                                }
                            });
                            layer.add(g);
                        });
                    });
                    break;
                default:
            }
            map.remove(map.findLayerById(layer.uid));
            map.add(layer);
        },

        incrementBuffer: async function (locationPoint, featureLayer) {
            let increment = 150;
            let length = 0;
            let tempR;
            let layerBuffer;
            let layerBufferWebMercator;
            while (length < 1) {
                layerBuffer = geometryEngine.geodesicBuffer(locationPoint, increment, 'feet');
                layerBufferWebMercator = webMercatorUtils.geographicToWebMercator(layerBuffer);
                tempR = await this.queryNearest(featureLayer, layerBufferWebMercator).then(function (evt) {
                    length = evt.features.length;
                    console.log(length);
                    return evt;
                });
                increment += 25;
            }
            let ext = new Extent({
                xmin: layerBufferWebMercator.extent.xmin,
                ymin: layerBufferWebMercator.extent.ymin,
                xmax: layerBufferWebMercator.extent.xmax,
                ymax: layerBufferWebMercator.extent.ymax,
                spatialReference: layerBufferWebMercator.extent.spatialReference.wkid
            });
            let center = [layerBufferWebMercator.extent.center.longitude, layerBufferWebMercator.extent.center.latitude]
            return [tempR, ext, center];
        }
    })
})
