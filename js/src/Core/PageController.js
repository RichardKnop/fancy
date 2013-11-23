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
            content = $("section.main-section"),
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
                content.append(rowTemplate);
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
                $(".row-item-collection", content).each(function () {
                    var rowItemCollection = $(this),
                        rowItems = $(".row-item", rowItemCollection);
                    if (rowItems.length < 2) {
                        rowItemCollection.append(rowItemHTML);
                        return false;
                    }
                });

                replacementHTML = '<a href="#/item/' + obj.id + '"><img src="';
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

        this.goToPageCommon = function () {
            $(".inner-wrap").unbind("scroll");
            content.html("");
        };

        this.goToHomePage = function () {
            that.goToPageCommon();
            that.loadImages();

            $(".inner-wrap").scroll(function() {
                if($(this).height() + $(this).scrollTop() >= this.scrollHeight) {
                    if (ServiceManager.getService("ImageQueue").finishedLastBatch()) {
                        that.loadImages();
                    }
                }
            });
        };

        this.goToLoginPage = function () {
            that.goToPageCommon();
            content.html(loginTemplate);
            ko.applyBindings(ServiceManager.getService("AppViewModel"), $(".facebook-login-button")[0]);
        };

        this.goToDetailPage = function (id) {
            that.goToPageCommon();

            service.getItemById(id, function (obj) {
                var itemDetailHTML = Mustache.render(itemDetailTemplate, {
                        id              : obj.id,
                        src             : obj.src,
                        description     : obj.description,
                        commentCount    : obj.commentCount
                    }),
                    viewModel;
                content.html(itemDetailHTML);

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
                that.goToLoginPage();
                return;
            }
            that.goToPageCommon();

            service.getWishList(ServiceManager.getService("Facebook").getUserProfile().id, function (items) {
                content.html(Mustache.render(wishListTemplate, {}));
                items.forEach(function (obj) {
                    $(".wishlist-items").append(
                        Mustache.render(wishListItemTemplate, {
                            id: obj.id,
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

    };

});