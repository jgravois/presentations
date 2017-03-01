<!-- .slide: data-background="/presentations/template2/images/2017-title.png" -->

<!--div style="margin: auto; padding-top: 50px; padding-bottom: 50px; width: 80%; background: rgba(30,30,30,0.9)"/-->

### _Building apps with_
<h1>Esri Leaflet</h1>

###### John Gravois (@geogangster)

<aside class="notes">

I'm the primary maintainer of Esri Leaflet, so you're in the right place.

</aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

<!-- community supported -->
## Disclaimer* 

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## Agenda

1. Background
  - What is Leaflet?
  - Esri Leaflet?
  - Why?
2. Jungle boat cruise
3. How does the project stack up?

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

Y,X coordinates are passed to the map<br>not X,Y

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

an extra plugin just to load a file!
<aside class="notes">

things to note:
  no wrapper for xmlHttpRequest
</aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

### `Leaflet` has a *big* plugin community

![happy](https://techtalk.vn/wp-content/uploads/2016/06/Screen-Shot-2015-12-08-at-5.44.32-PM-644x320.png)

---


<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

### [`Esri Leaflet`](https://esri.github.io/esri-leaflet) is *ours*
it makes working with the most<br>popular ArcGIS Services a **pleasure**

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide3.png" -->

## Goals

1. sensible defaults
2. keep things simple

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide3.png" -->

## Lets take a tour!

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## [`L.tileLayer`](http://leafletjs.com/reference-1.0.3.html#tilelayer)

<div class="twos">
  <div class="snippet">
  <pre><code class="lang-js hljs javascript">

  // leaflet.css
  // leaflet.js

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

<aside class="notes">

 subdomains
 tile scheme
 static attribution

</aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## [`L.esri.basemapLayer`](http://esri.github.io/esri-leaflet/api-reference/layers/basemap-layer.html)

<div class="twos">
  <div class="snippet">
  <pre><code class="lang-js hljs javascript">

  // leaflet.css
  // leaflet.js

  // <script src="/lib/esri-leaflet.js"></script>

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
`L.TileLayer` properties, methods and events are honored

<aside class="notes">

 one liner
 dynamic attribution


</aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide3.png" -->

`<segway>`

## some `Leaflet` fundamentals

`</segway>`

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## [`L.Marker`](), [`L.Circle`](), [`L.Polygon`]()

<div class="twos">
  <div class="snippet">
  <pre><code class="lang-js hljs javascript">

  var marker = L.marker([51.5, -0.09]).addTo(map);

  var circle = L.circle([51.508, -0.11], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
  }).addTo(map);

  var polygon = L.polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047]
  ]).addTo(map);

</code></pre>
  </div>
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="./snippets/marker.html"></iframe>
  </div>
</div>

<aside class="notes">

 extends TileLayer

</aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## [`L.Popup`]()

<div class="twos">
  <div class="snippet">
  <pre><code class="lang-js hljs javascript">

// more method chaining
marker
  .bindPopup("<b>Hi!</b><br>I am a popup.")
  .openPopup();

circle.bindPopup("I am a circle.");

polygon.bindPopup("I am a polygon.");

</code></pre>
  </div>
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="./snippets/popup.html"></iframe>
  </div>
</div>

<aside class="notes">

</aside>

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

islands.bindPopup(function (layer) {
    return layer.feature.properties.name;
}).addTo(map);

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
    url: '//website.com/../services/Buses/MapServer/0'
  }).addTo(map);

buses.bindPopup('I am a popup!');

</code></pre>
  </div>
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="./snippets/fl.html"></iframe>
  </div>
</div>

gridded spatial queries > GeoJSON

<aside class="notes">

</aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## [`L.esri.FeatureLayer`]()

<div class="twos">
  <div class="snippet">
  <pre><code class="lang-js hljs javascript">
// lets get fancy
var busIcon = L.icon({
    iconUrl: '/img/bus-stop.png',
    iconRetinaUrl: '/img/bus-stop@2x.png',
  })

var buses = L.esri.featureLayer({
    url: '//website.com/../services/Buses/MapServer/0',
    where: "direction='North'",
    pointToLayer: function (geojson, latlng) {
      return L.marker(latlng, {
        icon: busIcon
      });
    },
  })

buses.bindPopup(function (layer) {
    return layer.feature.properties.stop_name;
  });

buses.addTo(map);

</code></pre>
  </div>
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="./snippets/fl-filtered.html"></iframe>
  </div>
</div>

spatial/sql filtering, custom styling

<aside class="notes">
  bindPopup isn't triggered until a feature is clicked
</aside>

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
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="./snippets/dynamic.html"></iframe>
  </div>
</div>

```js
L.esri.dynamicMapLayer({ url: '//server.com/Basemap/MapServer' });
```
<aside class="notes">

</aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

## [`L.esri.dynamicMapLayer`]()

<div class="twos">
  <div class="snippet">
  <pre><code class="lang-js hljs javascript">

// or get fancy

var dynLayer = L.esri.dynamicMapLayer({
    url: '../services/SampleWorldCities/MapServer',
    layers: [0,1],
    layerDefs: {0:'POP_RANK < 2'}
  }).addTo(map);

dynLayer.bindPopup(function (error, featureCollection) {
    return featureCollection.features[0].properties.NAME;
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

custom Raster Functions are also supported
<aside class="notes">

</aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

### more `Esri Leaflet` [plugins](http://esri.github.io/esri-leaflet/plugins)

* geocoding
* vector basemaps
* server side renderers
* using geoprocessing services
* driving [directions](http://github.com/jgravois/lrm-esri)

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

### The community has too!

* displaying ArcGIS Online [webmaps](http://esri.github.io/esri-leaflet/plugins)
* [Stream Layers](http://esri.github.io/esri-leaflet/plugins) (from GeoEvent)
* creating Legends

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

### Its a group effort

* open source
* community supported
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

### reasons some people like `Esri Leaflet`

* oss mandate
* previous experience
* simpler toolset
* easy integration with build systems*

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

### Reasons you'd choose the ArcGIS API for JavaScript

* flagship product
* can be cut lean
* unlocks the _whole_ Platform
* UI components are built in
* builders/templates
* support for custom projections*

<aside class="notes">
  supports Arcade
  UI components
  custom routing services
  print services
</aside>

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide2.png" -->

### for the path less travelled

* we build `Esri Leaflet` in our spare time
* only unlocks _some_ of the platform
* almost no UI components
* mix and match with other plugins
* beware of scope creep

<aside class="notes">
  other plugins need to be evaluated individually
  to see if they are any good and are up to date
</aside>

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

_please_ fill out a session survey

---

<!-- .slide: data-background="/presentations/template2/images/2017-slide3.png" -->

idea, question, issue, or success story?

@geogangster / [john@esri.com](mailto:john@esri.com)

---

<!-- .slide: data-background="/presentations/template2/images/2017-end.png" -->
