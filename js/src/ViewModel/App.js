"use strict";

define(["Core/ServiceManager", "knockout"], function (ServiceManager, ko) {

    return function () {

        this.loginURL = ko.computed(function() {
            return this.isUserLoggedIn ? "#/logout" : "#/login";
        }, this);

        this.loginText = ko.computed(function() {
            return this.isUserLoggedIn ? "Sign out" : "Sign in";
        }, this);

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