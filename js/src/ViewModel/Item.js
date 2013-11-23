"use strict";

define(["Core/ServiceManager", "knockout"], function (ServiceManager, ko) {

    return function () {

        this.addToWishlist = function () {
            this.addedToWishlist(true);
        };

        this.addComment = function () {
            alert("not implemented");
        };

        this.id = ko.observable();

        this.src = ko.observable();

        this.title = ko.observable();

        this.addedToWishlist = ko.observable(false);

        this.commentCount = ko.observable();

    };

});