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


Tap.init = (function() {
    document.body.addEventListener(Tap.device.eventsMatrix['end'], function(e) {
        Tap.trigger(e.target);
    }, false);
}());