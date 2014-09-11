(function( window ) {
    var Tap = {};

    var utils = {};

    utils.attachEvent = function( element, eventName, callback ) {
        if ( element.addEventListener ) {
            return element.addEventListener( eventName, callback, false );

        } else if ( element.attachEvent ) {
            return element.attachEvent( 'on' + eventName, callback );

        } else {
            return element[ 'on' + eventName ] = callback;
        }
    };

    utils.fireFakeEvent = function( e, eventName ) {
        var oEvent = utils.createEvent( eventName );

        return document.createEvent ? e.target.dispatchEvent( oEvent ) : e.srcElement.fireEvent( 'on' +  oEvent.eventType, oEvent );
    };

    utils.createEvent = function( name ) {
        var evnt;

        if ( document.createEvent ) {
            evnt = document.createEvent( 'HTMLEvents' );
            evnt.initEvent( name, true, true );

        } else {
            evnt = document.createEventObject(window.event);
            evnt.eventType = name;
        }

        evnt.eventName = evnt.name = name;

        return evnt;
    };

    utils.getRealEvent = function( e ) {
        return e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length ? e.originalEvent.touches[ 0 ] : e;
    };

    var eventMatrix = [{
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

    Tap.options = {
        eventName: 'tap',
        fingerMaxOffset: 11
    };

    var attachDeviceEvent, init, handlers, deviceEvents,
        coords = {};

    attachDeviceEvent = function( eventName ) {
        return utils.attachEvent( document.body, deviceEvents[ eventName ], handlers[ eventName ] );
    };

    handlers = {
        start: function( e ) {
            e = utils.getRealEvent( e );

            coords.start = [ e.pageX, e.pageY ];
            coords.offset = [ 0, 0 ];
        },

        move: function( e ) {
            if (!coords['start'] && !coords['move']) return false;
            
            e = utils.getRealEvent( e );

            coords.move = [ e.pageX, e.pageY ];
            coords.offset = [
                Math.abs( coords.move[ 0 ] - coords.start[ 0 ] ),
                Math.abs( coords.move[ 1 ] - coords.start[ 1 ] )
            ];
        },

        end: function( e ) {
            e = utils.getRealEvent( e );

            if ( coords.offset[ 0 ] < Tap.options.fingerMaxOffset && coords.offset[ 1 ] < Tap.options.fingerMaxOffset && !utils.fireFakeEvent( e, Tap.options.eventName ) ) {
                e.preventDefault();
            }

            coords = {};
        },

        click: function( e ) {
            if ( !utils.fireFakeEvent( e, Tap.options.eventName ) ) {
                return e.preventDefault();
            }
        }
    };

    init = function() {
        var i = eventMatrix.length;

        while ( i-- ) {
            if ( eventMatrix[ i ].test ) {
                deviceEvents = eventMatrix[ i ].events;

                attachDeviceEvent( 'start' );
                attachDeviceEvent( 'move' );
                attachDeviceEvent( 'end' );

                return false;
            }
        }

        return utils.attachEvent( document.body, 'click', handlers[ 'click' ] );
    };

    utils.attachEvent( window, 'load', init );

    window.Tap = Tap;

})( window );