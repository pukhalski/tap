(function( window ) {

    var
        attachEvent, attachDeviceEvent, init, eventsMatrix, handlers, fireEvent, Tap, createEvent, deviceEvents, getRealEvent,

        document = window.document,
        coords = {};

    attachEvent = function( element, eventName, callback ) {
        if ( element.addEventListener ) {
            return element.addEventListener( eventName, callback, false );

        } else if ( element.attachEvent ) {
            return element.attachEvent( 'on' + eventName, callback );

        } else {
            return element[ 'on' + eventName ] = callback;
        }
    };

    attachDeviceEvent = function( eventName ) {
        return attachEvent( document.body, deviceEvents[ eventName ], handlers[ eventName ] );
    };

    eventsMatrix = [{
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

    createEvent = function( name ) {
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

    fireEvent = function( e ) {
        return document.createEvent ? e.target.dispatchEvent( Tap ) : e.target.fireEvent( 'on' + e.eventType, e );
    };

    getRealEvent = function( e ) {
        return e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length ? e.originalEvent.touches[ 0 ] : e;
    };

    handlers = {
        start: function( e ) {
            e = getRealEvent( e );

            coords.start = [ e.pageX, e.pageY ];
            coords.offset = [ 0, 0 ];
        },

        move: function( e ) {
            e = getRealEvent( e );

            coords.move = [ e.pageX, e.pageY ];
            coords.offset = [
                Math.abs( coords.move[ 0 ] - coords.start[ 0 ] ),
                Math.abs( coords.move[ 1 ] - coords.start[ 1 ] )
            ];
        },

        end: function( e ) {
            e = getRealEvent( e );

            if ( coords.offset[ 0 ] < 11 && coords.offset[ 1 ] < 11 && !fireEvent( e ) ) {
                e.preventDefault();
            }
        },

        click: function( e ) {
            if ( !fireEvent( e ) ) {
                return e.preventDefault();
            }
        }
    };

    init = function() {
        var i = eventsMatrix.length;

        Tap = createEvent( 'tap' );

        while ( i-- ) {
            if ( eventsMatrix[ i ].test ) {
                deviceEvents = eventsMatrix[ i ].events;

                attachDeviceEvent( 'start' );
                attachDeviceEvent( 'move' );
                attachDeviceEvent( 'end' );

                return false;
            }
        }

        return attachEvent( document.body, 'click', handlers[ 'click' ] );
    };

    attachEvent( window, 'load', init );

})( window );
