<!--

desktop and enterprise can be extended with Python (and ArcObjects)

JSAPI
  WebGL building animation - https://developers.arcgis.com/javascript/latest/sample-code/visualization-vv-color-animate/live/index.html
  vector tiles in other projections
  (real) 3D
  esri-loader

Runtime
  iOS
  Android
  .NET (can compile to Android and iOS with Xamarin)
  Qt/C++ (AppStudio is built on this, as is Survey123)

common MVC/MVVM paradigms, Auth and content

Arcade scripting across the platform

REST doc on developer site
  LBS, etc.
  https://johngravois.com/esri-leaflet-gp/closest-facility.html
  https://johngravois.com/esri-leaflet-gp/demos/vrp.html

labs
conceptual doc
choosing platform
free account to get started with hosted services
  private is free
  public is free

OSS
  over 500 projects on github
  #24 rank / ~350 active contributors - https://www.infoworld.com/article/3253948/open-source-tools/who-really-contributes-to-open-source.html
    nuget - https://www.nuget.org/profiles/Esri_Inc
    npm - ?

  esri leaflet
  koop
    esri-proj-codes
    show hurricane harvey walmart

  cedar
  lerc

  more lego building blocks
    https://www.npmjs.com/package/@esri/application-base-js

  Java geometry engine
  arcgis-rest-js
  terraformer
    @esri/arcgis-to-geojson-utils
  calcite-web

OSM
  no more restrictions on use of OSM in basemaps from vendors
  world (and clarity imagery)
    https://www.openstreetmap.org/edit#map=18/-46.40505/168.36129
  PR
    https://github.com/openstreetmap/iD/pull/4633
-->

<!-- .slide: data-background="../fresher-template/images/2017-slide3.png"-->

# ***ArcGIS*** for Devs

John ([@geogangster](@https://twitter.com/geogangster))

slides: [`http://bit.ly/...`](http://bit.ly/...)

---

<!-- .slide: data-background="../fresher-template/images/2017-slide3.png"-->

1. Locate the extensibility points
2. What comes out of the box?
3. Esri's Open Source projects
4. What about OpenStreetMap?
5. Q&A (no need to wait)

<small>[`http://bit.ly/`](http://bit.ly/)</small>

<!--

notes

-->

---

<!-- .slide: data-background="../fresher-template/images/2017-slide2.png" -->

## code in **any** language
## ship to **any** device

JavaScript, Python, C#, Swift, C++, Java, ...

<!--

notes

-->

---

<!-- .slide: data-background="../fresher-template/images/2017-slide2.png" -->

## Web - ArcGIS API for JavaScript 4.x

* WebGL supported
* vector tiles in any coordinate system
* real* 3D
* github.com/Esri/esri-loader

<!--

notes

-->

---

<!-- .slide: data-background="../fresher-template/images/2017-slide2.png" -->

## Web - ArcGIS API for Python

* web centric
* pythonic
* Jupyter Notebook integration

<!--

notes

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

<!-- .slide: data-background="../fresher-template/images/2017-slide2.png" -->

## Native ArcGIS Runtime SDKs

* share common low level code
* support offline workflows
*

<!--

notes

-->

---

<!-- .slide: data-background="../fresher-template/images/2017-slide3.png" -->

## resources

Slides: [`http://bit.ly/2jgH0h5`](http://bit.ly/2jgH0h5)

* [Welcome to ArcGIS Hub Blog](https://blogs.esri.com/esri/arcgis/2017/06/27/welcome-to-arcgis-hub/)
* [2017 UC Teaser](https://www.youtube.com/watch?v=7OrvBKEqQiU)
* [Hub Python Tutorials](https://github.com/esridc/Hub-Tutorials/)
* [Python API Documentation](https://developers.arcgis.com/python/)
* [Hosted Jupyter Notebooks](http://notebooks.esri.com/)
* [`arcgis-rest-js` Documentation](http://arcgis-rest-js.surge.sh/)
* [ArcGIS for Developers](https://developers.arcgis.com/labs/)

---

<!-- .slide: data-background="../fresher-template/images/2017-end.png" -->
