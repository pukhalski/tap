    var utils = {};

    utils.attachEvent = function( element, eventName, callback ) {
        return element.addEventListener( eventName, callback, false );
    };

    utils.fireFakeEvent = function( e, eventName ) {
        return e.target.dispatchEvent( utils.createEvent( eventName ) );
    };

    utils.createEvent = function( name ) {
        var evnt = window.document.createEvent( 'HTMLEvents' );
        evnt.initEvent( name, true, true );
        evnt.eventName = name;

        return evnt;
    };

    utils.getRealEvent = function( e ) {
        return e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length ? e.originalEvent.touches[ 0 ] : e;
    };
