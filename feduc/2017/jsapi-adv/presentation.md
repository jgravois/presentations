<!-- .slide: data-background="/presentations/template2/images/Slide1.png" -->

<!--div style="margin: auto; padding-top: 50px; padding-bottom: 50px; width: 80%; background: rgba(30,30,30,0.9)"/-->

<h1>ArcGIS API for JavaScript</h1>
### _Advanced Topics_

<br>

John Gravois (@geogangster), Andy Gup (@agup), Esri

---

<!-- .slide: data-background="/presentations/template2/images/Slide5.png" -->

## Table of contents

1. core Classes / Patterns
2. Intro to TypeScript
  * Visual Studio Code
  * Atom

---


<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

## Core modules

New core classes to get the job done
- `esri/core/Accessor`
- `esri/core/Promise`
- `esri/core/Loadable`
- `esri/core/Collection`

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

## `esri/core/Accessor`

- base class of most of the API
- consistent pattern:
 - getting and setting properties value
 - watching properties change
- computed properties
- autocast

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

## Accessor - Properties watching

```js
var view = new MapView({ map: map });

// watch for view center updates
view.watch('center', function(value) {
  log("center set to:", value.longitude, value.latitude);
});

// watch for basemap title updates
map.watch('basemap.title', function(value) {
  log("basemap is now: ", value);
});
```
no more listening for events!

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

## Accessor - Autocast

```js
var map = new Map({
  basemap: {
    baseLayers: [
      new TileLayer(url)
    ]
  }
});

var view = new MapView({
  map: map,
  container: 'viewDiv',

  extent: {
    xmin: -180, xmax: 180,
    ymin: -80, ymax: -80,
    spatialReference: 4326
  }
});
```
fewer modules passed to `require()`

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

## Accessor - Autocast

```js
  // 3.x
  new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10,
    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
    new Color([255,0,0]), 4),
    new Color([255,255,255,0.25]));

  // 4.0
  new SimpleMarkerSymbol({
    style: 'square',
    color: 'red',
    size: 10,

    outline: {
      color: 'rgba(255, 255, 255, 0.5)'
      width: 4
    }
  });
```

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

## [Implementing Accessor](https://developers.arcgis.com/javascript/latest/guide/implementing-accessor/index.html)

TypeScript and Decorators

```js
import Accessor = require("esri/core/Accessor");
import { subclass, property, declared } from "esri/core/accessorSupport/decorators";

@subclass()
class Subclass extends declared(Accessor) {
  @property()
  firstName: string;

  @property()
  lastName: string;

  @property({
    readOnly: true,
    // define the property dependencies
    dependsOn: ["firstName", "lastName"]
  })
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

## Promises

- All asynchronous methods return a promise, no more [events](https://developers.arcgis.com/javascript/jsapi/querytask-amd.html#events)
- The basic pattern:

```js
  someAsyncFunction().then(
    function(resolvedVal){
      // when the promise resolves
      console.log(resolvedVal);  // the value of the resolved promise
    },
    function(error){
      // if the promise is rejected
      console.error(error);  // the error
    }
  );
```

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

## Promises

- Classes may be Promise
 - Load resources
 - Asychronously initialized `Layer`, `WebMap`, `WebScene`, `View`
 - `view.then()` instead of `map.on('load', ...)`

```js
var map = new Map({...})

view = new SceneView({
  map: map,
  //...
});

view.then(function() {
  // the view is ready
});
```

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

## Loadables

- better control and scheduling of resource loading.
- Promise-based
- Views automatically load the map and its layers

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

Query a FeatureLayer from a WebMap

```js
  var webmap = new WebMap({
    portalItem: {
      id: 'affa021c51944b5694132b2d61fe1057'
    }
  });

  webmap.load()
    .then(function() {
      return webmap.getLayer('myFeatureLayerId').load();
    })
    .then(function(featureLayer) {
      return featureLayer.queryFeatures({
        where: 'OBJECTID = 1'
      });
    })
    .then(function(result) {
      displayDetails(result.features[0]);
    })
    .otherwise(function(error) {
      console.error(error);
    });
```
without displaying it

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

## [`esri/core/Collection`](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Collection.html)

 - More or less like an Array
 - in house methods `add` / `remove` ...
 - array methods `forEach` / `map` ...
 - newer array methods `find` / `findIndex`...

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

## [`esri/core/Collection`](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Collection.html)

 - emit `"change"` events when an item is added/removed/moved
 - used for layers, layers in Basemap, graphics...
 - scaffolding for autocasting

```js
var PointCollection = Collection.ofType(Point);
var collection = new PointCollection();

collection.add([-100,40]);

var point = collection.getItemAt(0);
//point.x = -100; point.y = 40
```

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

# Lets set up [TypeScript](https://github.com/Esri/jsapi-resources/tree/master/4.x/typescript/demo)!

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

# Prereqs

* [Node.js](http://nodejs.org/) / npm
* git
* Visual Studio / Code / Atom

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

## Steps

1. clone [`github.com/Esri/jsapi-resources`](https://github.com/Esri/jsapi-resources)
2. navigate into `/4.x/TypeScript/demo/`
3. `npm install` (to lay down typings)
4. `npm run dev` (to compile when `.ts` changes are detected)

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

```js
import Collection = require("esri/core/Collection");
import Point = require("esri/geometry/Point");

view.then(function() {
  let PointCollection = Collection.ofType(Point);
  let collection = new PointCollection();

  // https://github.com/Microsoft/TypeScript/issues/6373
  view.watch("center", function(value, oldValue){
    collection.add(value);

    if (collection.length === 100) {
      console.log("x: " + collection.getItemAt(99).x);
    }
  });
});
```

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

_please_ fill out a session survey

---

<!-- .slide: data-background="/presentations/template2/images/Slide6.png" -->
