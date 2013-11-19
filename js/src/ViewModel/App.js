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

        this.goToHomePage = function () {
            pageController.goToHomePage();
        };

        this.goToLoginPage = function () {
            pageController.goToLoginPage();
        };

        this.logout = function () {
            ServiceManager.getService("Facebook").logout(function () {
                pageController.goToHomePage();
            });
        };

        this.loginWithFacebook = function () {
            ServiceManager.getService("Facebook").login(function () {
                pageController.goToHomePage();
            });
        };

        /*
         * Binded properties
         */

        this.isUserLoggedIn = ko.observable(false);

    };

});