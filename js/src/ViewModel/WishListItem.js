"use strict";

define(["Core/ServiceManager", "knockout"], function (ServiceManager, ko) {

    return function () {

        this.id = ko.observable();

        this.src = ko.observable();

        this.description = ko.observable();

    };

});