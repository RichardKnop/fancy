"use strict";

define(["Core/ServiceManager", "knockout"], function (ServiceManager, ko) {

    return function () {

        var pageController = ServiceManager.getService("PageController");

        this.goToHomePage = function () {
            pageController.goToHomePage();
        };

        this.goToLoginPage = function () {
            pageController.goToLoginPage();
        };

        this.goToWishlist = function () {
            pageController.goToWishListPage();
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

        this.isUserLoggedIn = ko.observable(false);

    };

});