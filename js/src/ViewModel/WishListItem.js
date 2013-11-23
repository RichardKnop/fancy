"use strict";

define(["Core/ServiceManager", "knockout"], function (ServiceManager, ko) {

    return function () {

        var that = this;

        that.id = ko.observable();

        that.src = ko.observable();

        that.title = ko.observable();

    };

});