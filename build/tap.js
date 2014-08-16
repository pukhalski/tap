(function( window ) {

var Tap = {};

var
	document = window.document,
	utils = {};

utils.attachEvent = function( element, eventName, callback ) {
    if ( element.addEventListener ) {
        return element.addEventListener( eventName, callback, false );

    } else if ( element.attachEvent ) {
        return element.attachEvent( 'on' + eventName, callback );

    } else {
        return element[ 'on' + eventName ] = callback;
    }
};

utils.fireEvent = function( e ) {
    return document.createEvent ? e.target.dispatchEvent( Tap.Event ) : e.target.fireEvent( 'on' + e.eventType, e );
};

utils.createEvent = function( name ) {
    var evnt;

    if ( document.createEvent ) {
        evnt = document.createEvent( 'HTMLEvents' );
        evnt.initEvent( name, true, true );

    } else {
        evnt = document.createEventObject();
        evnt.eventType = name;
    }

    evnt.eventName = name;

    return evnt;
};

utils.getRealEvent = function( e ) {
    return e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length ? e.originalEvent.touches[ 0 ] : e;
};

Tap.eventMatrix = [{
    // Touchable devices
    test: ( 'propertyIsEnumerable' in window || 'hasOwnProperty' in document ) && ( window.propertyIsEnumerable( 'ontouchstart' ) || document.hasOwnProperty( 'ontouchstart') ),
    events: {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend'
    }
}, {
    // IE10
    test: window.navigator.msPointerEnabled,
    events: {
        start: 'MSPointerDown',
        move: 'MSPointerMove',
        end: 'MSPointerUp'
    }
}, {
    // Modern device agnostic web
    test: window.navigator.pointerEnabled,
    events: {
        start: 'pointerdown',
        move: 'pointermove',
        end: 'pointerup'
    }
}];

var
    attachDeviceEvent, init, handlers, deviceEvents,
    coords = {};

handlers = {
    start: function( e ) {
        e = utils.getRealEvent( e );

        coords.start = [ e.pageX, e.pageY ];
        coords.offset = [ 0, 0 ];
    },

    move: function( e ) {
        e = utils.getRealEvent( e );

        coords.move = [ e.pageX, e.pageY ];
        coords.offset = [
            Math.abs( coords.move[ 0 ] - coords.start[ 0 ] ),
            Math.abs( coords.move[ 1 ] - coords.start[ 1 ] )
        ];
    },

    end: function( e ) {
        e = utils.getRealEvent( e );

        if ( coords.offset[ 0 ] < 11 && coords.offset[ 1 ] < 11 && !utils.fireEvent( e ) ) {
            e.preventDefault();
        }
    },

    click: function( e ) {
        if ( !utils.fireEvent( e ) ) {
            return e.preventDefault();
        }
    }
};

init = function() {
    var i = Tap.eventMatrix.length;

    Tap.Event = utils.createEvent( 'tap' );

    while ( i-- ) {
        if ( Tap.eventMatrix[ i ].test ) {
            deviceEvents = Tap.eventMatrix[ i ].events;

            attachDeviceEvent( 'start' );
            attachDeviceEvent( 'move' );
            attachDeviceEvent( 'end' );

            return false;
        }
    }

    return utils.attachEvent( document.body, 'click', handlers[ 'click' ] );
};

attachDeviceEvent = function( eventName ) {
    return utils.attachEvent( document.body, deviceEvents[ eventName ], handlers[ eventName ] );
};

utils.attachEvent( window, 'load', init );

Tap.utils = utils;

window.Tap = Tap;

})( window );