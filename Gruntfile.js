module.exports = function (grunt) {

    "use strict";

    var productionHTMLFile,
        productionJSFile,
        productionCSSFile,
        generatedPaths,
        dependencyInstallPaths;

    productionHTMLFile = "production.html";
    productionJSFile = "production.js";
    productionCSSFile = "main.css";

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
            productionJSFile: productionJSFile
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
                        modernizr                   : "./../../bower_components/foundation/js/vendor/custom.modernizr",
                        parse                       : "//www.parsecdn.com/js/parse-1.2.13.min",
                        knockout                    : "//cdnjs.cloudflare.com/ajax/libs/knockout/2.3.0/knockout-min",
                        mustache                    : "./../../bower_components/mustache/mustache",
                        director                    : "./../../bower_components/director/build/director.min",
                        foundation                  : "./../../bower_components/foundation/js/foundation/foundation",
                        offcanvas                   : "./../../bower_components/foundation/js/foundation/foundation.offcanvas",
                        abide                       : "./../../bower_components/foundation/js/foundation/foundation.abide",
                        moment                      : "./../../bower_components/momentjs/min/moment.min",
                        nicescroll                  : "./../../bower_components/jquery-nicescroll/jquery.nicescroll.min"
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
                        abide: {
                            deps: ["foundation"]
                        },
                        moment: {
                            exports: "moment"
                        },
                        nicescroll: {
                            deps: ["jquery"]
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
        copy: {
            images: {
                src: "images/*",
                dest: "_site/"
            },
            configFile: {
                src: "config.json",
                dest: "_site/config.json"
            },
            productionHTMLFile: {
                src: productionHTMLFile,
                dest: "_site/index.html"
            },
            productionJSFile: {
                src: productionJSFile,
                dest: "_site/" + productionJSFile
            },
            productionCSSFile: {
                src: productionCSSFile,
                dest: "_site/production.css"
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
        "install", "test", "createSiteDir", "requirejs", "compass",
        "copy:configFile", "copy:images", "copy:productionHTMLFile",
        "copy:productionJSFile", "copy:productionCSSFile", "clean:productionJSFile"
    ]);

    grunt.registerTask("reset", [
        "clean:generated",
        "clean:dependencies"
    ]);

};