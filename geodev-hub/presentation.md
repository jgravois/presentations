<!-- outline

https://gist.github.com/jgravois/2099fbcaf9fbca0f0ae2b45e9cdd544d

dry run notes
make sure to advance slides!

notes for patrick
background on background
before we talk about what Hub is, what is Open Data?

give Patrick control _after_ his intro slides

the spectrum
  1. hardcoded app in space - python app

  2. configurable app embedded in page - locator web app builder
    developer demo is pointing it at a different webmap

  3 hub ready app
    my street?
    refer to survey123, WAB,
    be honest about the current state of doc
    https://mystreet.surge.sh/

-->

# ***ArcGIS* Hub** for GeoDevs

John ([@geogangster](@https://twitter.com/geogangster)) <br>Patrick ([@hamhandedly](https://twitter.com/hamhandedly))


slides: [`http://bit.ly/2jgH0h5`](http://bit.ly/2jgH0h5)

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide3.png"

notes: emphasis on civic tech outsiders collaborating with gov

-->

## Agenda

1. What _is_ Hub?
2. How the public can program against it
3. How you can customize it
4. How we can **all** collaborate
 * within a city
 * across the :earth_americas:

<small>slides: [`http://bit.ly/2jgH0h5`](http://bit.ly/2jgH0h5)</small>

<!--
john:
product introduction to set context
focusing on extensibility points
something for folks with different skill levels
stuff for folks that work in government
stuff for civic transparency nerds

lots of demos and external links, we'll share urls at the end
-->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## first, _why_ **ArcGIS Hub**?

A long time ago, in a galaxy far far away...

<!--
  patrick:

  before there was Open Data, gov operations were opaque
  ArcGIS Open Data sought to bridge the gap between operations and the public
  It has always been included with ArcGIS Online
  Open Data is now a capability of Hub that is included in ArcGIS Online subscriptions
-->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## what _is_ **ArcGIS Hub**?

Open Data + Initiatives + Community

* Demo [browsing a Hub page as a user]

<!--
  patrick:
  Hub is brand new!
  Hub seeks to solve problems that Open Data on its own doesn't
  Hub has addtional capabilities that cost $
    Initiatives
    Community
  Open Data underpins Hub
  Goal: make operationalizing Open Data easier
  Goal: Broaden the scope of engagement beyond computer folk
  Goal: break down silos between departments
  Goal: Measure success (and catch failure early)
-->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## Demo

* browsing Hub as a user

<!--
  patrick:
  Hub is brand new!
  Hub seeks to solve problems that Open Data on its own doesn't
  Hub has addtional capabilities that cost $
    Initiatives
    Community
  Open Data underpins Hub
  Goal: make operationalizing Open Data easier
  Goal: Broaden the scope of engagement beyond computer folk
  Goal: break down silos between departments
  Goal: Measure success (and catch failure early)
-->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## Under the hood...

```bash
git clone https://github.com/Esri/cedar.git
```
* Sharing charts across the platform
* New UX on the way for users to customize directly in the browser
* Built on top of D3

<!-- john -->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

* Better support for multi-series charts
* joining datasets
* better default styling

[show ember-cli-cedar wrapper demo]

<!-- john -->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## How do i _turn on_ ArcGIS Hub :bulb:?

* Demo - creating a new initiative page using a template

<!--

patrick
show spinning up an opioid inititiave
add a preconfigured app to the new page
we're more flexible than ever about what data you give us
-->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## Demo [customizing a page]

<!--
patrick:
the tools are relevant to open data and Hub pages
leaning on https://hub.arcgis.com/pages/site-customization
-->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## Demo [dig into an oss configurable app]

* load data dynamically
* use [shared themes](https://blogs.esri.com/esri/arcgis/2017/02/27/introducing-a-new-app-styling-capability-in-arcgis-online/)

use Viewer as example?
* show live app eat two app ids
* show JSON

<!-- john (or axed)-->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## Demo [community admin tools]

<!-- patrick -->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## Lets write some code!

<!-- john -->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

# [Python Demo]

* counter narrative?
* proposing a solution?

<!-- john -->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## ArcGIS API for Python

* no license required
* can be installed with Conda
* integrates with your favorite open source packages

<!--
john:
analyze bicycle and pedestrian fatalities
steer priorities
rally around an initiative
isolate root causes
cross promote Python API webinar for more info
jupyter notebook not the only way to run the Python API, but visually compelling
making the analysis reproducible and transparent

open data means that the community can use the Python API to interact with arcgis.com anonymously

Hub community engagement tools mean that premium capability can be unlocked by the public as well.

volunteer field crews can conduct surveys
run analysis on esri servers
publishing new derived spatial data
geocoding addresses

facebook and google logins are supported

-->

---



<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## _Way down_ under the hood...

```bash
git clone https://github.com/Esri/arcgis-rest-js.git
```
* Node.js and browser agnostic
* TypeScript / Vanilla JS
* Promise based

<!-- john -->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## Demo [arcgis-rest-js]

* show feature service creating on developers site (angular)
* show search in Hub (ember)
* show arcgis-rest-js geocoding doc

<!-- john

## History

* geoservices-js
* node-arcgis
* ember-arcgis-*
* lots of one-off projects
-->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## Strengths/Weaknesses

* Node.js
* no JS framework dependencies
* no map
* _very_ low-level

<!--

john:
very much a work in progress
http://resources.arcgis.com/en/help/arcgis-rest-api/index.html#//02r3000000tq000000
its an extremely extensive API
brave men have gone down this path before

-->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## Hub Ready Apps

a continuum.

<!--john-->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

* **ArcGIS Content** using Item config and Group Permissions
* **ArcGIS Identity** for authentication and Community
* **Shared Theme** & global navigation for consistent branding and design
* **Durable State** using URL of current view
* **Accessibility** for impaired users following WCAG & a11y
* **Indicator Aware** for Initiative configuration

<!--john-->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

* **Telemetry** to track usage and performance
* **Data Citations** link back to Data
* **Discussions** for collaboration and feedback
* **Connected Apps** between Hub Initiatives
* **App Switcher** between related Hub apps
* **Global** Profile for saving views and collaboration
* **Versions** for collaborative editing and publishing

<!--john-->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## A _Hub Ready_ example/prototype

[MyStreet](https://github.com/Esri/MyStreet/)

<!--john-->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## more lego pieces

```bash
git clone https://github.com/Esri/arcgis-rest-js.git
```
* [sonar](https://github.com/Esri/sonar)
* [koop](koopjs.github.io)

<!-- john -->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" >

## Collaboration between government and the public

* weekend hackathons _don't_ generate business ready apps
* they _can_ improve data literacy and data quality
* they work best when lots of _different_ stakeholders participate

<!--
patrick:
come to jesus moment for gov folks to set expectations about community events
this seems useful to me, but happy to rethink
->

-- -->

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## How do i keep up?

* https://hub.arcgis.com/pages/changelog

<!--
john:
practicing what we preach
transparency into release cycle
release cycle is RAPID
-->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide3.png" -->

## resources

Slides: [`http://bit.ly/2jgH0h5`](http://bit.ly/2jgH0h5)

* [Welcome to ArcGIS Hub Blog](https://blogs.esri.com/esri/arcgis/2017/06/27/welcome-to-arcgis-hub/)
* [2017 UC Teaser](https://www.youtube.com/watch?v=7OrvBKEqQiU)
* [Hub Python Tutorials](https://github.com/esridc/Hub-Tutorials/)
* [Python API Documentation](https://developers.arcgis.com/python/)
* [Hosted Jupyter Notebooks](http://notebooks.esri.com/)
* [`arcgis-rest-js` Documentation](http://arcgis-rest-js.surge.sh/)
* [ArcGIS for Developers](https://developers.arcgis.com/labs/)
* [StoryMap accessiblity blog](https://blogs.esri.com/esri/arcgis/2017/12/07/map-journal-accessibility/)
* [Customizing Hub pages](https://hub.arcgis.com/pages/site-customization)
* [ArcGIS REST API doc](http://resources.arcgis.com/en/help/arcgis-rest-api/index.html#//02r3000000tq000000) - new port coming soon
* [Configurable app examples](https://github.com/Esri/configurable-app-examples-4x-js)

<!-- john self explanatory -->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

idea, question, issue, or success story?

[@geogangster](https://twitter.com/geogangster) / [@hamhandedly](https://twitter.com/hamhandedly)

Slides: [`http://bit.ly/2jgH0h5`](http://bit.ly/2jgH0h5)

<!--
john:
surveys will go out soon
we have thick skin
let us know what else you'd like to see!
-->

---

<!-- .slide: data-background="../../../fresher-template/images/2017-end.png" -->
