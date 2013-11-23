"use strict";

define([
    "Core/ServiceManager", "mustache", "knockout", "moment"
], function (ServiceManager, Mustache, ko, moment) {

    return function () {

        var that = this,
            commentTemplate = $("#comment-template").html();

        that.addToWishlist = function () {
            that.addedToWishlist(true);
        };

        that.addComment = function () {
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

        that.id = ko.observable();

        that.src = ko.observable();

        that.title = ko.observable();

        that.addedToWishlist = ko.observable(false);

        that.commentCount = ko.observable();

    };

});