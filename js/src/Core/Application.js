"use strict";

define([
    "Core/Config", "Core/ServiceManager", "Core/Service",
    "Model/ImageQueue", "Model/Facebook", "ViewModel/App",
    "Core/PageController", "knockout",
    "director", "parse", "jquery", "modernizr",
    "foundation", "offcanvas", "nicescroll"
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
                    "/": ServiceManager.getService("PageController").home,
                    "/login": ServiceManager.getService("PageController").login,
                    "/logout": ServiceManager.getService("PageController").logout,
                    "/item/:item": ServiceManager.getService("PageController").itemDetail,
                    "/wishlist": ServiceManager.getService("PageController").wishlist
                });
                router.init();

                if ("" === window.location.hash) {
                    window.location.hash = "#/";
                }

                // init the foundation framework
                $(document).foundation();

                $(".off-canvas-list a").click(function () {
                    $(this).closest(".off-canvas-wrap").removeClass("move-right");
                });

                $("html").niceScroll();
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