"use strict";

define(["Core/ServiceManager", "knockout"], function (ServiceManager, ko) {

    return function () {

        var that = this;

        that.logout = function () {
            ServiceManager.getService("Facebook").logout(function () {
                window.location.hash = "#/";
            });
        };

        that.loginWithFacebook = function () {
            ServiceManager.getService("Facebook").login(function () {
                window.location.hash = "#/";
            });
        };

        that.isUserLoggedIn = ko.observable(false);

    };

});