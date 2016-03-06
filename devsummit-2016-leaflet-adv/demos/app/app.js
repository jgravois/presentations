import L from 'leaflet';
import PruneClusterFeatureLayer from './src/PruneClusterFeatureLayer.js';
import directions from './src/DirectionsTask.js';
import { basemapLayer } from 'esri-leaflet';

// create a map with some rough US bounds
var map = L.map("map").fitBounds([ [20.30, -174.63], [52.32, -17.40] ]);

// locate us on the map
map.locate({setView: true, maxZoom: 14});

// create our tile layers
var tiles = basemapLayer("DarkGray").addTo(map);
var labels = basemapLayer("DarkGrayLabels").addTo(map);

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
    return L.circleMarker(latlng, {
      radius: 12,
      fillColor: this.options.categoryColors[category],
      stroke: false,
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
      .end(end, name)

      // execute the task
      .run(function (error, response){

        // render the users location as a circle
        L.circleMarker(start, {
          radius: 12,
          stroke: false,
          fillColor: '#149ECE',
          fillOpacity: 1
        }).addTo(map);

        // render the route as GeoJSON
        L.geoJson(response.route, {
          color: '#149ECE',
          fillColor: '#149ECE',
          opacity: 1,
          fillOpacity: 1,
          weight: 5
        }).addTo(map);

        // close the popup so we can see the route
        map.closePopup();
      });
    });
  }
});