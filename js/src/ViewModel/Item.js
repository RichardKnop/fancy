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

        this.addToWishlist = function () {
            this.addedToWishlist(true);
        };

        this.comments = function () {
            pageController.goToDetailsPage(this);
        };

        /*
         * Binded properties
         */

        this.id = ko.observable();

        this.src = ko.observable();

        this.description = ko.observable();

        this.addedToWishlist = ko.observable(false);

        this.commentCount = ko.observable();

    };

});