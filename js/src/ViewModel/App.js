"use strict";

define(["Core/ServiceManager", "knockout"], function (ServiceManager, ko) {

    return function () {

        this.logout = function () {
            ServiceManager.getService("Facebook").logout(function () {
                window.location.hash = "#/";
            });
        };

        this.loginWithFacebook = function () {
            ServiceManager.getService("Facebook").login(function () {
                window.location.hash = "#/";
            });
        };

        this.isUserLoggedIn = ko.observable(false);

    };

});