<!-- .slide: data-background="/presentations/fresher-template/images/Slide1.png" -->

<!--div style="margin: auto; padding-top: 50px; padding-bottom: 50px; width: 80%; background: rgba(30,30,30,0.9)"/-->


<h1>Esri Leaflet </h1>
### _advanced topics_

<br>

###### John Gravois (@geogangster)

<aside class="notes">

I'm an Esri Leaflet maintainer, so you're in the right place.

</aside>

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide5.png" -->

## Agenda

1. Current Events
2. Concepts/Patterns
3. Demos

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

## whats new with [Leaflet](https://leafletjs.com)?

[`v1.0.3`](http://leafletjs.com/2017/01/23/leaflet-1.0.3.html)

`dblclick` handling for browsers with `PointerEvents`

   <aside class="notes">

   code is mature, patch release cycle is faster now.

   </aside>

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

## whats new for us?

* [`L.esri.webMap`](https://github.com/ynunokawa/L.esri.WebMap)

* [`L.esri.vector`](https://github.com/Esri/esri-leaflet-vector)

   <aside class="notes">

   code is mature, patch release cycle is faster now.

   </aside>

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

## `L.esri.webMap`

<div class="twos">
  <div class="snippet">
  <pre><code class="lang-js hljs javascript">
  var id = '13750b8b548d48bfa99a9731f2a93ba0';

  var webmap = L.esri.webMap(id,
    { map: L.map("mapDiv")
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

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

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

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

## bug fixes / improvements

* no more Esri logo
* geosearch UX fixes
* MultiPolygon GeoJSON queries
* support for base64 images

<aside class="notes">
</aside>

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

## more modular dependencies

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

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
written in ES6, packaged as UMD

<aside class="notes">
</aside>

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

## [npmjs.com/packages/leaflet-virtual-grid](https://npmjs.com/packages/leaflet-virtual-grid)

A DOM-less tile layer that can be used<br>to query APIs with bounding boxes or center/radius.

<aside class="notes">
</aside>

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

```js
var vg = new VirtualGrid();

vg.on("cellenter", function(e){
  console.log(e.type, e); // listen for when cells reenter the view
});
```

![vector-grid](https://github.com/patrickarlt/leaflet-virtual-grid/raw/master/example.jpg)

<aside class="notes">
</aside>

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

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

<aside class="notes">
</aside>

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

## Whats really new?

```js
import {Map} from './Map'; // ES6 + rollup = <3
```
### [Leaflet/pull/4989](https://github.com/Leaflet/Leaflet/pull/4989)

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

## `L.esri.request()`

```js
import {Map} from './Map'; // ES6 + rollup = <3
```
### [Leaflet/pull/4989](https://github.com/Leaflet/Leaflet/pull/4989)

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

## Demo: [dynamic labels](./snippets/labels.html)!

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

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

## weighted collision detection!

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

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

## Demo: [driving directions](https://johngravois.com/lrm-esri/examples/index.html)!

<div class="twos">
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="https://johngravois.com/lrm-esri/examples/index.html"></iframe>
  </div>
</div>

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

## driving directions!

```html
<link rel="stylesheet" href="./lib/leaflet-routing-machine.css" />
<script src="./lib/leaflet-routing-machine.js"></script>
<script src="./lib/leaflet-control-geocoder.js"></script>

<!-- i wrote this one -->
<script src="/lib/lrm-esri.js"></script>
```
```js
// additional profiles: Walking, Trucking, Driving Distance etc.

var control = L.Routing.control({
    router: L.Routing.esri({
    liveTraffic: true,
    profile: 'Driving'
  })
}).addTo(map);
```

<aside class="notes">
</aside>

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

## driving directions!

```js
require('leaflet-routing-machine');

var profiles = require('./profiles.js');

module.exports = L.Class.extend({
  options: {
    // a referer white listed, rate limited proxied url can also be used
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

<aside class="notes">
</aside>

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

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

<aside class="notes">
</aside>

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

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
pretty much lifted from [terraformer-arcgis-parser](https://github.com/Esri/terraformer-arcgis-parser)

<aside class="notes">
</aside>

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

### whatever your build system

* [browserify](https://github.com/Esri/esri-leaflet-browserify-example)
* [webpack](https://github.com/Esri/esri-leaflet-webpack-example)
* [rollup](https://github.com/Esri/esri-leaflet-bundler)

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

### whatever your goal

* build better apps
* extend the project
* contribute back!

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

### the community is here to help

* GitHub
* Geonet
* Stack Exchange
* Slack (spatial community)
* Technical Support

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide2.png" -->

_please_ fill out a session survey

---

<!-- .slide: data-background="/presentations/fresher-template/images/Slide5.png" -->

idea, question, issue, or success story?

@geogangster / [john@esri.com](mailto:john@esri.com)

---


<!-- .slide: data-background="/presentations/fresher-template/images/Slide6.png" -->
