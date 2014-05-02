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
            window.navigator.pointerEnabled;
        },
        events: {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup",
            cancel: "pointercancel"
        }
    }
];

Tap.device = {
    eventsMatrix: null
};

Tap.device.findEventsMatrix = function() {
    var i = eventsMatrix.length;

    while (i--) {
        if (eventsMatrix[i].test) {
            return eventsMatrix[i];
        }
    }

    return eventsMatrix[0];
};