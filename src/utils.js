    var utils = {};

    utils.attachEvent = function(element, eventName, callback) {
        if ('addEventListener' in window) {
            return element.addEventListener(eventName, callback, false);
        }
    };

    utils.fireFakeEvent = function(e, eventName) {
        if (document.createEvent) {
            return e.target.dispatchEvent(utils.createEvent(eventName));
        }
    };

    utils.createEvent = function(name) {
        if (document.createEvent) {
            var evnt = window.document.createEvent('HTMLEvents');

            evnt.initEvent(name, true, true);
            evnt.eventName = name;

            return evnt;
        }
    };

    utils.getRealEvent = function(e) {
        if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length) {
            return e.originalEvent.touches[0];
        } else if (e.touches && e.touches.length) {
            return e.touches[0];
        }

        return e;
    };
