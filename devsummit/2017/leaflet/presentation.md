<!-- .slide: data-background="/presentations/template2/images/2017-title.png" -->

<!--div style="margin: auto; padding-top: 50px; padding-bottom: 50px; width: 80%; background: rgba(30,30,30,0.9)"/-->

# <small>*building apps with*</small> Esri Leaflet
John (@geogangster), Esri

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## Agenda

1. Fundamentals
2. Whats new!
3. Jungle boat cruise

---


<!-- .slide: data-background="/presentations/template2/images/2017-slide3.png" -->

## Disclaimer* 

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

### Its a group effort

* open source, community supported
* no roadmap, no product lifecycle
* 50+ contributors (and counting!)

<aside class="notes">
  contributions from
  USGS, State Dept, Netflix, Stanford University, City of Philadelphia, Utah AGRC

  apps from
  Stanford University, Forest Service, Ride Amigos, Mapillary, Storymaps team...
</aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## what is [`Leaflet`](https://leafletjs.com)?

the leading open-source JavaScript library<br>for mobile-friendly interactive maps

small, stable, popular

   <aside class="notes">

   beginner friendly (kinda)
     JS code isn't complex, managing dependencies can be

   Washington Post, Craigslist, GitHub, Flickr, (Facebook?)

   </aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## designed for web developers

<div class="twos">
  <div class="snippet">
  <pre><code class="lang-js hljs javascript">
  var map = L.map("mapDiv").setView([-45, -120], 10);


  // do the same thing without method chaining

  var map = L.map("mapDiv");
  map.setView([45, -120], 10)

</code></pre>
  </div>
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="./snippets/map.html"></iframe>
  </div>
</div>

coordinates are passed in Y,X order

<aside class="notes">

things to note:
  WGS84 projection is assumed. map is web mercator
</aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## How small _is_ Leaflet?

![one-tile](http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/6/24/18)

## [`36kb`](https://unpkg.com/leaflet@1.0.3/dist/leaflet.js)!

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

### so small it doesn't help<br>you fetch .geojson files

<div class="twos">
  <div class="snippet">
  <pre><code class="lang-js hljs javascript">

  // leaflet.css
  // leaflet.js

  // then a plugin
  // <script src="https://unpkg.com/leaflet-ajax@2.1.0"></script>

  L.GeoJson.ajax("/data/giraffes.geojson").addTo(map);

</code></pre>
  </div>
  <div class="snippet-preview">
    <!-- show a button and fetch GeoJSON -->
    <iframe id="frame-2d-parallel" data-src="./snippets/ajax.html"></iframe>
  </div>
</div>

an extra plugin *just to load a file*!
<aside class="notes">

things to note:
  no wrapper for xmlHttpRequest
</aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

### luckily `Leaflet` has a *big* plugin community

![happy](https://techtalk.vn/wp-content/uploads/2016/06/Screen-Shot-2015-12-08-at-5.44.32-PM-644x320.png)

---


<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

### [`Esri Leaflet`](https://esri.github.io/esri-leaflet) is *our* plugin(s)
to make working with the most<br>popular ArcGIS Services a **pleasure**

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide3.png" -->

## Goals

1. sensible defaults
2. keep it simple

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide3.png" -->

## Lets take a tour!

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## [`L.tileLayer`](http://leafletjs.com/reference-1.0.3.html#tilelayer)

<div class="twos">
  <div class="snippet">
  <pre><code class="lang-js hljs javascript">

  // /lib/leaflet.css
  // /lib/leaflet.js

  var url = '//{s}.tile.osm.org/{z}/{x}/{y}.png';

  var tiled = L.tileLayer(url, {
      attribution: '&copy; <a href="http://osm.org/copyright">
      OpenStreetMap</a> contributors'
  })

  tiled.addTo(map);

</code></pre>
  </div>
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="./snippets/map.html"></iframe>
  </div>
</div>

requires manual attribution and knowledge of tiling scheme

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## [`L.esri.basemapLayer`](http://esri.github.io/esri-leaflet/api-reference/layers/basemap-layer.html)

<div class="twos">
  <div class="snippet">
  <pre><code class="lang-js hljs javascript">

  // /lib/leaflet.css
  // /lib/leaflet.js

  // /lib/esri-leaflet.js

  L.esri.basemapLayer('Streets').addTo(map);

  // or
  L.esri.basemapLayer('Streets', {
      minZoom: 3
  }).addTo(map);

</code></pre>
  </div>
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="./snippets/e-map.html"></iframe>
  </div>
</div>

map credits update on pan/zoom<br>
`L.TileLayer` properties, methods and events are inherited

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide3.png" -->

`<segway>`

## some `Leaflet` fundamentals

`</segway>`

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## [`L.GeoJSON`]()

<div class="twos">
  <div class="snippet">
  <pre><code class="lang-js hljs javascript">
var data = {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "color": "green",
    "name": "Dinagat Islands"
  }
}

var islands = L.geoJSON(data)

islands.bindPopup((layer) => 
  layer.feature.properties.name
).addTo(map);

</code></pre>
  </div>
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="./snippets/dinagat.html"></iframe>
  </div>
</div>

<aside class="notes">

</aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide3.png" -->

## `Esri Leaflet`
### builds on the fundamentals

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## [`L.esri.FeatureLayer`]()

<div class="twos">
  <div class="snippet">
  <pre><code class="lang-js hljs javascript">
var buses = L.esri.featureLayer({
    url: '../services/Buses/MapServer/0',
    where: "direction='North'"
  })

buses.bindPopup((layer) => 
    layer.feature.properties.stop_name;
);

buses.addTo(map);

</code></pre>
  </div>
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="./snippets/fl-filtered.html"></iframe>
  </div>
</div>

spatial/sql filtering, popups bound when feature is clicked

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## [`L.esri.tiledMapLayer`]()

<div class="twos">
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="./snippets/tiled.html"></iframe>
  </div>
</div>

```js
L.esri.tiledMapLayer({ url: '//server.com/BasemapCached/MapServer' });
```
<aside class="notes">

</aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## [`L.esri.dynamicMapLayer`]()

<div class="twos">
  <div class="snippet">
  <pre><code class="lang-js hljs javascript">

var dynLayer = L.esri.dynamicMapLayer({
    url: '../services/SampleWorldCities/MapServer',
    layerDefs: { 0:'POP_RANK < 2' }
  }).addTo(map);

dynLayer.bindPopup(function (error, collection) {
    return collection.features[0].properties.NAME;
});

</code></pre>
  </div>
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="./snippets/dynamic-filtered.html"></iframe>
  </div>
</div>

<aside class="notes">

</aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## [`L.esri.imageMapLayer`]()

<div class="twos">
  <div class="snippet">
  <pre><code class="lang-js hljs javascript">
L.esri.imageMapLayer({
    url: landsatUrl,
    bandIds: [4,3,2],
    from: new Date('2000'),
    to: new Date('2000')
  }).addTo(map);

// or

var rule = {
  "rasterFunction": 'NDVI Colorized'
};

L.esri.imageMapLayer({
    url: landsatUrl,
    renderingRule: rule,
    from: new Date('2000'),
    to: new Date('2000')
  }).addTo(map);

</code></pre>
  </div>
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="./snippets/rasterFunction.html"></iframe>
  </div>
</div>

custom raster functions are supported

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

### more `Esri Leaflet` [plugins](http://esri.github.io/esri-leaflet/plugins)

* address search
* server side renderers
* geoprocessing services
* vector basemaps*
* driving [directions](http://github.com/jgravois/lrm-esri)*

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

### The community has too!

* ArcGIS Online [web maps](http://esri.github.io/esri-leaflet/plugins)
* [Stream Layers](http://esri.github.io/esri-leaflet/plugins) from GeoEvent
* Legends

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## whats new with [Leaflet](https://leafletjs.com)? [`v1.0.3`](http://leafletjs.com/2017/01/23/leaflet-1.0.3.html)!

bugfixes for browsers with `PointerEvents`

   <aside class="notes">

   code is mature, patch release cycle is faster now.

   </aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## what about us?

* [`L.esri.webMap`](https://github.com/ynunokawa/L.esri.WebMap)

* [`L.esri.vector`](https://github.com/Esri/esri-leaflet-vector)

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## `L.esri.webMap`

<div class="twos">
  <div class="snippet">
  <pre><code class="lang-js hljs javascript">
  var id = '13750b8b548d48bfa99a9731f2a93ba0';

  var webmap = L.esri.webMap(id, { 
      map: L.map("mapDiv") 
  });

</code></pre>
  </div>
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="./snippets/webmap.html"></iframe>
  </div>
</div>

<aside class="notes">

things to note:
  WGS84 projection is assumed. map is web mercator
</aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## [`L.esri.Vector`](https://github.com/esri/esri-leaflet-vector)

<div class="twos">
  <div class="snippet">
  </div>
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="./snippets/vector-basemap.html"></iframe>
  </div>
</div>

```js
L.esri.Vector.basemap('Newspaper').addTo(map);
```
<aside class="notes">
</aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## bug fixes / improvements

* ~~Powered by Esri~~ logo
* geosearch UX
* MultiPolygon GeoJSON queries
* base64 images

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## more modular dependencies

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## [npmjs.com/packages/arcgis-to-geojson-utils](https://npmjs.com/packages/arcgis-to-geojson-utils)

```js
// convert ArcGIS JSON to GeoJSON
var geojson = arcgisToGeoJSON({
    "x":-122.6764,
    "y":45.5165,
    "spatialReference": {
      "wkid": 4326
    }
  });

// GeoJSON to ArcGIS JSON
var arcgis = geojsonToArcGIS({
  "type": "Point",
  "coordinates": [45.5165, -122.6764]
});
```
ES6 (shipped as a UMD)

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## [npmjs.com/packages/leaflet-virtual-grid](https://npmjs.com/packages/leaflet-virtual-grid)

A DOM-less tile layer that can be used<br>to query APIs with bounding boxes or center/radius.

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

```js
var vg = new VirtualGrid();

vg.on("cellenter", function(e){
  console.log(e.type, e); // listen for when cells reenter the current view
});
```

![vector-grid](https://github.com/patrickarlt/leaflet-virtual-grid/raw/master/example.jpg)

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## [npmjs.com/packages/tiny-binary-search](https://npmjs.com/packages/tiny-binary-search)

```js
npm install tiny-binary-search

var index = new BinarySearchIndex([
  { value: 0, id: "A" },
  { value: 1, id: "B" },
  { value: 2, id: "C" },
  { value: 3, id: "D" }
]);

// get the item with a value of 5
index.query(2);
// get all items with values between 1 and 3 (inclusive)
index.between(1, 3);

// add an array of items to the index
index.bulkAdd([
  { value: 1.5, id: "BB" },
  { value: 2.5, id: "CC" },
]);
```

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## Whats really new?

```js
import {Map} from './Map'; // ES6 + rollup = <3
```
### [Leaflet/pull/4989](https://github.com/Leaflet/Leaflet/pull/4989)

---


<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## Lets check out some new demos!

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## [dynamic labels](./snippets/labels.html)!

<div class="twos">
  <div class="snippet">
  <pre><code class="lang-js hljs javascript">
// <script src='./lib/rbush.js'></script>
// <script src='./lib/labelgun.js'></script>

function calculateLabelWeight (pop) {
  switch (true) {
    case (pop > 20000000):
      return 4
    case (pop > 10000000):
      return 3
    case (pop > 1000000):
      return 2
    default:
      return 1
  }
}

// higher population == greater precedence
</code></pre>
  </div>
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="./snippets/labels.html"></iframe>
  </div>
</div>

<aside class="notes">
</aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## _weighted_ collision detection!

```js
labelEngine = new labelgun.default(hideLabel, showLabel);

function addLabel(layer, id, weight) {
  // ...
  var boundingBox = {
      bottomLeft : [bottomLeft.lng, bottomLeft.lat],
      topRight   : [topRight.lng, topRight.lat]
  };

  labelEngine.ingestLabel(
    boundingBox,
    id,
    weight,
    label, // labelObject
    STATE_NAME, // labelName
    false // isDragged
  )
}
```

<aside class="notes">
</aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## [driving directions](https://johngravois.com/lrm-esri/examples/index.html)!

<div class="twos">
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="https://johngravois.com/lrm-esri/examples/index.html"></iframe>
  </div>
</div>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## driving directions!

```html
<link rel="stylesheet" href="./lib/leaflet-routing-machine.css" />
<script src="./lib/leaflet-routing-machine.js"></script>
<script src="./lib/leaflet-control-geocoder.js"></script>

<!-- this one is ours -->
<script src="/lib/lrm-esri.js"></script>
```
```js
// additional profiles: Walking, Driving Distance etc.

var directions = L.Routing.control({
    router: L.Routing.esri({
    liveTraffic: true,
    profile: 'Trucking'
  })
}).addTo(map);
```

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## under the hood

```js
require('leaflet-routing-machine');

var profiles = require('./profiles.js');

module.exports = L.Class.extend({
  options: {
    // a rate limited proxied url can be substituted
    serviceUrl: 'https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World',
    timeout: 30 * 1000,
    routingOptions: {
      profile: 'Driving',
      liveTraffic: true
    }
  }
// ...
})
```
service proxy [doc](https://developers.arcgis.com/authentication/working-with-proxies/)

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## make the request

```js
var completeServiceUrl = this.options.serviceUrl + '/solve?' +
'f=json&' +
'returnStops=true&' +
'directionsLengthUnits=esriNAUMeters&' +
'directionsOutputType=esriDOTComplete';

if (this.options.liveTraffic) {
  completeServiceUrl += '&startTimeisUTC=true&startTime=' + new Date().getTime();
}
if (this.options.profile) {
  completeServiceUrl += '&travelMode=' + profiles[this.options.profile];
}
if (this.options.token) {
  completeServiceUrl += '&token=' + this.options.token;
}
completeServiceUrl += '&stops=' + locs.join(';');
```

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## parse the result

```js
// "compressedGeometry": "+bdqjf+48g5lf+kk35fh+0+0",

_esriDecodePolyline: function(str) {
  // ...
  for (var j = 1; j < strings.length; j += 2) {
    // j is the offset for the x value
    // Convert the value from base 32 and add the previous x value
    x = (parseInt(strings[j], 32) + xDiffPrev);
    xDiffPrev = x;

    // j+1 is the offset for the y value
    // Convert the value from base 32 and add the previous y value
    y = (parseInt(strings[j + 1], 32) + yDiffPrev);
    yDiffPrev = y;

    points.push(L.latLng([y / coefficient, x / coefficient]));
  }

  return points;
}
```
lifted from [terraformer-arcgis-parser](https://github.com/Esri/terraformer-arcgis-parser)

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

### whatever your build system

* [browserify](https://github.com/Esri/esri-leaflet-browserify-example)
* [webpack](https://github.com/Esri/esri-leaflet-webpack-example)
* [rollup](https://github.com/Esri/esri-leaflet-bundler)

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

### whatever your goal

* build better apps
* extend the project
* contribute back!

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

### the community is here to help

* GitHub
* Geonet
* Stack Exchange
* Slack (spatial community)
* Technical Support

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

please, _please_, **please** fill out a session survey

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide3.png" -->

idea, question, issue, or success story?

@geogangster / [john@esri.com](mailto:john@esri.com)

---

<!-- .slide: data-background="/presentations/template2/images/2017-end.png" -->
