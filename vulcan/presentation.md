<!--

desktop and enterprise can be extended with Python (and ArcObjects)

-->

<!-- .slide: data-background="../fresher-template/images/2017-title.png"-->

# ***ArcGIS*** for Devs

John ([@geogangster](@https://twitter.com/geogangster))

slides: [`http://bit.ly/2onW2mT`](http://bit.ly/2onW2mT)

---

<!-- .slide: data-background="../fresher-template/images/2017-slide2.png"-->

## Agenda

1. web development
2. native apps
3. open source projects
4. OpenStreetMap

<small>[`http://bit.ly/2onW2mT`](http://bit.ly/2onW2mT)</small>

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
* vector tiles ([any](http://jonahadkins.com/back2school2.html) coordinate system)
* 2D & [3D](https://developers.arcgis.com/javascript/latest/sample-code/satellites-3d/index.html)
* clientside geometry engine
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

* iOS, [Android](https://www.youtube.com/watch?v=Sf6BF-P2E-E&feature=youtu.be) - mobile
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

## developers.[arcgis.com](https://developers.arcgis.com)

* SDK [downloads](https://developers.arcgis.com/downloads/apis-and-sdks)
* [conceptual](https://developers.arcgis.com/documentation/#core-concepts) doc
* [DevLabs](https://developers.arcgis.com/labs/arcgisonline/summarize-spatial-data/)
* [compare](https://developers.arcgis.com/documentation/core-concepts/apis-sdks-apps/#comparing-arcgis-apis-and-sdks) APIs

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

---

<!-- .slide: data-background="../fresher-template/images/2017-slide2.png" -->

![lego](data:image/jpeg;base64,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)
<!--
  WKT
  spatial predicates
-->

---

<!-- .slide: data-background="../fresher-template/images/2017-slide2.png" -->

## What's new with OpenStreetMap?

* Two [canonical](https://www.openstreetmap.org/edit#map=20/-46.40423/168.36162) Esri Imagery layers in OSM editors
* Open [PR](https://github.com/openstreetmap/iD/pull/4633) in `iD` to streamline ingest of features from Esri services (remember koop!)

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
* [geometry-api-java](http://esri.github.io/geometry-api-java/doc/Intersection.html) (used in Amazon [Athena](https://docs.aws.amazon.com/athena/latest/ug/geospatial-functions-list.html))

---

<!-- .slide: data-background="../fresher-template/images/2017-end.png" -->
