"use strict";

define(["Core/ServiceManager", "knockout"], function (ServiceManager, ko) {

    return function () {

        /*
         * Private properties
         */

        var pageController = ServiceManager.getService("PageController");


        /*
         * Event bindings
         */

        this.goToDetailsPage = function () {
            pageController.goToDetailsPage(this);
        };

        this.swish = function () {
            this.swished(true);
            this.swishCount(this.swishCount() + 1);
        };

        this.comments = function () {
            pageController.goToDetailsPage(this);
        };

        this.buy = function () {
            alert("not implemented");
        };

        /*
         * Binded properties
         */

        this.id = ko.observable();

        this.src = ko.observable();

        this.description = ko.observable();

        this.commentCount = ko.observable();

        this.swishCount = ko.observable();

        this.swished = ko.observable(false);

    };

});