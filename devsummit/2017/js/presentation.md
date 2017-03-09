<!-- .slide: data-background="../../../fresher-template/images/2017-title.png" -->

<!--div style="margin: auto; padding-top: 50px; padding-bottom: 50px; width: 100%; background: rgba(30,30,30,0.9)"/-->

# JavaScript <small> *for Geographers*</small>

John ([@geogangster](https://twitter.com/geogangster)) & Pat ([@patrickarlt](https://twitter.com/patrickarlt)), Esri

Slides: [`http://bit.ly/2m4A6ei`](http://bit.ly/2m4A6ei)

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide3.png" -->

## Agenda

1. Fundamentals
2. Building Web Apps
3. JS API
4. JavaScript Fatigue

---

## JS is a big scary place

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## This talk

* Intro some basics
* Step through confusing parts
* Guide to the ecosystem
* How to not get overwhelmed

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## You are already familar with a lot of this!

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->
## variables

```js
var dog;

> undefined

// new
let nifty;
const notGonnaChange;

> undefined
```

   <aside class="notes">

   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## objects

```js
let dog = {
  age: 7,
  canBark: true,
  _ssshhh: 'top secret'
}

> Object {age: 7, canBark: true }

```

   <aside class="notes">

   </aside>

---

## objects

```html
<script src="./doglibrary.js"></script>
```

```js
let spot = new Dog()

> Object { canBark: true }

spot.age = 21;
```

   <aside class="notes">

   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## operators - arithmetic

```js
(spot.age / 7) // 3

5 + 5 // 10

3 - 2 // 1

3 * 2 // 6
```

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## operators - arithmetic

```js
12 % 5 // 2 (modulus)

var x = 5;
x++ // 6

var y = 3;
y-- // 2

'foo' + 'bar' // 'foobar'
```

   <aside class="notes">

   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## operators - comparison

```js
3 === 3   // true
3 === '3' // false

'foo' != 'bar' // true

3 > 2 // true
3 >= 2 // true
```
   <aside class="notes">

   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## operators - logical
```js
// logical 'and'
true && anotherTruthy
> true

// 'or'
true || somethingFalsy
> true

// 'not'
!somethingTruthy
> false
```
   <aside class="notes">

   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## arrays
```js
var dogs = ['Spot', 'Lassie'];

fruits[0] // 'Spot'

fruits.push('Fido');

fruits.length // 3
```
   <aside class="notes">

   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## functions

```js
function dogYears(age) {
  return age * 7;
}

dogYears(3);
> 21
```
   <aside class="notes">

   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## anonymous functions
```js
function () {
  return 2*2;
}
```
   <aside class="notes">

   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## objects - methods

   <aside class="notes">
     methods == functions!
   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## for loops

   <aside class="notes">

   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## JavaScript is _Asynchronous_

* JavaScript is _single threaded_
* Only does 1 thing at a time
* Lots of things might happen at once

   <aside class="notes">

   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## JavaScript Event Loop

```
// program starts, event loop is empty
console.log('Hello Dev Summit');

// call setTimeout, add a function to the event loop after a delay
setTimeout(function () {
  console.log('Lets Learn');
}, 100);

// now we call setTimeout again
setTimeout(function () {
  console.log('JavaScript');
}, 10);

// and again, still goes into the event loop after 0 milliseconds
setTimeout(function () {
  console.log('Async');
}, 0);

// executes immediately, still in the same "turn" of the event loop
//
console.log('Thanks!');

// done executing and we will start executing the event loop

> Hello Dev Summit
> Thanks!
> Async
> JavaScript
> Lets Learn
```

   <aside class="notes">

   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## Callbacks

```html
<button id="button">Click Me!</button>
```

```js
let button = document.getElementById('button');

button.addEventListener('click', function () {
  console.log('The button was clicked');
});
```

callback are functions that are called when

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## Callbacks

```js
let button = document.getElementById('button');

button.addEventListener('click', function () {
  console.log('The button was clicked');
});
```

callback are functions that are called when things happen.

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## Promises

```js
let user = fetch('https://randomuser.me/api/')
  .then(processResponse)
  .then(doSomethingWithUser)
  .catch(anyErrors);

function processResponse (response) {
  return response.json();
}

function doSomethingWithUser (user) {
  console.log(user); // prints a bunch of user info
}

function anyErrors (error) {
  console.error('what have you done!', error);
}
```

Promises represent a future value that will be "resolved".

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## closures

```
var message = 'Hello World!';

function go () {
  console.log(message);
}

go();
```

when functions are called they remember the variables around them

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## closures and scope

```js
function makeAdder(amountToAdd) {
  // Each time we call makeAdder we get a new closure
  // which will remember all the variables around it.
  // We can use any of those variables in our adder function.
  return function adder (amount) {
    return amount + amountToAdd;
  }
}

const add5 = makeAdder(5);
const add10 = makeAdder(5);

add5(1);
> 6

add10(1);
> 11
```

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## What is `this`?

```js
var person = {
  firstName: "Casey",
  lastName: "Jones",
  fullName: function () {
    console.log(this.firstName + " " + this.lastName);
  }
}

person.fullName() // > Casey Jones
```

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## lets set up a JS development environment

   <aside class="notes">
     good time to talk about CDNs
   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## the DOM

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## debugging

   <aside class="notes">

   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## sharing JavaScript - modules

As applications grow it is helpful to divide code into different files to organize. You can just use `<script>` tags for small apps.

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## ES2015 Modules

```
import { something } from 'some-module';
```

This is the future as you learn JavaScript you will encourter this more often.

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## AMD Modules (JS API)

```
require([
  "esri/Map",
  "esri/views/MapView",
], function (Map, MapView) {
  // Map and MapView have been loaded!
});
```

`require` is a fancy way of adding `<script>` tags to load code on demand.

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## lets put all this to use!

   <aside class="notes">
     step through a JSAPI sample
   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## ES2015 <small>formerly ES6</small>

New version of the JavaScript language.

Updates every year (ES2015, ES2016, ES2017).

LOADS of new featues.

Refuse to learn anything else.

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## the JavaScript ecosystem

You don't know what you don't know.

<p class="fragment">and that is great.</p>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## the JavaScript ecosystem

* Package Managers - NPM and Bower
* Module Formats - CommonJS, AMD, ES 2015

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## the JavaScript ecosystem

* Comilers - Babel, TypeScript
* Bundlers - Rollup, WebPack, SystemJS
* Minifiers - UglifyJS

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## JavaScript Fatigue

> Look, it’s easy. Code everything in Typescript. All modules that use Fetch compile them to target ES6, transpile them with Babel on a stage-3 preset, and load them with SystemJS. If you don’t have Fetch, polyfill it, or use Bluebird, Request or Axios, and handle all your promises with await.

> We have very different definitions of easy.

[How it feels to learn JavaScript in 2016](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f#.sl06jvo9z)

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## Dealing with JavaScript Fatigue

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">First do it, then do it right, then do it better - this is my mantra for successfully getting things done. It&#39;s all about the iteration.</p>&mdash; Addy Osmani (@addyosmani) <a href="https://twitter.com/addyosmani/status/314785735171518464">March 21, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## Opinions

You will hear lots opinions about the "right" way to do JavsScript

These are not always super helpful.

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

> learn and deeply understand all of JavaScript

> Kyle Simpson - [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS/blob/master/preface.md#mission)

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## learn more!

* [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)
* [MDN: Learn web development](https://developer.mozilla.org/en-US/docs/Learn)
* [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
* [Eloquent JavaScript](http://eloquentjavascript.net/)
* http://wesbos.com/

   <aside class="notes">

   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

please, _please_, **please** fill out a session survey

1. Download the Esri Events App
2. Select Dev Summit
3. Search for "JavaScript for Geographers"
4. Leave feedback!

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide3.png" -->

idea, question, issue, or success story?

[@geogangster](https://twitter.com/geogangster) / [@patrickarlt](https://twitter.com/patrickarlt)

Slides: [`http://bit.ly/2m4A6ei`](http://bit.ly/2m4A6ei)

---

<!-- .slide: data-background="../../../fresher-template/images/2017-end.png" -->
