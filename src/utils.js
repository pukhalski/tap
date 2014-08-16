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
    var oEvent = utils.createEvent( 'tap' );

    return document.createEvent ? e.target.dispatchEvent( oEvent ) : e.target.fireEvent( 'on' + e.eventType, e );
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
