
define([
    'dojo/_base/declare',
    "esri/tasks/RouteTask",
    "esri/tasks/support/RouteParameters",
    "esri/tasks/support/FeatureSet",
    "esri/Graphic",
    "esri/geometry/SpatialReference",
    "esri/geometry/Point",
    "esri/layers/FeatureLayer"
], function (declare, RouteTask, RouteParameters, FeatureSet, Graphic, SpatialReference, Point, FeatureLayer) {
    return declare(null, {
        routeTask: new RouteTask({
            url: "https://tomlinson.byui.edu/arcgis/rest/services/Routing/CampusRouting/NAServer/Route"
        }),
        startSymbol: {
            type: 'picture-marker',
            url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/e73acc6a42e64c9fa837b4517bde49d4/data",
            width: '64px',
            height: '64px',
            yoffset: '32px'
        },
        stopSymbol: {
            type: 'picture-marker',
            url: "https://tomlinson.byui.edu/portal/sharing/rest/content/items/9731c396c85543769d57754a790471cf/data",
            width: '64px',
            height: '64px',
            yoffset: '32px'
        },
        navSymbol: {
            type: "simple-marker",
            color: [18, 117, 167],
            outline: {
                color: [255, 255, 255],
                width: 1
            }
        },
        
        resultRoute: null,
        start: null,
        stop: null,
        navigatorID: null,
        intersectionLayer: null,
        navigationActive: false,

        async getRoute(view, position, coords, mode) {
            if (this.resultRoute != null) {
                this.clearRoute(view);
            }
            let pointA = new Point({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
            let pointB = new Point({
                latitude: coords.latitude,
                longitude: coords.longitude
            });

            let stopA = new Graphic(pointA, this.startSymbol);
            let stopB = new Graphic(pointB, this.stopSymbol);
            let routeParams = new RouteParameters({
                stops: new FeatureSet(),
                returnDirections: true,
                directionsOutputType: "complete",
                travelMode: mode,
                returnStops: true,
                returnRoutes: true,
                outSpatialReference: new SpatialReference({ "wkid": 4326 })
            });
            routeParams.stops.features.push(stopA);
            routeParams.stops.features.push(stopB);

            let routeGraphic = null;
            await this.routeTask.solve(routeParams).then(function (data) {
                
                data.routeResults.forEach(function (result) {
                    result.route.symbol = {
                        type: "simple-line",
                        color: [5, 150, 255],
                        width: 3
                    };
                    view.graphics.add(result.route);
                    routeGraphic = result.route;
                });

                stopA.geometry = new Point({latitude: data.routeResults[0].route.geometry.paths[0][0][1], 
                    longitude: data.routeResults[0].route.geometry.paths[0][0][0]});
            });
            view.graphics.add(stopA);
            view.graphics.add(stopB);
            this.start = stopA;
            this.stop = stopB;
            this.resultRoute = routeGraphic;
            this.getNavigationOptions(view);
        },

        getNavigationOptions(view) {
            if (this.navigationActive == true)
                return 0;
            this.navigationActive = true;
            let object = this;
            let startNavigationBtn = document.createElement("button");
            let stopNavigationBtn = document.createElement("button");
            let clearNavigationBtn = document.createElement("button");
            startNavigationBtn.classList = "nav-btn";
            stopNavigationBtn.classList = "nav-btn";
            clearNavigationBtn.classList = "nav-btn";
            startNavigationBtn.innerHTML = "Start Navigation";
            stopNavigationBtn.innerHTML = "Stop Navigation";
            clearNavigationBtn.innerHTML = "Clear Results";
            startNavigationBtn.addEventListener('click', startNavigation);
            stopNavigationBtn.addEventListener('click', stopNavigation);
            clearNavigationBtn.addEventListener('click', clearNavigation);
            view.ui.add(startNavigationBtn, "top-trailing");
            view.ui.add(stopNavigationBtn, "top-trailing");
            view.ui.add(clearNavigationBtn, "top-trailing");

            let navPoint = new Point({
                latitude: this.start.geometry.latitude,
                longitude: this.start.geometry.longitude
            })
            let locator = new Graphic(navPoint, this.navSymbol);

            function success(pos) {
                let crd = pos.coords;
                view.graphics.remove(locator);
                locator.geometry.latitude = crd.latitude;
                locator.geometry.longitude = crd.longitude;
                view.graphics.add(locator);
            };

            function startNavigation() {
                this.navigatorID = navigator.geolocation.watchPosition(success);
                view.graphics.add(locator);
                view.goTo({target: locator, zoom: 22});
            };

            function stopNavigation() {
                navigator.geolocation.clearWatch(this.navigatorID);
                view.graphics.remove(locator);
            };

            function clearNavigation() {
                this.navigationActive = false;
                stopNavigation();
                view.ui.remove(startNavigationBtn);
                view.ui.remove(stopNavigationBtn);
                view.ui.remove(clearNavigationBtn);
                object.clearRoute(view);
            };
        },

        clearRoute(view) {
            if (this.resultRoute != null) {
                view.graphics.remove(this.resultRoute);
                view.graphics.remove(this.start);
                view.graphics.remove(this.stop);
            }
        },
    })
});