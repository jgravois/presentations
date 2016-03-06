# Advanced Esri Leaflet App

This application represents a more advanced setup for using Esri Leaflet. It includes examples of the following:

1. Extending `FeatureManager` to create a unique visualization with another Leaflet plugin.
2. Extending `Task` to create a reusable wrapper around an ArcGIS service not natively supported in Esri Leaflet.

## Extending `FeatureManager`

`L.esri.FeatureManager` is the base class that powers feature layers. Implementations of `FeatureManager` include:

* [`FeatureLayer`](https://github.com/Esri/esri-leaflet/blob/master/src/Layers/FeatureLayer/FeatureLayer.js)
* [`HeatMapFeatureLayer`](https://github.com/Esri/esri-leaflet-heatmap-feature-layer/blob/master/src/HeatmapFeatureLayer.js)
* [`ClusteredFeatureLayer`](https://github.com/Esri/esri-leaflet-clustered-feature-layer/blob/master/src/ClusteredFeatureLayer.js)

To implement `FeatureManager` extend it and define the `createLayers`, `addLayers` and `removeLayers` methods.

```js
import {FeatureManager} from 'esri-leaflet';

export var MyFeatureLayer = FeatureManager.extend({

  // initialize is called when `MyFeatureLayer`is
  // created. You need to call the initialize method
  // on FeatureManager and pass options to it.
  // This is a good place to create anything you need
  // in future methods or to process options.
  initialize: function (options) {
    // Call initialize on FeatureManager
    FeatureManager.prototype.initialize.call(this, options);
  },

  // Called when MyFeatureLayer is added to a map.
  // This is where you want to add anything you need to the map.
  onAdd: function (map) {
    // Make sure to also add FeatureManager to the map
    // by calling onAdd on the FeatureManager prototype
    FeatureManager.prototype.onAdd.call(this, map);
  },

  // Called when MyFeatureLayer is removed to a map.
  // This is where you want to remove anything you need
  // to the map.
  onRemove: function (map) {
    // Make sure to also remove FeatureManager on map
    // by calling onRemove on the FeatureManager prototype
    FeatureManager.prototype.onRemove.call(this, map);
  },

  // createLayers is called with a GeoJSON featureCollection
  // whenever features might need to be created. Make sure you
  // use the ID of each feature to only create each feature once.
  createLayers: function (featureCollection) {
    // do whatever you need to do to create the
    // visualization you need
  },

  // addLayers is called with an array of `layerIds`
  // whenever layers that were previously created need
  // to be added back to the map.
  addLayers: function (layerIds) {
    // FeatureManager wants you to add the features with
    // `layerIds` back to the map.
  },

  // removeLayers is called with an array of `layerIds`
  // that you should remove from the map. `permanent` will
  // be true if you should permanently remove the layers, i.e.
  // they have been deleted from the service.
  removeLayers: function (layerIds, permanent) {

  }
});
```

## Extending `Task`

Esri Leaflet abstracts methods on ArcGIS services as `Task`. You can implement `Task` to simplify API requests and process the results. Implementations of `Task` include:

* [`Query`](https://github.com/Esri/esri-leaflet/blob/master/src/Tasks/Query.js)
* [`Geocode`](https://github.com/Esri/esri-leaflet-geocoder/blob/master/src/Tasks/Geocode.js)

To implement `Task` extend `L.esri.Task` and define several class properties and call the `request` method on the `Task`.

```js
import { Task } from 'esri-leaflet';

export var MyTask = Task.extend({
  // the last segment of the URL, used with
  // this task is used with L.esri.Service
  path: 'endpoint',

  // default parameters that should
  // be sent with each request
  params: {
    foo: 'bar'
  },

  // each "setter" maps a method name (the key)
  // to a parameter taht will be sent to the request.
  // for example calling task.method('foo') will set
  // the the value of `someParam` to 'foo' when you
  // make the request to the service.
  setters: {
    method: 'someParam'
  }

  // you can define your own methods that modify
  // this.params to change the values that are sent
  // to the service. `return this` enables chaining
  // these methods.
  aParamSetter: function (value) {
    this.params.someOtherParam = value;
    return this;
  },

  // you can implement your own methods on tasks
  // to implement any processing tasks you might want
  _processResponse: function (response) {
    // do some thing to process response into something else
    return response;
  }

  // most tasks implement the `run` method that will
  // make the request to the service. Users will pass
  // a callback and an optional function context.
  run: function (callback, context) {
    // execute the request, encoding this.params and sending
    // the request to the url.
    return this.request(function (error, response) {
      // Process the response into something friendlier to
      // the user.
      var result = this._processResponse(response)

      // call a users callback with their context. If
      // context is undefined this still works.
      callback.call(context, error, result ,response);
    }, this);
  }
});
```