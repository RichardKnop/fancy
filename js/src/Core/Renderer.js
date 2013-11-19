"use strict";

define(["Core/ServiceManager"], function (ServiceManager) {

    return {

        render: function () {
            var router = ServiceManager.getService("Router"),
                pageController = ServiceManager.getService("PageController"),
                page = router.getParam("page"),
                id = router.getParam("id");
            if ("home" === page) {
                pageController.goToHomePage();
                return;
            }
            if ("login" === page) {
                pageController.goToLoginPage();
                return;
            }
            if ("details" === page && id) {
                pageController.goToDetailsPage(id);
                return;
            }
            pageController.goTo404Page();
        }

    };

});