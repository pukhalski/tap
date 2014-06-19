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