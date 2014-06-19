(function () {

var Tap = {};
var eventsMatrix = [
    // Events for desktop browser, old ios, old android
    {
        test: function() {
            return true;
        },
        events: {
            start: "mousedown",
            move: "mousemove",
            end: "mouseup",
            cancel: "mouseup"
        }
    },

    // Events for touchable devices
    {
        test: function() {
            if ('propertyIsEnumerable' in window || 'hasOwnProperty' in window.document) {
                return (window.propertyIsEnumerable('ontouchstart') || window.document.hasOwnProperty('ontouchstart'));
            }

            return false;
        },
        events: {
            start: "touchstart",
            move: "touchmove",
            end: "touchend",
            cancel: "touchcancel"
        }
    },

    // Events for IE10 :(
    {
        test: function() {
            return window.navigator.msPointerEnabled;
        },
        events: {
            start: "MSPointerDown",
            move: "MSPointerMove",
            end: "MSPointerUp",
            cancel: "MSPointerCancel"
        }
    },

    // Events for modern device agnostic web
    {
        test: function() {
            return window.navigator.pointerEnabled;
        },
        events: {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup",
            cancel: "pointercancel"
        }
    }
];

var eventsCoordinates = {
    start: [0, 0],
    move: [0, 0],
    offset: [0, 0],
    maxOffset: 10
};

var attachEvent = function(evt, callback, el) {
    el = el || window;
    if (el.addEventListener) {
        el.addEventListener(evt, callback, false);
    } else if (element.attachEvent) {
        el.attachEvent('on' + evt, callback)
    } else {
        el['on' + evt] = callback;
    }
};

Tap.device = {
    eventsMatrix: null
};

Tap.device.findEventsMatrix = function() {
    var i = eventsMatrix.length;

    while (i--) {
        if (eventsMatrix[i].test()) {
            return eventsMatrix[i];
        }
    }

    return eventsMatrix[0];
};
var _eventName = 'tap';

Tap.trigger = function(e) {
    var event = e,
        element = e.target;

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

Tap.handlers = function() {
    return {
        start: function(e) {
            var _event = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length ? e.originalEvent.touches[0] : e;

            eventsCoordinates.start = eventsCoordinates.move = [
                _event.pageX,
                _event.pageY
            ];
            eventsCoordinates.offset = [0, 0];
        },

        move: function(e) {

            var _event = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length ? e.originalEvent.touches[0] : e;

            eventsCoordinates.move = [
                _event.pageX,
                _event.pageY
            ];
            eventsCoordinates.offset = [
                Math.abs(eventsCoordinates.move[0] - eventsCoordinates.start[0]),
                Math.abs(eventsCoordinates.move[1] - eventsCoordinates.start[1]),
            ];
        },

        end: function() {

            if (eventsCoordinates.offset[0] <= eventsCoordinates.maxOffset && eventsCoordinates.offset[1] <= eventsCoordinates.maxOffset)
                Tap.trigger.apply(Tap, arguments);
        }
    };
}();

Tap.init = function() {
    Tap.device.eventsMatrix = Tap.device.findEventsMatrix();

    attachEvent(Tap.device.eventsMatrix['events']['start'], Tap.handlers["start"], document.body);
    attachEvent(Tap.device.eventsMatrix['events']['move'], Tap.handlers["move"], document.body);
    attachEvent(Tap.device.eventsMatrix['events']['end'], Tap.handlers["end"], document.body);
};

attachEvent('load', Tap.init);

})();