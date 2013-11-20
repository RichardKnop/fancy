"use strict";

define(["Core/ServiceManager", "knockout"], function (ServiceManager, ko) {

    return function () {

        var pageController = ServiceManager.getService("PageController");

        this.openPanelMenu = function () {
            var snapper = ServiceManager.getService("Snapper");
            if ("left" ===  snapper.state().state){
                snapper.close();
            } else {
                snapper.open("left");
            }
        };

        this.search = function () {
            alert("not implemented");
        };

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

        this.searchTerm = ko.observable("");

        this.isUserLoggedIn = ko.observable(false);

    };

});