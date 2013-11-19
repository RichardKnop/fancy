"use strict";

requirejs.config({
    baseUrl: "js/src",
    paths: {
        bower                       : "./../../bower_components",
        jquery                      : "./../../bower_components/foundation/js/vendor/jquery",
        modernizr                   : "./../../bower_components/foundation/js/vendor/custom.modernizr",
        parse                       : "//www.parsecdn.com/js/parse-1.2.13.min",
        knockout                    : "//cdnjs.cloudflare.com/ajax/libs/knockout/2.3.0/knockout-min",
        mustache                    : "./../../bower_components/mustache/mustache",
        foundation                  : "./../../bower_components/foundation/js/foundation/foundation",
        "foundation.topbar"         : "./../../bower_components/foundation/js/foundation/foundation.topbar",
        "foundation/placeholder"    : "./../../bower_components/foundation/js/foundation/foundation.placeholder",
        "foundation.alerts"         : "./../../bower_components/foundation/js/foundation/foundation.alerts"
    },
    shim: {
        modernizr: {
            exports: "Modernizr"
        },
        parse: {
            exports: "Parse"
        },
        knockout: {
            exports: "ko"
        },
        mustache: {
            exports: "Mustache"
        },
        foundation: {
            deps: ["jquery"]
        },
        "foundation.topbar": {
            deps: ["foundation"]
        },
        "foundation.placeholder": {
            deps: ["foundation"]
        },
        "foundation.alerts": {
            deps: ["foundation"]
        }
    }
});

requirejs(["main"]);