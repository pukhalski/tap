!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Tap=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var eventMatrix = module.exports = [{
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

},{}],2:[function(require,module,exports){
var utils = require('./utils');
var eventMatrix = require('./events');


var Tap = module.exports = {
    options: {
        eventName: 'tap',
        fingerMaxOffset: 11
    }
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

},{"./events":1,"./utils":3}],3:[function(require,module,exports){
var utils = module.exports = {};

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

},{}]},{},[2])(2)
});