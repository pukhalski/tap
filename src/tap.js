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
                if ( window.navigator.msPointerEnabled || window.navigator.pointerEnabled ) {
                    var preventDefault = function( clickEvent ) {
                        clickEvent.preventDefault();
                        e.target.removeEventListener( 'click', preventDefault );
                    };

                    e.target.addEventListener( 'click', preventDefault, false );
                }

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
        for ( var i = 0, l = eventMatrix.length; i < l; i++ ) {
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

    if ('addEventListener' in window) // IE8 not supported
        utils.attachEvent( window, 'load', init );

    window.Tap = Tap;
