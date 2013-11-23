"use strict";

define([
    "Core/ServiceManager", "mustache", "knockout", "moment"
], function (ServiceManager, Mustache, ko, moment) {

    return function () {

        var commentTemplate = $("#comment-template").html();

        this.addToWishlist = function () {
            this.addedToWishlist(true);
        };

        this.addComment = function () {
            if (false === ServiceManager.getService("Facebook").isUserLoggedIn()) {
                window.location.hash = "#/login";
                return;
            }
            var html = Mustache.render(commentTemplate, {
                avatar: ServiceManager.getService("Facebook").getAvatar(),
                body: $(".add-comment textarea").val().replace(/\n/g, "<br>"),
                author: ServiceManager.getService("Facebook").getUserProfile().name,
                createdAt: moment().format("h:mm a, Do MMM YYYY")
            });
            $(".comments").append(html);
        };

        this.id = ko.observable();

        this.src = ko.observable();

        this.title = ko.observable();

        this.addedToWishlist = ko.observable(false);

        this.commentCount = ko.observable();

    };

});