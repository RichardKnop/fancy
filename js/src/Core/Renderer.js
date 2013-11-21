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
            if ("detail" === page && id) {
                pageController.goToDetailPage(id);
                return;
            }
            if ("wishlist" === page) {
                pageController.goToWishListPage(id);
                return;
            }
            pageController.goTo404Page();
        }

    };

});