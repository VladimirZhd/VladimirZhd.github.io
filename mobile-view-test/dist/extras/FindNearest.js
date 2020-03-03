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
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/12',
        }),
        fountain: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/7'
        }),
        elevator: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/3'
        }),
        printer: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/11'
        }),
        fire: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/8'
        }),
        aed: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/4'
        }),
        vending: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/interactive/mapSearch/MapServer/0'
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

        displayNearest: function (locationPoint, map, view, index) {
            this.currentSelection = index;
            let newGraphicsLayer = new GraphicsLayer();
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
            newGraphicsLayer.add(pointGraphic);
            let floor = this.currentFloor;
            let count = 0;
            let popup = dom.byId('popup-warning');
            let floors = [];
            switch (index) {
                case 0:
                    result = this.incrementBuffer(locationPoint, this.restroom.parsedUrl.path);
                    this.graphicsLayer.removeAll();
                    result.then(function (evt) {
                        view.center = evt[2];
                        view.extent = evt[1];
                        console.log(view.extent);
                        evt[0].features.forEach(function (feature) {
                            console.log(feature);
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
                                newGraphicsLayer.add(g);
                                floors += feature.attributes.FLOOR + ', ';
                                if (count == 0) {
                                    document.getElementById('nearest-item').innerHTML = 'restrooms';
                                    document.getElementById('found-item').innerHTML = 'restroom(s)';
                                    popup.style.display = 'block';
                                    document.getElementById('found').style.display = 'block';
                                    document.getElementById('found-floor').innerHTML = floors;
                                    setTimeout(function () { popup.style.display = 'none'; }, 4000);
                                }
                            }
                        });
                    });
                    break;
                case 1:
                    result = this.incrementBuffer(locationPoint, this.printer.parsedUrl.path);
                    this.graphicsLayer.removeAll();
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
                                newGraphicsLayer.add(g);
                            }
                            floors += feature.attributes.Floor + ', ';
                            if (count == 0) {
                                document.getElementById('nearest-item').innerHTML = 'printers';
                                document.getElementById('found-item').innerHTML = 'printer(s)';
                                popup.style.display = 'block';
                                document.getElementById('found').style.display = 'block';
                                document.getElementById('found-floor').innerHTML = floors;
                                setTimeout(function () { popup.style.display = 'none'; }, 4000);
                            }
                        });
                    });
                    break;
                case 2:
                    result = this.incrementBuffer(locationPoint, this.fountain.parsedUrl.path);
                    this.graphicsLayer.removeAll();
                    result.then(function (evt) {
                        view.center = evt[2];
                        view.extent = evt[1];
                        evt[0].features.forEach(function (feature) {
                            if (feature.attributes.FLOOR == floor) {
                                count++;
                                console.log(count);
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
                                newGraphicsLayer.add(g);
                            }
                            floors += feature.attributes.FLOOR + ', ';
                            if (count == 0) {
                                document.getElementById('nearest-item').innerHTML = 'drinking fountains';
                                document.getElementById('found-item').innerHTML = 'drinking fountain(s)';
                                popup.style.display = 'block';
                                document.getElementById('found').style.display = 'block';
                                document.getElementById('found-floor').innerHTML = floors;
                                setTimeout(function () { popup.style.display = 'none'; }, 4000);
                            }
                        });
                    });
                    break;
                case 3:
                    result = this.incrementBuffer(locationPoint, this.aed.parsedUrl.path);
                    this.graphicsLayer.removeAll();
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
                                newGraphicsLayer.add(g);
                            }
                            floors += feature.attributes.FLOOR + ', ';
                            if (count == 0) {
                                document.getElementById('nearest-item').innerHTML = 'AEDs';
                                document.getElementById('found-item').innerHTML = 'AED(s)';
                                popup.style.display = 'block';
                                document.getElementById('found').style.display = 'block';
                                document.getElementById('found-floor').innerHTML = floors;
                                setTimeout(function () { popup.style.display = 'none'; }, 4000);
                            }
                        });
                    });
                    break;
                case 4:
                    result = this.incrementBuffer(locationPoint, this.elevator.parsedUrl.path);
                    this.graphicsLayer.removeAll();
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
                                newGraphicsLayer.add(g);
                            }
                            floors += feature.attributes.FLOOR + ', ';
                            if (count == 0) {
                                document.getElementById('nearest-item').innerHTML = 'elevators';
                                document.getElementById('found-item').innerHTML = 'elevator(s)';
                                popup.style.display = 'block';
                                document.getElementById('found').style.display = 'block';
                                document.getElementById('found-floor').innerHTML = floors;
                                setTimeout(function () { popup.style.display = 'none'; }, 4000);
                            }
                        });
                    });
                    break;
                case 5:
                    result = this.incrementBuffer(locationPoint, this.vending.parsedUrl.path);
                    this.graphicsLayer.removeAll();
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
                                newGraphicsLayer.add(g);
                            }
                            floors += feature.attributes.Floor + ', ';
                            if (count == 0) {
                                document.getElementById('nearest-item').innerHTML = 'vending machines';
                                document.getElementById('found-item').innerHTML = 'vending machine(s)';
                                popup.style.display = 'block';
                                document.getElementById('found').style.display = 'block';
                                document.getElementById('found-floor').innerHTML = floors;
                                setTimeout(function () { popup.style.display = 'none'; }, 4000);
                            }
                        });
                    });
                    break;
                case 6:
                    result = this.incrementBuffer(locationPoint, this.fire.parsedUrl.path);
                    this.graphicsLayer.removeAll();
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
                            newGraphicsLayer.add(g);
                        });
                    });
                    break;
                default:
            }

            map.remove(map.findLayerById(this.graphicsLayer.uid));
            this.graphicsLayer = newGraphicsLayer;
            map.add(this.graphicsLayer);
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
        },
    })
})
