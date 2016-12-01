import L from 'leaflet';
import './PruneCluster/PruneCluster.js'; // non standard, imports PruneCluster.js so we have globals
import ClusterIcon from './ClusterIcon.js';
import { FeatureManager } from 'esri-leaflet';

/**
 * FeatureManager handles the requesting and filtering part of a feature layer.
 * An implimnetaiton of FeatureManager knows how to create, add and remove features
 * from a map but still inherits useful filtering methods like `setWhere`.
 */
export var PruneClusterFeatureLayer = FeatureManager.extend({
  // Override the initialize function to add some behavior when we create
  // a new `PruneClusterFeatureLayer`.
  initialize: function (options) {
    // This calls the `initalize` function on FeatureManager.
    // It is similar to `super` in ES 6 classes or most other object oriented
    // languages just much more explict.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
    FeatureManager.prototype.initialize.call(this, options);

    // L.setOptions will merge the default options for this class and its parent classes
    // with the passed options and create a single `this.options` reference we can use
    options = L.setOptions(this, options);

    // create an instance of PruneCluster that we can use
    this._cluster = new PruneClusterForLeaflet();

    // Override some behavior on PruneClusterLeafletSpiderfier to fix a bug.
    // This shows using the `include` method from Leaflet's class system which can
    // be used to overide methods on Classes without using extend. For example this
    // replaces the existing onAdd and onRemove methods with our own.
    this._cluster.spiderfier.onAdd = function (map) {
      this._map.on('overlappingmarkers', this.Spiderfy, this);
      this._map.on('zoomend', this.Unspiderfy, this);
      this._map.on('dragend', this.Unspiderfy, this);
    };

    this._cluster.spiderfier.onRemove = function (map) {
      this._map.off('overlappingmarkers', this.Spiderfy, this);
      this._map.off('zoomend', this.Unspiderfy, this);
      this._map.off('dragend', this.Unspiderfy, this);
    };

    // create an internal store of all the markers we pass to PruneCluster
    // we will need this later.
    this._markers = {};

    // Override the BuildLeafletClusterIcon to tell PruneCluster how to create our
    // cluster icons using our L.Icon.MarkerCluster class.
    // L.Util.bind will make sure that `this` inside the function is our instance of
    // `PruneClusterFeatureLayer` not the `PruneClusterForLeaflet` instance.
    this._cluster.BuildLeafletClusterIcon = L.Util.bind(function(cluster) {
      var e = new ClusterIcon(this.options);
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
    FeatureManager.prototype.onAdd.call(this, map);

    // Creating a new map pane (<div>) that will sit on top of all other markers
    // This works around a PruneCluster bug when using vector markers
    if (!this._pane) {
      this._pane = map.createPane('categoryMarkers');
      this._pane.style.zIndex = 600;
    }

    // add the PruneCluster to the map
    map.addLayer(this._cluster);
  },

  onRemove: function (map) {
    // call our parent `onRemove` method to cleanup
    FeatureManager.prototype.onRemove.call(this, map);

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

export function pruneClusterFeatureLayer (options) {
  return new PruneClusterFeatureLayer(options);
}

export default pruneClusterFeatureLayer;
