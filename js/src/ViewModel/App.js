"use strict";

define([
    "Core/Config", "Core/ServiceManager",
    "mustache", "knockout", "jquery"
], function (Config, ServiceManager, Mustache, ko) {

    return function () {

        /*
         * Private properties
         */

        var that = this,
            imageQueue = ServiceManager.getService("ImageQueue"),
            service = ServiceManager.getService("Service"),
            container = $("#content-container"),
            welcomeTemplate = $("#welcome-template").html(),
            itemTemplate = $("#item-template").html(),
            seeMoreButtonTemplate = $("#see-more-button-template").html(),
            loginTemplate = $("#login-template").html();

        /*
         * Private functions
         */

        function loadImages() {
            imageQueue.reset();
            service.getMoreItems(Config.imageQueueCapacity, function (items) {
                items.forEach(function (obj) {
                    imageQueue.add(obj);
                });
            });
            imageQueue.launch(function (obj) {
                var html = Mustache.render(itemTemplate, {
                    id: obj.id
                });
                if ($("#see-more-button", container).length > 0) {
                    $("#see-more-button", container).parent().parent().before(html);
                } else {
                    container.append(html);
                }
            });
        };

        /*
         * Event bindings
         */

        this.seeMore = function () {
            if (ServiceManager.getService("ImageQueue").finishedLastBatch()) {
                loadImages();
            }
        };

        this.logout = function () {
            ServiceManager.getService("Facebook").logout(function () {
                this.home();
            });
        };

        this.loginWithFacebook = function () {
            ServiceManager.getService("Facebook").login(function () {
                that.home();
            });
        };

        /*
         * Binded properties
         */

        this.isUserLoggedIn = ko.observable(false);

        this.siteTitle = ko.observable("Fancy");

        /*
         * Pages
         */

        this.renderPage = function (page) {
            this[page]();
        };

        this.home = function () {
            ServiceManager.getService("Router").updateParam("page", "home");
            container.html(welcomeTemplate);
            loadImages();
            container.append(seeMoreButtonTemplate);
            ko.applyBindings(this, $("#see-more-button")[0]);
        };

        this.login = function () {
            ServiceManager.getService("Router").updateParam("page", "login");
            container.html(loginTemplate);
            ko.applyBindings(this, $("#login-with-fb")[0]);
        };

    };

});