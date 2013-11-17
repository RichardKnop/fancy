"use strict";

define(["Core/ServiceManager"], function (ServiceManager) {

    return {

        render: function () {
            var page = ServiceManager.getService("Router").getParam("page");
            if ("home" === page) {
                ServiceManager.getService("AppViewModel").goToHomePage();
            }
            if ("login" === page) {
                ServiceManager.getService("AppViewModel").goToLoginPage();
            }
        }

    };

});