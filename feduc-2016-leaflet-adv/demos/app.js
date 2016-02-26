/**
 * Class for generating the icon for a cluster.
 * Adapted from https://github.com/SINTEF-9012/PruneCluster/blob/master/examples/realworld.50000-categories.html#L47-L147
 */
L.Icon.MarkerCluster = L.Icon.extend({
  /**
   * Default options will be merged with options are passed to `new L.Icon.MarkerCluster(options)`.
   * This is part of the Leaflet http://leafletjs.com/reference.html#class
   */
  options: {
    iconSize: new L.Point(56, 56),
    className: 'prunecluster leaflet-markercluster-icon',
    fillColor: '#FFFFFF',
    textColor: '#000000',
    ringWidth: 8,
    font: 'bold 14px sans-serif'
  },

  /**
   * Create the DOM element for this icon, in this case a <canvas> element
   * Overrides https://github.com/Leaflet/Leaflet/blob/master/src/layer/marker/Icon.js#L25-L27
   */
  createIcon: function () {
    var canvas = document.createElement('canvas');

    // adds the default leaflet icon classes to this so transitions work
    this._setIconStyles(canvas, 'icon');

    var size = this.options.iconSize;

    if (L.Browser.retina) {
      canvas.width = size.x + size.x;
      canvas.height = size.y + size.y;
    } else {
      canvas.width = size.x;
      canvas.height = size.y;
    }

    this.draw(canvas.getContext('2d'), canvas.width, canvas.height);

    return canvas;
  },


  /**
   * Create the DOM element for this icons shadow, in this case nothing
   * Overrides https://github.com/Leaflet/Leaflet/blob/master/src/layer/marker/Icon.js#L29-L31
   */
  createShadow: function () {
    return null;
  },

  /**
   * Draw the arcs and text on the <canvas>
   */
  draw: function(canvas, width, height) {
    // center of the circle
    var center = width / ((L.Browser.retina) ? 4 : 2);

    // radius of the outer rings
    var radius = width / ((L.Browser.retina) ? 4 : 2);

    // radius of the inner circle
    var radiusCenter = center - this.options.ringWidth;

    // double the scale if we are on a Retina display
    if (L.Browser.retina) {
      canvas.scale(2, 2);
    }

    // start position of our arc
    var arcStart = 0;

    // draw an arc for each category
    for (category in this.options.categoryColors) {
      var color = this.options.categoryColors[category];
      var size = this.stats[category] / this.population;

      if (size > 0) {
        canvas.beginPath();
        canvas.moveTo(center, center);
        canvas.fillStyle = color;
        var arcEnd = arcStart + size * Math.PI * 2;
        if (arcEnd < arcStart) {
          arcEnd = arcStart;
        }
        canvas.arc(center, center, radius, arcStart, arcEnd);
        arcStart = arcEnd;
        canvas.moveTo(center, center);
        canvas.fill();
        canvas.closePath();
      }
    }

    canvas.beginPath();
    canvas.fillStyle = 'white';
    canvas.moveTo(center, center);
    canvas.arc(center, center, radiusCenter, 0, Math.PI * 2);
    canvas.fill();
    canvas.closePath();
    canvas.fillStyle = '#454545';
    canvas.textAlign = 'center';
    canvas.textBaseline = 'middle';
    canvas.font = 'bold 13px sans-serif';
    canvas.fillText(this.population, center, center, radiusCenter * 2);
  }
});

/**
 * FeatureManager handles the requesting and filtering part of a feature layer.
 * An implimnetaiton of FeatureManager knows how to create, add and remove features
 * from a map but still inherits useful filtering methods like `setWhere`.
 */
var PruneClusterFeatureLayer = L.esri.FeatureManager.extend({
  // Override the initialize function to add some behavior when we create
  // a new `PruneClusterFeatureLayer`.
  initialize: function (options) {
    // This calls the `initalize` function on L.esri.FeatureManager.
    // It is similar to `super` in ES 6 classes or most other object oriented
    // languages just much more explict.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
    L.esri.FeatureManager.prototype.initialize.call(this, options);

    // L.setOptions will merge the default options for this class and its parent classes
    // with the passed options and create a single `this.options` reference we can use
    options = L.setOptions(this, options);

    // Creating a new map pane (<div>) that will sit on top of all other markers
    // This works around a PruneCluster bug when using vector markers
    var pane = map.createPane('categoryMarkers');
    pane.style.zIndex = 600;

    // create an instance of PruneCluster that we can use
    this._cluster = new PruneClusterForLeaflet();

    // create an internal store of all the markers we pass to PruneCluster
    // we will need this later.
    this._markers = {};

    // Override the BuildLeafletClusterIcon to tell PruneCluster how to create our
    // cluster icons using our L.Icon.MarkerCluster class.
    // L.Util.bind will make sure that `this` inside the function is our instance of
    // `PruneClusterFeatureLayer` not the `PruneClusterForLeaflet` instance.
    this._cluster.BuildLeafletClusterIcon = L.Util.bind(function(cluster) {
      var e = new L.Icon.MarkerCluster(this.options);
      e.stats = cluster.stats;
      e.population = cluster.population;
      return e;
    }, this);

    // if we define a `pointToLayer` function in the options we can override
    // `BuildLeafletMarker` so customize how PruneCluster builds individual markers
    if (this.options.pointToLayer) {
      this._cluster.BuildLeafletMarker = L.Util.bind(function(marker, latlng) {
        // call `this.options.pointToLayer` and pass it the latlng of the marker
        // and the category of the marker.
        var layer = this.options.pointToLayer.call(this,latlng, marker.category);

        // if our marker is an instance of L.Path (a vector marker)
        // lets set a fake `setOpacity` method on it so PruneCluster knows
        // how to hide it.
        if (layer instanceof L.Path) {
          layer.setOpacity = function (opacity) {
            this.setStyle({
              opacity: opacity,
              fillOpacity: opacity
            })
          }
        }

        // if our marker still doesn't have `setOpacity` make a false
        // function for it so we dont throw an error.
        if (!layer.setOpacity) {
          layer.setOpacity = L.Util.falseFn;
        }

        // if our marker doesn't have `setZIndexOffset` make a false
        // function for it so we dont throw an error. PruneCluster uses this
        // to ensure markers stay on top of clusters but we are using our internal
        // `categoryMarkers` pane for that
        if (!layer.setZIndexOffset) {
          layer.setZIndexOffset = L.Util.falseFn;
        }

        // setup the pane to ensure that the indivial markers stay on top of the cluster markers
        layer.options.pane = 'categoryMarkers';

        // call PruneClusters internal method to prep markers for clustering
        this._cluster.PrepareLeafletMarker(layer, marker.data, marker.category);

        // return our layer
        return layer;
      }, this);
    }
  },


  onAdd: function (map) {
    // call our parent `onAdd` method to start triggering loading
    L.esri.FeatureManager.prototype.onAdd.call(this, map);

    // add the PruneCluster to the map
    map.addLayer(this._cluster);
  },

  onRemove: function (map) {
    // call our parent `onRemove` method to cleanup
    L.esri.FeatureManager.prototype.onRemove.call(this, map);

    // remove the PruneCluster form the map
    map.removeLayer(this._cluster);
  },

  // Impliment the `createLayers` function from `FeatureManager`.
  // This is called whenever there is a successful request from the service and new
  // layers should be created. Keep in mind that the same feature be get passed more then once.
  createLayers: function (features) {
    // create an array of markers we will pass to PruneCluster later
    var markers = [];

    // loop over features and push new features into our markers array
    for (var i = 0; i < features.length; i++) {
      var feature = features[i];
      var id = feature.id;
      var lat = feature.geometry.coordinates[1];
      var lng = feature.geometry.coordinates[0];

      if(!this._markers[id]) {
        var marker = new PruneCluster.Marker(lat, lng, {feature: feature}, feature.properties.Fuel_Type);

        if (this._popup) {
          marker.data.popup = this._popup(marker.data.feature);
        }

        markers.push(marker);
      }
    }

    // for each of our markers store then in our `this._markers` object
    // This is so we can add/remove individual markersby their IDs later.
    for (var i = 0; i < markers.length; i++) {
      var marker = markers[i];
      var id = marker.data.feature.id;
      this._markers[id] = marker;
    }

    // register our array of new markers with PruneCluster
    this._cluster.RegisterMarkers(markers);

    // tell PruneCluster we are ready to update.
    this._cluster.ProcessView();
  },

  // Impliment the `addLayers` function from `FeatureManager`.
  // This function gets called when features have been added back to the map
  // as the result of a filtering operation
  addLayers: function (ids) {
    // loop over each ID and for the cooresponding marker mark it as filtered = false
    // this will make PruneCluster show it again on the next ProcessView
    for (var i = 0; i < ids.length; i++) {
      var id = ids[i];
      var marker = this._markers[id];
      marker.filtered = false;
    }

    // tell PruneCluster to update the view
    this._cluster.ProcessView();
  },

  // Impliment the `removeLayers` function from `FeatureManager`.
  // This function gets called when features have been removed back to the map
  // as the result of a filtering operation or when features are deleted
  // from the service (permanent deletion).
  removeLayers: function (ids, permanent) {
    // loop over each ID and find the cooresponding marker
    for (var i = 0; i < ids.length; i++) {
      var id = ids[i];
      var marker = this._markers[id];

      // if removal of thsi feature is permanent
      // we can delete it from the internal cache of markers
      // and remove it. Otherwise filter it.
      if (permanent) {
        delete this._markers[id]
        this._cluster.RemoveMarkers([marker]);
      } else {
        marker.filtered = true;
      }
    }

    // tell PruneCluster to update the view
    this._cluster.ProcessView();
  },

  // impliment a similar bindPopup method we can use to quickly create popups
  bindPopup: function (template) {
    // this._popup should be a function accepts the feature and returns a string
    this._popup = (typeof template === 'string') ? function(){return template} : template;

    // loop over each marker and generate a popup template for it
    for (var id in this._markers) {
      var marker = this._markers[id];
      marker.data.popup = this._popup(marker.data.feature);
    }

    // tell PruneCluster to update the view
    this._cluster.ProcessView();

    // return `this` (our PruneClusterFeatureLayer) so it can be chained
    return this;
  },

  unbindPopup: function () {
    // @TODO how do you tell PruneCluster to unbind a popup from an existing marker?
  }
});

// Override some behavior on PruneClusterLeafletSpiderfier to fix a bug.
// This shows using the `include` method from Leaflet's class system which can
// be used to overide methods on Classes without using extend. For example this
// replaces the existing onAdd and onRemove methods with our own.
PruneClusterLeafletSpiderfier.include({
  onAdd: function (map) {
    this._map.on('overlappingmarkers', this.Spiderfy, this);
    this._map.on('zoomend', this.Unspiderfy, this);
    this._map.on('dragend', this.Unspiderfy, this);
  },
  onRemove: function (map) {
    this._map.off('overlappingmarkers', this.Spiderfy, this);
    this._map.off('zoomend', this.Unspiderfy, this);
    this._map.off('dragend', this.Unspiderfy, this);
  }
});

// create a map with some rough US bounds sketched in
var map = L.map("map").fitBounds([ [20.30, -174.63], [52.32, -17.40] ]);

// locate the user on the map
map.locate({ setView: true, maxZoom: 14});

// create our tile layers
var tiles = L.esri.basemapLayer("DarkGray").addTo(map);
var labels = L.esri.basemapLayer("DarkGrayLabels").addTo(map);

// get the innerHTML of our popup template element
var popupTemplate = document.getElementById('popupTemplate').innerHTML;

// create and add our new feature layer.
// Remember these optiosn get passed to PruneClusterFeatureLayer,
// FeatureManager AND L.Icon.MarkerCluster.
var fuelStations = new PruneClusterFeatureLayer({
  // options for FeatureManager
  url: 'http://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Alternative_Fueling_Stations/FeatureServer/0',
  fields: [
    'FID2',
    'Fuel_Type',
    'Station_Na',
    'Street_Add',
    'City',
    'State',
    'ZIP',
    'Intersecti',
    'Station_Ph',
    'Groups_Wit',
    'Access_Day',
    'Latitude',
    'Longitude'
  ],

  // options for PruneClusterFeatureLayer
  categoryField: 'Fuel_Type',
  categoryColors: {
    CNG: '#9E559C',
    HY: '#F789D8',
    E85:  '#A7C636',
    LPG: '#149ECE',
    BD: '#FC921F',
    ELEC: '#ED5151',
    LNG: '#FFDE3E',
  },
  pointToLayer: function (latlng, category) {
    // create the individual markers
    return L.shapeMarkers.diamondMarker(latlng, 32, {
      color: this.options.categoryColors[category],
      fillColor: '#F1F1F1',
      stroke: true,
      weight: 6,
      lineJoin: 'square',
      fillOpacity: 1
    });
  },

  // options for Icon.MarkerCluster
  iconSize: new L.Point(56, 56),
  fillColor: '#F1F1F1',
  textColor: '#444444',
  ringWidth: 8,
  font: 'bold 14px sans-serif'
}).bindPopup(function (feature) {
  // this function gets called for every marker so just use Leaflets templating
  // function to return a unique template for that marker.
  return L.Util.template(popupTemplate, feature.properties);
}).addTo(map);

// L.esri.Task represents a call to an ArcGIS service. It can be extended to apply
// to any task and present a pretty and simplified UI.
var Directions = L.esri.Task.extend({
  // The path on the service. This gets appened to the URL of the service.
  path: 'solve',

  // Each `setter` create a method that corresponds to a param on the service.
  // for example calling `task.unit('esriNAUFeet')` would set the `directionsLengthUnits`
  // to 'esriNAUFeet'. Setters are useful when you want to simplify param names but still
  // pass through whatever value user passed to the service
  setters: {
    unit: 'directionsLengthUnits',
    diectionStyle: 'directionsStyleName',
    directionsOutput: 'directionsOutputType',
    returnRoutes: 'returnRoutes',
    returnStops: 'returnStops',
    returnDirections: 'returnDirections'
  },

  // There are default params that are copied as the defaults for each request.
  // This is a good palce to set options that you always want to be different from
  // the services defaults. For example `outSr` or units.
  params: {
    returnStops: true,
    outSr: 4326,
    directionsLengthUnits: 'esriNAUMiles'
  },

  // initalize a new task and setup some additional params.
  initialize: function (options) {
    // call the initialize method on our parent class (Task).
    L.esri.Task.prototype.initialize.call(this, options);

    // setup the `stops` param so other methods can use it later.
    this.params.stops = {
      features: []
    }
  },

  // Internal method to create an ArcGIS formatted stop from a LatLng and stop name
  _makeStop: function (latlng, name) {
    // L.esri.Util.geojsonToArcGIS is useful for converting GeoJSON (Leaflet) to
    // ArcGIS JSON that ArcGIS Services can understand.
    return L.esri.Util.geojsonToArcGIS({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [latlng.lng, latlng.lat]
      },
      properties: {
        Name: name
      }
    });
  },

  // define a starting point for our route
  start: function (latlng, name) {
    var stop = this._makeStop(latlng, name);
    this.params.stops.features.unshift(stop);
    return this;
  },

  // define a ending point for our route
  end: function (latlng, name) {
    var stop = this._makeStop(latlng, name);
    this.params.stops.features.push(stop);
    return this;
  },

  // run this task, processing the response and calling the users callback with
  // useful values.
  run: function (callback, context) {
    return this.request(function (error, response) {
      // L.esri.Util.responseToFeatureCollection can use used to translate large
      // sections of a response that are FeatureSets for GeoJSON FeatureCollections
      // for use in Leaflet.
      var route = L.esri.Util.responseToFeatureCollection(response.routes, 'ObjectID');

      // call the users callback with our processed response object.
      callback.call(context, error, {
        route: route
      });
    }, this);
  }
});

// most Leaflet and Esri Leaflet classes are instanciated through a "factory function"
// that will create a new object. As a rule-of-thumb use the lowercased "factory function"
// to create new instances and the uppercased class name to extend classes.
function directions (options) {
  return new Directions(options);
}

// Now we need to listen for click events on the button in our popup.
// We can set a single listener on the body to listen for all clicks and filter
// for the ones we want.
// http://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing
document.body.addEventListener('click', function (e) {
  // make sure this click event is from our <button> element not some other element on the page
  if(e.target.classList.contains('directions')) {
    // pull some data off the <button>
    var button = e.target;
    var lat = parseFloat(button.dataset.lat, 10);
    var lng = parseFloat(button.dataset.lng, 10);
    var name  = button.dataset.name;

    // start locating the user
    map.locate();

    // once a location is found get and render the directions.
    map.once('locationfound', function (e) {
      var start = e.latlng;
      var end = L.latLng(lat, lng);
      var bounds = L.latLngBounds(start, end).pad(0.25);
      map.fitBounds(bounds);

      // start a new directions request
      directions({
        url: 'http://utility.arcgis.com/usrsvcs/appservices/KwF9vdY8UtWV11oj/rest/services/World/Route/NAServer/Route_World/solve'
      })

      // start at the users location
      .start(start, 'Your Location')

      // end at the stop
      .end(end, name).run(function (error, response){

        // render the users location as a circle
        L.circleMarker(start, 16, {
          fillColor: '#149ECE',
          fillOpacity: 1,
          weight: 5
        }).addTo(map);

        // render the route as GeoJSON
        L.geoJson(response.route, {
          weight: 5
        }).addTo(map);

        // close the popup so we can see the route
        map.closePopup();
      });
    });
  }
});