# TAP.JS 

1Kb library to handle user interactions such as mouse, touch and pointer events with one unified event `tap`. 

No need to detect what kind of events are supported, no need to write a lot of code, just handle user interactions in the intuitive way.

It is needed because the majority browsers has ~300ms delay between touch/pointer events and click. Every milisecond does really matter!  

## Installation

If you are using bower it is easy to install `tap`:

```
bower install tap
```

In other case you can simply [download the library](http://raw.github.com/pukhalski/tap.js/dist/tap.min.js).

Include it to your html file (it does not matter where — in `<head>` or not):
```
<script src="bower_components/tap/dist/tap.min.js"></script>
```

## Usage

Use tap in the way you already know:

```
  document.getElementById('any-element').addEventListener('tap', function (e) {
    // All the magic happens here
  });
```

### With jQuery

```
$('#any-element').on('tap', function (e) {
  // All the magic happens here
});
```

### With Zepto

```
$('#any-element').on('tap', function (e) {
  // All the magic happens here
});
```

### With Dojo

```
var myButton = dojo.byId('any-element');
dojo.connect(myButton, 'tap', function(e){
    // All the magic happens here
});
```

### With YUI

```
YUI().use('event', 'node', function (Y) {
  Y.one('#any-element').on('tap', function(e) {
    // All the magic happens here
  });
});
```

### With ExtJS

```
Ext.get('any-element').on('tap', function (e) {
  // All the magic happens here
});
```

## Browser Support

Tap was tested on the wide range of devices:

- 

## Known issues

The one most important well-known issue is that you cannot prevent propaganation/bubbling of `click` (or any other) event using `tap` event handler.

## LICENSE

Tap is distributed under MIT license. Enjoy!