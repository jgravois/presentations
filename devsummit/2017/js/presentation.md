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

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## [variables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)

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

## operators - [arithmetic](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators)

```js
(spot.age / 7) // 3

5 + 5 // 10

3 - 2 // 1

3 * 2 // 6
```

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## operators - [arithmetic](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators)

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

## operators - [comparison](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators)

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

## operators - [logical](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)
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

## [arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
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

## [functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

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

## [objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)

```js
let dog = {
  age: 7,
  canBark: true,
  _ssshhh: 'top secret'
}

> Object {age: 7, canBark: true, _ssshhh: 'top secret' }

```

   <aside class="notes">

   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## [objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)

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

## objects - methods

```
// Buffer point by 1000 feet
var ptBuff = geometryEngine.buffer(point, 1000, "feet");
```
   <aside class="notes">
     methods == functions!
   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## [for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) loops

```js
for (var i = 0; i < 6; i++) {
   console.log(i);
}

> 0
> 1
> 2
> 3
> 4
> 5
```
   <aside class="notes">

   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## looping through an array

```js
var dogs = ['Spot', 'Lassie', 'Fido'];

for (var i = 0; i < dogs.length; i++) {
   console.log(dogs[i]);
}

> 'Spot'
> 'Lassie'
> 'Fido'
```
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

## the JavaScript ecosystem

   <aside class="notes">

   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## a note about ES 2015

   <aside class="notes">

   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## _Opinions_

   <aside class="notes">

   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## learn more!

* [MDN: Learn web development](https://developer.mozilla.org/en-US/docs/Learn)
* [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)
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
