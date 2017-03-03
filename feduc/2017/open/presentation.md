<!-- to do
FeatureServer/FeatureServer?
-->

<!-- .slide: data-background="/presentations/template2/images/Slide1.png" -->

<!--div style="margin: auto; padding-top: 50px; padding-bottom: 50px; width: 80%; background: rgba(30,30,30,0.9)"/-->

<h1>Esri Open Source Projects</h1>
### _on GitHub_

<br>

John Gravois (@geogangster), Nick Furness (@geeknixta), Esri

---

<!-- .slide: data-background="/presentations/template2/images/Slide5.png" -->

## Table of contents

1. Introductions
2. A whirlwind tour of Esri OSS projects

---


<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

## [github.com/esri/...](https://github.com/Esri)
### disclaimer*

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

### [esri/esri-leaflet](https://esri.github.io/esri-leaflet)

<div class="twos">
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="https://esri.github.io/esri-leaflet"></iframe>
  </div>
</div>

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

### [esri/LERC](https://github.com/Esri/Lerc)

* Limited Error Raster Compression
* error tolerance is configurable

<small>[reference](https://gcn.com/blogs/emerging-tech/2016/01/nasa-esri-image-storage.aspx)</small>

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

### [esri/LERC](https://github.com/Esri/Lerc)

* *much faster* encoding/decoding
* [/nasa-gibs/mrf](https://github.com/nasa-gibs/mrf) (for GDAL)
*

<small>[reference](https://gcn.com/blogs/emerging-tech/2016/01/nasa-esri-image-storage.aspx)</small>

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

### four dimensional ocean temperature

<div class="twos">
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="https://developers.arcgis.com/javascript/3/samples/layers_raster/"></iframe>
  </div>
</div>

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

### [3d world elevation tiles](https://github.com/jgravois/lerc-leaflet)

<div class="twos">
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="https://johngravois.com/lerc-leaflet/"></iframe>
  </div>
</div>

more extensive tile service doc is coming soon.

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

### [jgravois/lerc-leaflet](https://github.com/jgravois/lerc-leaflet)

```js
createTile: function (coords, done) {
    var error;
    var tile = L.DomUtil.create('canvas', 'leaflet-tile');
    // ...
    var xhr = new XMLHttpRequest();
    xhr.responseType = "arraybuffer";

    var url =
      'https://elevation3d.arcgis.com/arcgis/rest/services/' +
      'WorldElevation3D/Terrain3D/ImageServer/tile/' +
      coords.z + '/' +
      coords.y + '/' +
      coords.x;

    var that = this;
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        tile.decodedPixels = Lerc.decode(xhr.response);
        that.draw(tile);
        done(error, tile);
      }
    }
    return tile;
  },
```

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

### [npmjs.com/packages/lerc](https://npmjs.com/packages/lerc)

```js
npm install 'lerc'

// UMD module for browser / node

Lerc.decode(xhrResponse, {
  pixelType: "U8", // leave pixelType out in favor of F32 for lerc1
  inputOffset: 10 // start from the 10th byte
});

```

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

### [esri/cedar](https://esri.github.io/cedar)

<div class="twos">
  <div class="snippet">
  <pre><code class="lang-js hljs javascript">
var dataset = {
  url:"../services/Its_a_Tornado_Map/FeatureServer/0",
  query: {
    "groupByFieldsForStatistics": "EXTRACT(YEAR from Date)",
    "outStatistics": [{
      "statisticType": "sum",
      "onStatisticField": "FATALITIES",
      "outStatisticFieldName": "FATALITIES_SUM"
    }]
  },
  "mappings":{
    "x": {"field":"EXPR_1", "label": "Date"},
    "y": {"field":"FATALITIES_SUM", "label": "Fatalities"},
    "sort":"EXTRACT(YEAR from Date)"
  }
};

chart.tooltip = {
  "title": "{EXPR_1}",
  "content": "{FATALITIES_SUM} fatalities"
};

chart.dataset = dataset;

chart.show({
  elementId: "#chart",
  autolabels: true
});
</code></pre>
  </div>
  <div class="snippet-preview">
    <iframe id="frame-2d-parallel" data-src="./snippets/cedar.html"></iframe>
  </div>
</div>

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

### [koopjs/koop](http://koop.dc.esri.com/) (ETL on the fly)

  <blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/geogangster">@geogangster</a> know any hacks to get a geojson service added to an ArcGIS Online map? specifically Socrata services: <a href="https://t.co/8807mL65Dp">https://t.co/8807mL65Dp</a></p>&mdash; S P A T I A L AUSTIN (@spatialaustin) <a href="https://twitter.com/spatialaustin/status/788816920417935360">October 19, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8">{newline}</script>

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

### [koopjs/koop](http://koop.dc.esri.com/) (ETL on the fly)

<div class="twos">
  <div class="snippet-preview">
    <iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" title="Seattle Socrata Firearm Assaults" src="//edn.maps.arcgis.com/apps/Embed/index.html?webmap=13750b8b548d48bfa99a9731f2a93ba0&amp;extent=-122.3912,47.5713,-122.2671,47.6274&amp;zoom=false&amp;scale=false&amp;legendlayers=true&amp;disable_scroll=true&amp;theme=dark"></iframe>
  </div>
</div>

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

### [koopjs/koop](http://koop.dc.esri.com/) (ETL on the fly)

```js

// 20170213103626
// http://koop.dc.esri.com/socrata/seattle/9m84-ahhb/FeatureServer/0?f=json

{
  "currentVersion": 10.21,
  "id": 0,
  "name": "Firearm Assaults Map 2015",
  "type": "Feature Layer",
  "supportsRollbackOnFailureParameter": true,
  "supportsStatistics": true,
  "supportsAdvancedQueries": true,
  "geometryType": "esriGeometryPoint",
  "minScale": 0,
  "maxScale": 0,
  "extent": {
    "xmin": -122.408012003,
    "ymin": 47.457695,
    "xmax": -122.243126,
    "ymax": 47.733936472,
    "spatialReference": {
      "wkid": 4326,
      "latestWkid": 4326
    }
  }
}
```

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

### [esridc/opendata-search-component](http://esridc.github.io/opendata-search-component/examples/)

<div class="twos">
  <div class="snippet-preview">
    <iframe src="http://esridc.github.io/opendata-search-component/examples/"></iframe>
  </div>
</div>

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

### the building blocks for [Esri Open Data](http://opendata.dc.gov/)

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

# More from node land...
* [esri/Terraformer](https://terraformer.io)
* [esri/geoservices-js](https://github.com/Esri/geoservices-js)

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

# [esri/Terraformer](http://terraformer.io)

```js
// convert back and forth between ArcGIS Geometry and GeoJSON
var geojsonPoint = Terraformer.ArcGIS.parse({
  "x":-122.6764,
  "y":45.5165,
  "spatialReference": {
    "wkid": 4326
  }
});

var arcgisPoint = Terraformer.ArcGIS.convert({
  "type": "Point",
  "coordinates": [45.5165, -122.6764]
});
```

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

# [esri/Terraformer](http://terraformer.io)

```js
// also convexHull, calculateBounds...
var pt = [0,0];
var pt2 = [-111.873779, 40.647303];

var polygon = {
  "type": "Polygon",
  "coordinates": [[
    [-112.074279, 40.52215],
    [-112.074279, 40.853293],
    [-111.610107, 40.853293],
    [-111.610107, 40.52215],
    [-112.074279, 40.52215]
  ]]
};

Terraformer.Tools.polygonContainsPoint(polygon.coordinates, pt);
// returns false
Terraformer.Tools.polygonContainsPoint(polygon.coordinates, pt2);
// returns true
```

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

# [esri/geoservices-js](http://github.com/Esri/geoservices-js)

```js
var client = new Geoservices();

client.authenticate('username', 'password', { /*options*/ }, function (err, results) {
    if (!err)
        var batch = new client.geocode.Batch();

        // add addresses to geocode
        batch.geocode("224 N. College Ave, Bloomington, Indiana");
        batch.geocode("456 Other Street");

        // run the batch
        batch.run(function (err, results) {
          console.dir(results);
        });
    }
});
```
also wraps CRUD operations for FeatureServer

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

# [esri/geometry-api-java](http://esri.github.io/geometry-api-java/doc/Buffer.html)

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

## tools for _Big_ data
* [esri/gis-tools-for-hadoop](http://github.com/Esri/gis-tools-for-hadoop)
* [esri/spatial-framework-for-hadoop](http://github.com/Esri/spatial-framework-for-hadoop)

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

## [esri/i3s-spec](http://github.com/Esri/i3s-spec)
_Scene Layers Service and Package Specification_

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

## [esri/arcgis-cookbook](http://github.com/Esri/arcgis-cookbook)

to simplify/automate install and config of desktop, server, geoevent, pro etc.

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

## [esri/raster-functions](http://github.com/Esri/raster-functions)

A curated set of lightweight but powerful tools<br>for on-the-fly image processing and raster analysis in ArcGIS.

* Normalized Difference Vegetation Index
* Wind Chill
* Hillshade

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

## [esri/raster-functions](http://github.com/Esri/raster-functions)

<div class="twos">
  <div class="snippet-preview">
    <iframe src="/geodev/dcds-17-leaflet/snippets/rasterFunction.html"></iframe>
  </div>
</div>

[../LandsatGLS/MS/ImageServer](https://landsat.arcgis.com/arcgis/rest/services/LandsatGLS/MS/ImageServer/)

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

## do we have time for more?

* [calcite-web](https://esri.github.io/calcite-web)
* [developer-support](https://github.com/esri/developer-support)
* [public-transit-tools](https://github.com/esri/public-transit-tools)
* [templates/storymaps](https://github.com/esri/map-journal-storytelling-template-js)
* [angular-esri-map](https://github.com/esri/angular-esri-map)
* [opendata-ember](https://github.com/mjuniper/opendata-ember)

---

<!-- .slide: data-background="/presentations/template2/images/Slide5.png" -->

thats just the tip of the iceberg

---

<!-- .slide: data-background="/presentations/template2/images/Slide5.png" -->

idea, question, issue, or success story?

@geogangster / @geeknixta

---

<!-- .slide: data-background="/presentations/template2/images/Slide2.png" -->

_please_ fill out a session survey

---

<!-- .slide: data-background="/presentations/template2/images/Slide6.png" -->
