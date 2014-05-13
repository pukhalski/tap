# TAP.JS 

1Kb library to handle user interactions such as mouse, touch and pointer events with one unified event `tap`. 

No need to detect what kind of events are supported, no need to write a lot of code, just handle user interactions in the intuitive way.

It is needed because the majority browsers has ~300ms delay between touch/pointer events and click. Every milisecond does really matter!  

## Installation

If you are using bower it is easy to install `tap`:

```
bower install tap
```

In other case you can simply [download the library](http://raw.github.com/pukhalski/tap/dist/tap.min.js).

Include it to your html file (it does not matter where — in `<head>` or not):
```html
<script src="bower_components/tap/dist/tap.min.js"></script>
```

## Usage

Use tap in the way you already know:

```javascript
  document.getElementById('any-element').addEventListener('tap', function (e) {
    // All the magic happens here
  });
```

### With jQuery

```javascript
$('#any-element').on('tap', function (e) {
  // All the magic happens here
});
```

### With Zepto

```javascript
$('#any-element').on('tap', function (e) {
  // All the magic happens here
});
```

### With Dojo

```javascript
var myButton = dojo.byId('any-element');
dojo.connect(myButton, 'tap', function(e){
    // All the magic happens here
});
```

### With YUI

```javascript
YUI().use('event', 'node', function (Y) {
  Y.one('#any-element').on('tap', function(e) {
    // All the magic happens here
  });
});
```

### With ExtJS

```javascript
Ext.get('any-element').on('tap', function (e) {
  // All the magic happens here
});
```

## Browser Support

Tap was tested on the wide range of devices:

- 

## LICENSE

Tap is distributed under MIT license. Enjoy!