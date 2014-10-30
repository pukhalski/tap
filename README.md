# TAP.JS

`Tap` is a Javascript library for easy unified handling of user interactions such as mouse, touch and pointer events.

* No need to detect what kind of events are supported, `Tap` handles this for you
* Small distibution size of 1Kb
* Use fastest event types supported (majority of browsers has ~300ms delay between touch/pointer events and click). Every milisecond does really matter!

## Installation

If you are using Bower:

```
bower install tap
```

Otherwise just [download the library](https://raw.githubusercontent.com/pukhalski/tap/master/dist/tap.min.js).

Include it anywhere in your html file (it does not matter where — in `<head>` or not):
```html
<script src="bower_components/tap/dist/tap.min.js"></script>
```

## Usage

Using `Tap` is super easy. Just handle the 'tap' event in a way you are familiar with:

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

### With Meteor

First, install Meteor package:

`meteor add jimbog:tap`

Then, the tap event is used just like any other event in Meteor, here is an example for
an anchor element:

```javascript
Template.MyTemplate.events({
    'tap a': function(evt, tmpl){
        evt.preventDefault();
        console.log('you tapped the link');
    }
})
```

### With Angular

Just add code below and use 'ng-tap' insted of 'ng-click'. 
Don't forget add 'ngTap' as dependency

```javascript
angular.module('ngTap', []).directive('ngTap', function() {
    return function(scope, element, attrs) {
        element.bind('tap', function() {
            scope.$apply(attrs['ngTap'], element);
        });
    };
});
```

## Browser Support

Tap was tested on the wide range of devices:

* HTC T9295
* iPhone 4, 5s
* HTC Inspire 4G
* Motorola Xoom
* Nexus 4
* Nexus 5
* BlackBerry Bold 9800
* Acer S7
* Nokia Lumia 825
* Nokia Lumia 800

And browsers:

* Android Browser 2+
* BlackBerry Browser 6+
* Chrome 31+
* Firefox for Android
* Firefox 24+
* IE 9+
* Mobile Chrome
* Mobile Safari 5+
* Opera 12+
* Opera Mini
* Safari 5+

It doesn't mean that all other platforms and browsers (or older versions of them) are not supported.

## LICENSE

Tap is distributed under MIT license. Enjoy!
