"use strict";

define(["Core/ServiceManager", "knockout"], function (ServiceManager, ko) {

    return function () {
        this.addToWishlist = function () {
            this.addedToWishlist(true);
        };

        this.id = ko.observable();

        this.src = ko.observable();

        this.description = ko.observable();

        this.addedToWishlist = ko.observable(false);

        this.commentCount = ko.observable();

    };

});