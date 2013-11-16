module.exports = function (grunt) {

    "use strict";

    var productionJSFile, productionCSSFile, productionHTMLFile, generatedPaths, dependencyInstallPaths;

    productionJSFile = "production.js";
    productionCSSFile = "production.css";
    productionHTMLFile = "production.html";

    generatedPaths = [
        "_site"
    ];
    dependencyInstallPaths = [
        "bower_components",
        "node_modules"
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"), // We can reference stuff from config this way src: 'src/<%= pkg.name %>.js'
        clean: {
            generated: generatedPaths,
            dependencies : dependencyInstallPaths,
            productionJSFile: productionJSFile,
            productionCSSFile: productionCSSFile
        },
        exec: {
            bower: {
                command: "./node_modules/bower/bin/bower install"
            },
            lint: {
                command: "node lint.js"
            }
        },
        requirejs: {
            app: {
                options: {
                    findNestedDependencies: true,
                    preserveLicenseComments: false,
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
                    },
                    include: [
                        "bower/requirejs/require",
                        "bower/requirejs-domready/domReady",
                        "bootstrap"
                    ],
                    name: "main",
                    optimize: "uglify2",
                    out: "production.js"
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    "production.css": [
                        "css/stylesheets/*.css"
                    ]
                }
            },
            minify: {
                expand: true,
                cwd: ".",
                src: [productionCSSFile],
                dest: "_site",
                ext: ".css"
            }
        },
        copy: {
            images: {
                src: "images/*",
                dest: "_site/"
            },
            productionHTMLFile: {
                src: productionHTMLFile,
                dest: "_site/index.html"
            },
            productionJSFile: {
                src: productionJSFile,
                dest: "_site/" + productionJSFile
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '.',
                    keepalive: true
                }
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: "./css/scss",
                    cssDir: "./css/stylesheets",
                    environment: "production"
                }
            }
        },
        qunit: {
            unit: 'test.html',
            functional: 'functionalTest.html'
        }
    });

    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-compass");
    grunt.loadNpmTasks("grunt-contrib-qunit");

    grunt.registerTask("install", ["exec:bower"]);

    grunt.registerTask("css", [ "compass"]);

    grunt.registerTask("lint", ["exec:lint"]);

    grunt.registerTask("test:unit", "qunit:unit");
    grunt.registerTask("test:func", "qunit:functional");
    grunt.registerTask("test", "qunit");

    grunt.registerTask("createSiteDir", function() {
        grunt.file.mkdir("_site");
    });

    grunt.registerTask("build", [
        "install", "test", "createSiteDir", "requirejs",
        "copy:images", "copy:productionJSFile", "cssmin", "copy:productionHTMLFile",
        "clean:productionJSFile", "clean:productionCSSFile"
    ]);

    grunt.registerTask("reset", [
        "clean:generated",
        "clean:dependencies"
    ]);

};