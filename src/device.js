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
    }
];

Tap.device = {
    eventsMatrix: eventsMatrix[0],
    prefix: '',

    findEventsMatrix: function() {
        var i = eventsMatrix.length;

        while (i--) {
            if (Tap.utils.hasEvent(eventsMatrix[i]['start'])) {
                console.log(Tap.utils.getEventPrefix(eventsMatrix[i]['start']), eventsMatrix[i]['start']);
                Tap.device.eventsMatrix = eventsMatrix[i];
                Tap.device.prefix = Tap.utils.getEventPrefix(eventsMatrix[i]['start']);

                break;
            }
        }
    }


};

Tap.device.init = (function() {
    Tap.device.findEventsMatrix();
}());