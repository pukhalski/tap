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