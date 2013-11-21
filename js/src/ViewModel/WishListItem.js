"use strict";

define(["Core/ServiceManager", "knockout"], function (ServiceManager, ko) {

    return function () {

        var pageController = ServiceManager.getService("PageController");

        this.goToDetailsPage = function () {
            pageController.goToDetailPage(this);
        };

        this.id = ko.observable();

        this.src = ko.observable();

        this.description = ko.observable();

    };

});