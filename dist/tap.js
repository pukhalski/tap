(function () {

var Tap = {};
Tap.utils = {
    prefixes: ' Webkit Moz O ms MS'.split(' ')
};

Tap.utils.getEventPrefix = function(eventName) {
    var prefix = false,
        i = this.prefixes.length;

    while (i-- && !prefix) {
        if (this.hasEvent(this.prefixes[i] + eventName)) {
            prefix = this.prefixes[i];
        }
    }

    return prefix;
};

// Thanks to Modernizr team for that part of code
Tap.utils.hasEvent = function(eventName) {
    var isSupported,
        element = document.createElement('div');

    if (!eventName) {
        return false;
    }

    // Testing via the `in` operator is sufficient for modern browsers and IE.
    // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and
    // "resize", whereas `in` "catches" those.
    eventName = 'on' + eventName;
    isSupported = eventName in element;

    // Fallback technique for old Firefox - bit.ly/event-detection
    if (!isSupported) {
        if (!element.setAttribute) {
            // Switch to generic element if it lacks `setAttribute`.
            // It could be the `document`, `window`, or something else.
            element = createElement('div');
        }
        if (element.setAttribute && element.removeAttribute) {
            element.setAttribute(eventName, '');
            isSupported = typeof element[eventName] === 'function';

            if (element[eventName] !== undefined) {
                // If property was created, "remove it" by setting value to `undefined`.
                element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
        }
    }

    return isSupported;
};
var eventsMatrix = [
    // Events for desktop browser, old ios, old android
    {
        start: "mousedown",
        move: "mousemove",
        end: "mouseup",
        cancel: "mouseup"
    },

    // Events for touchable devices
    {
        start: "touchstart",
        move: "touchmove",
        end: "touchend",
        cancel: "touchcancel"
    },

    // Events for modern device agnostic web
    {
        start: "pointerdown",
        move: "pointermove",
        end: "pointerup",
        cancel: "pointercancel"
    },

    // Events for IE10 :(
    {
        start: "PointerDown",
        move: "PointerMove",
        end: "PointerUp",
        cancel: "PointerCancel"
    }
];

Tap.device = {
    eventsMatrix: eventsMatrix[0],
    prefix: ''
};

Tap.device.findEventsMatrix = function() {
    var i = eventsMatrix.length;

    while (i--) {
        if (Tap.utils.getEventPrefix(eventsMatrix[i]['start']) !== false) {
            Tap.device.eventsMatrix = eventsMatrix[i];
            Tap.device.prefix = Tap.utils.getEventPrefix(eventsMatrix[i]['start']);

            break;
        }
    }
};
var _eventName = 'tap';

Tap.trigger = function(element) {
    var event;

    if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent(_eventName, true, true);
    } else {
        event = document.createEventObject();
        event.eventType = _eventName;
    }

    event.eventName = _eventName;

    if (document.createEvent) {
        element.dispatchEvent(event);
    } else {
        element.fireEvent("on" + event.eventType, event);
    }
};

Tap.init = function() {
    Tap.device.findEventsMatrix();
    document.body.addEventListener(Tap.device.eventsMatrix['end'], function(e) {
        Tap.trigger(e.target);
    }, false);
};
window.Tap = Tap;
Tap.init();

})();