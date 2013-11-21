"use strict";

define([
    "Core/Config", "Core/ServiceManager",
    "ViewModel/Item", "ViewModel/WishListItem",
    "mustache", "knockout", "jquery"
], function (Config, ServiceManager, ItemViewModel, WishListItemViewModel, Mustache, ko) {

    return function () {

        var that = this,
            imageQueue = ServiceManager.getService("ImageQueue"),
            service = ServiceManager.getService("Service"),
            router = ServiceManager.getService("Router"),
            content = $("#content"),
            contentContainer = $("#content-container"),
            rowTemplate = $("#row-template").html(),
            rowItemTemplate = $("#row-item-template").html(),
            loginTemplate = $("#login-template").html(),
            itemDetailTemplate = $("#item-detail-template").html(),
            wishListTemplate = $("#wishlist-template").html(),
            wishListItemTemplate = $("#wishlist-item-template").html();

        this.loadImages = function () {
            var i;
            imageQueue.reset();

            service.getMoreItems(Config.imageQueueCapacity, function (items) {
                items.forEach(function (obj) {
                    imageQueue.add(obj);
                });
            });

            for (i = 0; i < Config.imageQueueCapacity / 2; i += 1) {
                contentContainer.append(rowTemplate);
            }

            imageQueue.launch(function (obj) {
                var rowItemHTML = Mustache.render(rowItemTemplate, {
                        id              : obj.id,
                        placeholder     : '<div class="preloader" id="' + obj.id + '"></div>',
                        description     : obj.description,
                        commentCount    : obj.commentCount
                    }),
                    viewModel,
                    replacementHTML;
                $(".row-item-collection", contentContainer).each(function () {
                    var rowItemCollection = $(this),
                        rowItems = $(".row-item", rowItemCollection);
                    if (rowItems.length < 2) {
                        rowItemCollection.append(rowItemHTML);
                        return false;
                    }
                });

                replacementHTML = '<a href="javascript:;" data-bind="click: goToDetailsPage"><img src="';
                replacementHTML += obj.src + '" alt="' + obj.description +'"></a>';
                $("#" + obj.id).replaceWith(replacementHTML);

                viewModel = new ItemViewModel();
                viewModel.id(obj.id);
                viewModel.src(obj.src);
                viewModel.description(obj.description);
                viewModel.commentCount(obj.commentCount);
                ko.applyBindings(viewModel, $("#item-" + obj.id)[0]);
            });
        };

        this.goToPageCommon = function (page) {
            $("#content").unbind("scroll");
            router.reset();
            router.updateParam("page", page);
            contentContainer.html("");
            ServiceManager.getService("Snapper").close();
        };

        this.goToHomePage = function () {
            this.goToPageCommon("home");
            this.loadImages();

            content.scroll(function() {
                if(content.height() + content.scrollTop() >= content[0].scrollHeight - 150) {
                    if (ServiceManager.getService("ImageQueue").finishedLastBatch()) {
                        that.loadImages();
                    }
                }
            });
        };

        this.goToLoginPage = function () {
            this.goToPageCommon("login");
            contentContainer.html(loginTemplate);
            ko.applyBindings(ServiceManager.getService("AppViewModel"), $(".facebook-login-button")[0]);
        };

        this.goToDetailPage = function (id) {
            this.goToPageCommon("detail");
            router.updateParam("id", id);

            service.getItemById(id, function (obj) {
                var itemDetailHTML = Mustache.render(itemDetailTemplate, {
                        id              : obj.id,
                        src             : obj.src,
                        description     : obj.description,
                        commentCount    : obj.commentCount
                    }),
                    viewModel;
                contentContainer.html(itemDetailHTML);

                viewModel = new ItemViewModel();
                viewModel.id(obj.id);
                viewModel.src(obj.src);
                viewModel.description(obj.description);
                viewModel.commentCount(obj.commentCount);
                ko.applyBindings(viewModel, $(".row-item")[0]);
            });
        };

        this.goToWishListPage = function () {
            if (false === ServiceManager.getService("Facebook").isUserLoggedIn()) {
                this.goToLoginPage();
                return;
            }
            this.goToPageCommon("wishlist");

            service.getWishList(ServiceManager.getService("Facebook").getUserProfile().id, function (items) {
                contentContainer.html(Mustache.render(wishListTemplate, {}));
                items.forEach(function (obj) {
                    $(".wishlist-items").append(
                        Mustache.render(wishListItemTemplate, {
                            src: obj.src,
                            description: obj.description
                        })
                    );
                    var viewModel = new WishListItemViewModel();
                    viewModel.id(obj.id);
                    viewModel.src(obj.src);
                    viewModel.description(obj.description);
                    ko.applyBindings(viewModel, $(".wishlist-items li:last")[0]);
                });
            });
        };

        this.goTo404Page = function () {
            alert("not implemented");
        };

    };

});