/* Module for get connected/graduation events */
define([
    'dojo/_base/declare',
    'esri/layers/FeatureLayer'
], function (declare, FeatureLayer) {
    return declare(null, {
        /* Create feature layers, popups, and symbology */
        convocation: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/getConnected/Graduation_Events/FeatureServer/0',
            outFields: ['*'],
            popupTemplate: {
                title: '{Title}',
                content: `{Description}`
            },
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/ec45a714812545f781dbfbf86135b5e7/data",
                    width: '64px',
                    height: '64px',
                    yoffset: '32px'
                }
            }
        }),

        parking: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/getConnected/Graduation_Events/FeatureServer/1',
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/f988937e9369446f81dbb5cfdee7130b/data",
                    width: '64px',
                    height: '64px',
                    yoffset: '32px'
                }
            }
        }),

        fridayEvents: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/getConnected/FridayEvents/FeatureServer/4',
            outFields: ['*'],
            popupTemplate: {
                title: '{Title}',
                content: `{Description}`
            },
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/48165771fa3048e5bc3c92d4e3b0e412/data",
                    width: '64px',
                    height: '64px',
                    yoffset: '32px'
                }
            }
        }),

        fridayRegistration: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/getConnected/FridayEvents/FeatureServer/5',
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/d45ff7d3e9aa4931b29a3854ebd11d13/data",
                    width: '64px',
                    height: '64px',
                    yoffset: '32px'
                }
            }
        }),

        saturdayEvents: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/getConnected/FridayEvents/FeatureServer/7',
            outFields: ['*'],
            popupTemplate: {
                title: '{Title}',
                content: `{Description}`
            },
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/8d8d1724bd6846849585e22ec46586c3/data",
                    width: '64px',
                    height: '64px',
                    yoffset: '32px'
                }
            }
        }),

        saturdayRegistration: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/getConnected/FridayEvents/FeatureServer/8',
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/3bb9b40a612a4a09be85be6f3a3777b2/data",
                    width: '64px',
                    height: '64px',
                    yoffset: '32px'
                }
            }
        }),

        advising: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/getConnected/Student_Services/FeatureServer/2',
            outFields: ['*'],
            popupTemplate: {
                title: '{Title}',
                content: `{Description}`
            },
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/683222fac32a42b28ba4017e492e6983/data",
                    width: '64px',
                    height: '64px',
                    yoffset: '32px'
                }
            }
        }),

        bookstore: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/getConnected/Student_Services/FeatureServer/3',
            outFields: ['*'],
            popupTemplate: {
                title: '{Title}',
                content: `{Description}`
            },
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/e50c1751cb31407a89b87c6124ea1146/data",
                    width: '64px',
                    height: '64px',
                    yoffset: '32px'
                }
            }
        }),

        finance: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/getConnected/Student_Services/FeatureServer/4',
            outFields: ['*'],
            popupTemplate: {
                title: '{Title}',
                content: `{Description}`
            },
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/1c295dabd1ac46bca0ec777b0620130a/data",
                    width: '64px',
                    height: '64px',
                    yoffset: '32px'
                }
            }
        }),

        health: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/getConnected/Student_Services/FeatureServer/5',
            outFields: ['*'],
            popupTemplate: {
                title: '{Title}',
                content: `{Description}`
            },
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/7d2b3f87523b4f5abcc11cf9d2228f57/data",
                    width: '64px',
                    height: '64px',
                    yoffset: '32px'
                }
            }
        }),

        iCard: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/getConnected/Student_Services/FeatureServer/6',
            outFields: ['*'],
            popupTemplate: {
                title: '{Title}',
                content: `{Description}`
            },
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/cfc36b1f91af4d3baf13d3ccf310a807/data",
                    width: '64px',
                    height: '64px',
                    yoffset: '32px'
                }
            }
        }),

        parkingPermit: new FeatureLayer({
            url: 'https://tomlinson.byui.edu/arcgis/rest/services/getConnected/Student_Services/FeatureServer/7',
            outFields: ['*'],
            popupTemplate: {
                title: '{Title}',
                content: `{Description}`
            },
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'picture-marker',
                    url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/3a15c703853c45a6b02521929b3c66ef/data",
                    width: '64px',
                    height: '64px',
                    yoffset: '32px'
                }
            }
        }),
        /* Function to add/remove layers to the map
         * @param {string} layerId - DOM id for feature layer 
         * @param map - esri map
         * @param {boolean} checked - checkbox input status
         */
        turnOnLayer: function (layerId, map, checked) {
            switch (layerId) {
                case 'convocation':
                    if (checked == true)
                        map.add(this.convocation);
                    else
                        map.remove(this.convocation);
                    break;
                case 'parking':
                    if (checked == true)
                        map.add(this.parking);
                    else
                        map.remove(this.parking);
                    break;
                case 'friday-events':
                    if (checked == true)
                        map.add(this.fridayEvents);
                    else
                        map.remove(this.fridayEvents);
                    break;
                case 'friday-registration':
                    if (checked == true)
                        map.add(this.fridayRegistration);
                    else
                        map.remove(this.fridayRegistration);
                    break;
                case 'saturday-events':
                    if (checked == true)
                        map.add(this.saturdayEvents);
                    else
                        map.remove(this.saturdayEvents);
                    break;
                case 'saturday-registration':
                    if (checked == true)
                        map.add(this.saturdayRegistration);
                    else
                        map.remove(this.saturdayRegistration);
                    break;
                case 'advising':
                    if (checked == true)
                        map.add(this.advising);
                    else
                        map.remove(this.advising);
                    break;
                case 'bookstore':
                    if (checked == true)
                        map.add(this.bookstore);
                    else
                        map.remove(this.bookstore);
                    break;
                case 'finance':
                    if (checked == true)
                        map.add(this.finance);
                    else
                        map.remove(this.finance);
                    break;
                case 'health':
                    if (checked == true)
                        map.add(this.health);
                    else
                        map.remove(this.health);
                    break;
                case 'iCard':
                    if (checked == true)
                        map.add(this.iCard);
                    else
                        map.remove(this.iCard);
                    break;
                case 'parking-permit':
                    if (checked == true)
                        map.add(this.parkingPermit);
                    else
                        map.remove(this.parkingPermit);
                    break;
                default:
            }
        }
    })
});