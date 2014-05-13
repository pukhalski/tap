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
  document.getElementById('tappable-element').addEventListener('tap', function (e) {
    // All the magic happens here
  });
```

### With jQuery

```
  $('#tappable-element').on('tap', function (e) {
    // All the magic happens here
  });
```

### With Zepto

```
  $('#tappable-element').on('tap', function (e) {
    // All the magic happens here
  });
```

### With Dojo

### With YUI

```
  Y.one('#tappable-element').on('tap', function (e) {
    // All the magic happens here
  });
```

### With ExtJS

## Browser Support

Tap was tested on the wide range of devices:

- 

## Known issues

The one most important well-known issue is that you cannot prevent propaganation/bubbling of `click` (or any other) event using `tap` event handler.

## LICENSE

Tap is distributed under MIT license. Enjoy!