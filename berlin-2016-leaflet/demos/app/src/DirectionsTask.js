import { Task, Util } from 'esri-leaflet';

// L.esri.Task represents a call to an ArcGIS service. It can be extended to apply
// to any task and present a pretty and simplified UI.
export var Directions = Task.extend({
  // Each `setter` create a method that corresponds to a param on the service.
  // for example calling `task.unit('esriNAUFeet')` would set the `directionsLengthUnits`
  // to 'esriNAUFeet'. Setters are useful when you want to simplify param names but still
  // pass through whatever value user passed to the service
  setters: {
    unit: 'directionsLengthUnits',
    directionStyle: 'directionsStyleName',
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
    Task.prototype.initialize.call(this, options);

    // setup the `stops` param so other methods can use it later.
    this.params.stops = {
      features: []
    }
  },

  // Internal method to create an ArcGIS formatted stop from a LatLng and stop name
  _makeStop: function (latlng, name) {
    // L.esri.Util.geojsonToArcGIS is useful for converting GeoJSON (Leaflet) to
    // ArcGIS JSON that ArcGIS Services can understand.
    return Util.geojsonToArcGIS({
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
      var route = Util.responseToFeatureCollection(response.routes, 'ObjectID');

      // call the users callback with our processed response object.
      callback.call(context, error, {
        route: route
      });
    }, this);
  }
});

// most Leaflet and Esri Leaflet classes are instantiated through a "factory function"
// that will create a new object. As a rule-of-thumb use the lowercased "factory function"
// to create new instances and the uppercased class name to extend classes.
export function directions (options) {
  return new Directions(options);
}

export default directions;