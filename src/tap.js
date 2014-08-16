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
