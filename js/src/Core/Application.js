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
                ServiceManager.setService("AppViewModel", appViewModel);

                // bind top bar
                ko.applyBindings(appViewModel, $(".top-bar")[0]);

                // render
                var page = ServiceManager.getService("Router").getParam("page");
                appViewModel.renderPage(page);
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