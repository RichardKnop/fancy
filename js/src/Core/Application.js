"use strict";

define([
    "Core/Config", "Core/ServiceManager", "Core/Service",
    "Model/ImageQueue", "Model/Facebook", "ViewModel/App",
    "Core/PageController", "knockout",
    "director", "parse", "jquery", "modernizr",
    "foundation", "offcanvas"
], function (
    Config, ServiceManager, Service,
    ImageQueue, Facebook,  AppViewModel,
    PageController, ko, Router
) {

    return function () {

        this.run = function () {
            $.getJSON("config.json", function (optionsJSON) {
                var appViewModel, router;

                // init config and service manager
                Config.init(optionsJSON);
                ServiceManager.setService("Service", new Service());
                ServiceManager.setService("ImageQueue", new ImageQueue({
                    capacity: Config.imageQueueCapacity
                }));
                ServiceManager.setService("Facebook", new Facebook());
                ServiceManager.getService("Facebook").init();
                ServiceManager.setService("PageController", new PageController());

                // init the foundation framework
                $(document).foundation();

                // init cloud app storage
                Parse.initialize(
                    "uyHzk27yl86o2wM1eHGB4rgWXhTTb8ghMYQ6PzNp",
                    "B1tvx6jMJCLkshNzKXtT4YG6M0uQ98gtM42Db6K3"
                );

                // init knockout bindings
                appViewModel = new AppViewModel();
                ServiceManager.setService("AppViewModel", appViewModel);
                ko.applyBindings(appViewModel, $(".tab-bar")[0]);
                ko.applyBindings(appViewModel, $(".left-off-canvas-menu")[0]);

                router = Router({
                    "/": ServiceManager.getService("PageController").goToHomePage,
                    "/login": ServiceManager.getService("PageController").goToLoginPage,
                    "/item/:item": ServiceManager.getService("PageController").goToDetailPage,
                    "/wishlist": ServiceManager.getService("PageController").goToWishListPage
                });
                router.init();
            });
        };

    };

});

//            var TestObject = Parse.Object.extend("TestObject");
//            var testObject = new TestObject();
//            testObject.save({foo: "bar"}, {
//                success: function(object) {
//                    alert("yay! it worked");
//                }
//            });