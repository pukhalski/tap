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