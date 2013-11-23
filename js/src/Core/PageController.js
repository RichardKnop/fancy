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
            rowItemFigureTemplate = $("#row-item-figure-template").html(),
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

                $(".preloader").remove();
                $(".preloader-row").remove();

                for (i = 0; i < Config.imageQueueCapacity / 2; i += 1) {
                    content.append(rowTemplate);
                }

                imageQueue.launch(function (obj) {
                    var rowItemHTML = Mustache.render(rowItemTemplate, {
                            id: obj.id
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

                    replacementHTML = Mustache.render(rowItemFigureTemplate, {
                        id              : obj.id,
                        src             : obj.src,
                        title           : obj.title,
                        commentCount    : obj.commentCount
                    })
                    $("#" + obj.id).replaceWith(replacementHTML);
                    viewModel = new ItemViewModel();
                    viewModel.id(obj.id);
                    viewModel.src(obj.src);
                    viewModel.title(obj.title);
                    viewModel.commentCount(obj.commentCount);
                    ko.applyBindings(viewModel, $("#item-" + obj.id)[0]);
                });
            });
        };

        this.goToPageCommon = function () {
            $(".inner-wrap").unbind("scroll");
            content.html('<div class="preloader"></div>');
        };

        this.goToHomePage = function () {
            that.goToPageCommon();
            that.loadImages();

            $(".inner-wrap").scroll(function() {
                if($(this).height() + $(this).scrollTop() >= this.scrollHeight) {
                    if (ServiceManager.getService("ImageQueue").finishedLastBatch()) {
                        content.append('<div class="row preloader-row" style="position: relative; height: 100px;"><div class="preloader"></div></div>');
                        that.loadImages();
                    }
                }
            });
        };

        this.goToDetailPage = function (id) {
            that.goToPageCommon();

            service.getItemById(id, function (obj) {
                var itemDetailHTML = Mustache.render(itemDetailTemplate, {
                        id              : obj.id,
                        src             : obj.src,
                        title           : obj.v,
                        commentCount    : obj.commentCount
                    }),
                    viewModel;

                $(".preloader").remove();

                content.html(itemDetailHTML);

                viewModel = new ItemViewModel();
                viewModel.id(obj.id);
                viewModel.src(obj.src);
                viewModel.title(obj.title);
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
                $(".preloader").remove();

                content.html(Mustache.render(wishListTemplate, {}));

                items.forEach(function (obj) {
                    $(".wishlist-items").append(
                        Mustache.render(wishListItemTemplate, {
                            id: obj.id,
                            src: obj.src,
                            title: obj.title
                        })
                    );
                    var viewModel = new WishListItemViewModel();
                    viewModel.id(obj.id);
                    viewModel.src(obj.src);
                    viewModel.title(obj.title);
                    ko.applyBindings(viewModel, $(".wishlist-items li:last")[0]);
                });
            });
        };

        this.goToLoginPage = function () {
            that.goToPageCommon();
            $(".preloader").remove();
            content.html(loginTemplate);
            ko.applyBindings(ServiceManager.getService("AppViewModel"), $(".facebook-login-button")[0]);
        };

    };

});