"use strict";

requirejs.config({
    baseUrl: "js/src",
    paths: {
        bower                       : "./../../bower_components",
        jquery                      : "./../../bower_components/foundation/js/vendor/jquery",
        parse                       : "//www.parsecdn.com/js/parse-1.2.13.min",
        modernizr                   : "./../../bower_components/foundation/js/vendor/custom.modernizr",
        mustache                    : "./../../bower_components/mustache/mustache",
        foundation                  : "./../../bower_components/foundation/js/foundation/foundation",
        "foundation.alerts"         : "./../../bower_components/foundation/js/foundation/foundation.alerts",
        "foundation.clearing"       : "./../../bower_components/foundation/js/foundation/foundation.clearing",
        "foundation.cookie"         : "./../../bower_components/foundation/js/foundation/foundation.cookie",
        "foundation.dropdown"       : "./../../bower_components/foundation/js/foundation/foundation.dropdown",
        "foundation.forms"          : "./../../bower_components/foundation/js/foundation/foundation.forms",
        "foundation.joyride"        : "./../../bower_components/foundation/js/foundation/foundation.joyride",
        "foundation.magellan"       : "./../../bower_components/foundation/js/foundation/foundation.magellan",
        "foundation.orbit"          : "./../../bower_components/foundation/js/foundation/foundation.orbit",
        "foundation.placeholder"    : "./../../bower_components/foundation/js/foundation/foundation.placeholder",
        "foundation.topbar"         : "./../../bower_components/foundation/js/foundation/foundation.topbar",
        "foundation.reveal"         : "./../../bower_components/foundation/js/foundation/foundation.reveal",
        "foundation.section"        : "./../../bower_components/foundation/js/foundation/foundation.section",
        "foundation.tooltips"       : "./../../bower_components/foundation/js/foundation/foundation.tooltips"
    },
    shim: {
        parse: {
            exports: "Parse"
        },
        modernizr: {
            exports: "Modernizr"
        },
        foundation: {
            deps: ["jquery"]
        },
        "foundation.alerts": {
            deps: ["foundation"]
        },
        "foundation.clearing": {
            deps: ["foundation"]
        },
        "foundation.cookie": {
            deps: ["foundation"]
        },
        "foundation.dropdown": {
            deps: ["foundation"]
        },
        "foundation.forms": {
            deps: ["foundation"]
        },
        "foundation.joyride": {
            deps: ["foundation"]
        },
        "foundation.magellan": {
            deps: ["foundation"]
        },
        "foundation.orbit": {
            deps: ["foundation"]
        },
        "foundation.placeholder": {
            deps: ["foundation"]
        },
        "foundation.reveal": {
            deps: ["foundation"]
        },
        "foundation.section": {
            deps: ["foundation"]
        },
        "foundation.tooltips": {
            deps: ["foundation"]
        },
        "foundation.topbar": {
            deps: ["foundation"]
        }
    }
});

requirejs(["main"]);