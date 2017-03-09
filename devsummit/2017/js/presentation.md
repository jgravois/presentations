<!-- .slide: data-background="../../../fresher-template/images/2017-title.png" -->

<!--div style="margin: auto; padding-top: 50px; padding-bottom: 50px; width: 100%; background: rgba(30,30,30,0.9)"/-->

# JavaScript <small> *for Geographers*</small>
<br>
John (@geogangster) & Pat (@patrickarlt), Esri

Slides: [`http://bit.ly/2m4A6ei`](http://bit.ly/2m4A6ei)

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide3.png" -->

## Agenda

1. Fundamentals
2. Sharing JavaScript
3. _Opinions_ aka 'the Ecosystem'

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

   <aside class="notes">
     
   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## closures / _this_

   <aside class="notes">
     
   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## sharing JavaScript - modules

   <aside class="notes">
     
   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## lets set up a JS development environment

   <aside class="notes">
     good time to talk about CDNs
   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## the DOM

   <aside class="notes">
     
   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

## debugging

   <aside class="notes">
     
   </aside>

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

* http://wesbos.com/
* [you don't know JS](https://github.com/getify/You-Dont-Know-JS)
* [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
* [eloquent JavaScript](http://eloquentjavascript.net/)


   <aside class="notes">

   </aside>

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide2.png" -->

please, _please_, **please** fill out a session survey

1. download the Esri Events App
2. select Dev Summit
3. search for "Git/GitHub for Geographers"
4. leave feedback!

---

<!-- .slide: data-background="../../../fresher-template/images/2017-slide3.png" -->

idea, question, issue, or success story?

[@geogangster](https://twitter.com/geogangster) / [@patrickarlt](https://twitter.com/patrickarlt)

john@esri.com / parlt@esri.com

Slides: [`http://bit.ly/2m4A6ei`](http://bit.ly/2m4A6ei)


---

<!-- .slide: data-background="../../../fresher-template/images/2017-end.png" -->
