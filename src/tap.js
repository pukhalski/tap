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

Tap.init = function() {
    Tap.device.eventsMatrix = Tap.device.findEventsMatrix();
    document.body.addEventListener(Tap.device.eventsMatrix['events']['end'], function() {
        Tap.trigger.apply(Tap, arguments);
    }, false);
};