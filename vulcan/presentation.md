<!--

desktop and enterprise can be extended with Python (and ArcObjects)

-->

<!-- .slide: data-background="../fresher-template/images/2017-title.png"-->

# ***ArcGIS*** for Devs

John ([@geogangster](@https://twitter.com/geogangster))

slides: [`http://bit.ly/...`](http://bit.ly/...)

---

<!-- .slide: data-background="../fresher-template/images/2017-slide2.png"-->

## Agenda

1. web development
2. native apps
3. open source projects
4. OpenStreetMap

<small>[`http://bit.ly/`](http://bit.ly/)</small>

<!--

notes

-->

---

<!-- .slide: data-background="../fresher-template/images/2017-slide3.png" -->

## code in **any** language
## ship to **any** device

JavaScript, Python, C#, Swift, C++, Java, ...

<!--

notes

-->

---

<!-- .slide: data-background="../fresher-template/images/2017-slide2.png" -->

## ArcGIS API for JavaScript 4.x

* [WebGL](https://developers.arcgis.com/javascript/latest/sample-code/visualization-vv-color-animate/live/index.html)
* vector tiles (any coordinate system)
* 2D & [3D](https://developers.arcgis.com/javascript/latest/sample-code/satellites-3d/index.html)
* github.com/Esri/[esri-loader](https://github.com/Esri/esri-loader)

<!--

second generation API


-->

---

<!-- .slide: data-background="../fresher-template/images/2017-slide3.png" -->

## ArcGIS API for Python

* distributed via conda
* web centric / pythonic
* [Jupyter Notebook](https://developers.arcgis.com/python/sample-notebooks/chennai-floods-analysis/) integration
* tools for analysts _and_ administrators

<!--

geocoding
buffers
tracing downstream
time aware image service
integrates with matplotlib

-->

---

<!-- .slide: data-background="../fresher-template/images/2017-slide2.png" -->

## Native ArcGIS Runtime SDKs

* iOS, Android - mobile
* Java, MacOS - thin-client desktop
* .NET, Qt (for all of the above)

<!--

notes

-->

---

<!-- .slide: data-background="../fresher-template/images/2017-slide3.png" -->

## Native ArcGIS Runtime SDKs

* share low-level code
* work offline
* access to native device APIs

<!--

  loadables

-->

---

<!-- .slide: data-background="../fresher-template/images/2017-slide2.png" -->

## ArcGIS [for Developers](https://developers.arcgis.com)

* SDK downloads
* conceptual doc
* [DevLabs](https://developers.arcgis.com/labs/arcgisonline/summarize-spatial-data/)
* compare APIs

---

<!-- .slide: data-background="../fresher-template/images/2017-slide3.png" -->

## location-based services

* routing
* geocoding
* elevation
* analysis

---

<!-- .slide: data-background="../fresher-template/images/2017-slide2.png" -->

## examples

  * [closest facility](https://johngravois.com/esri-leaflet-gp/closest-facility.html)
  * [traveling salesman](https://johngravois.com/esri-leaflet-gp/demos/vrp.html)

---

<!-- .slide: data-background="../fresher-template/images/2017-slide3.png" -->

## lets see some open source!

---

<!-- .slide: data-background="../fresher-template/images/2017-slide2.png" -->

## [@esri/cedar](http://cedar-v1.surge.sh/)

charting and visualization library

---


<!-- .slide: data-background="../fresher-template/images/2017-slide3.png" -->

## [LERC](https://johngravois.com/lerc-leaflet/)

limited error raster compression

blazing fast encoder/decoder

---

<!-- .slide: data-background="../fresher-template/images/2017-slide2.png" -->

## [koop](http://github.com/koopjs/koop-core)

* [Any API](https://walmart.alertlink.com/rss/stores.rss) > [GeoJSON](https://github.com/jgravois/koop-walmart/blob/9c2d7b274b32fe67287c04ac7deaa1f4220374ab/model.js#L15-L39) > ArcGIS [Online](http://www.arcgis.com/home/webmap/viewer.html?webmap=a3b82def31334e14ae799d025a6aff8e)

---

<!-- .slide: data-background="../fresher-template/images/2017-slide3.png" -->

## [terraformer](http://terraformer.io)

```js
ArcGIS.parse({
  'x':-122.6764,
  'y':45.5165,
  'spatialReference': {
    'wkid': 4326
  }
}); // returns GeoJSON


ArcGIS.convert({
  'type': "Point",
  'coordinates': [45.5165, -122.6764]
}); // returns Esri flavored JSON
```

<!--
  WKT
  spatial predicates
-->

---

<!-- .slide: data-background="../fresher-template/images/2017-slide2.png" -->

## What's new with OpenStreetMap?

* Two [canonical](https://www.openstreetmap.org/edit#map=18/-46.40505/168.36129) Esri Imagery layers in OSM editors
* Open [PR](https://github.com/openstreetmap/iD/pull/4633) in `iD` to streamline ingest of Esri geometries

<!--

  showcasing our Community Maps Program
  no more vendor restrictions on mix and match

-->

---

<!-- .slide: data-background="../fresher-template/images/2017-slide3.png" -->

## time for more?

* [calcite-web](http://esri.github.io/calcite-web/)
* [arcgis-rest-js](https://esri.github.io/arcgis-rest-js)
* [i3s-spec](https://github.com/Esri/i3s-spec)
* configurable app spec ([Albany](http://www.arcgis.com/apps/StoryMapBasic/index.html?appid=dd4813fd4ee64b5fa9db764ebd0dda80) / [Los Angeles](http://www.arcgis.com/apps/StoryMapBasic/index.html?appid=ddd535ae55c843c0a569729efb0bdd0b))
* [Arcade](https://developers.arcgis.com/arcade/)

---

<!-- .slide: data-background="../fresher-template/images/2017-end.png" -->
