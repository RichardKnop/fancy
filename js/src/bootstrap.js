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
        director                    : "./../../bower_components/director/build/director.min",
        foundation                  : "./../../bower_components/foundation/js/foundation/foundation",
        offcanvas                   : "./../../bower_components/foundation/js/foundation/foundation.offcanvas",
        moment                      : "./../../bower_components/momentjs/min/moment.min"
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
        director: {
            exports: "Router"
        },
        foundation: {
            deps: ["jquery"]
        },
        offcanvas: {
            deps: ["foundation"]
        },
        moment: {
            exports: "moment"
        }
    }
});

requirejs(["main"]);