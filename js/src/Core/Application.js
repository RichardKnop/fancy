"use strict";

define([
    "Core/Config", "Core/ServiceManager", "ViewModel/App", "knockout",
    "parse", "jquery", "modernizr", "foundation", "foundation.topbar"
], function (Config, ServiceManager, AppViewModel, ko) {

    return function () {

        this.run = function () {
            $.getJSON("config.json", function (optionsJSON) {
                // init config and service manager
                Config.init(optionsJSON);
                ServiceManager.init();

                // init the foundation framework
                $(document).foundation();

                // init cloud app storage
                Parse.initialize(
                    "uyHzk27yl86o2wM1eHGB4rgWXhTTb8ghMYQ6PzNp",
                    "B1tvx6jMJCLkshNzKXtT4YG6M0uQ98gtM42Db6K3"
                );

                // init knockout bindings
                var appViewModel = new AppViewModel();

                // render
                var page = ServiceManager.getService("Router").getParam("page");
                appViewModel.renderPage(page);
//                $("nav.top-bar").click(function () {
//                    if (!$(this).parents("li:first").hasClass("has-dropdown") && !$(this).parents("li:first").hasClass("back")) {
//                        console.log($(this).parents("li:first").hasClass("back"));
//                        console.log($(this).parents("li:first").html());
//                        $("nav.top-bar").removeClass("expanded");
//                    }
//                });
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