"use strict";

define(["Core/ServiceManager", "knockout"], function (ServiceManager, ko) {

    return function () {

        var pageController = ServiceManager.getService("PageController");

        this.goToDetailsPage = function () {
            pageController.goToDetailsPage(this);
        };

        this.addToWishlist = function () {
            this.addedToWishlist(true);
        };

        this.comments = function () {
            pageController.goToDetailsPage(this);
        };

        this.id = ko.observable();

        this.src = ko.observable();

        this.description = ko.observable();

        this.addedToWishlist = ko.observable(false);

        this.commentCount = ko.observable();

    };

});