"use strict";

define([
    "Core/Config", "Core/ServiceManager",
    "ViewModel/Item", "ViewModel/WishListItem",
    "mustache", "knockout", "jquery", "moment"
], function (Config, ServiceManager, ItemViewModel, WishListItemViewModel, Mustache, ko) {

    return function () {

        var that = this,
            imageQueue = ServiceManager.getService("ImageQueue"),
            service = ServiceManager.getService("Service"),
            contentEl = $("section.main-section"),
            rowTemplate = $("#row-template").html(),
            rowItemTemplate = $("#row-item-template").html(),
            rowItemFigureTemplate = $("#row-item-figure-template").html(),
            loginTemplate = $("#login-template").html(),
            itemDetailTemplate = $("#item-detail-template").html(),
            commentTemplate = $("#comment-template").html(),
            wishListTemplate = $("#wishlist-template").html(),
            wishListItemTemplate = $("#wishlist-item-template").html();

        this.loadImages = function () {
            var i;
            imageQueue.reset();

            service.getMoreItems(Config.imageQueueCapacity, function (items) {
                items.forEach(function (item) {
                    imageQueue.add(item);
                });

                $(".preloader").remove();
                $(".preloader-row").remove();

                for (i = 0; i < Config.imageQueueCapacity / 2; i += 1) {
                    contentEl.append(rowTemplate);
                }

                imageQueue.launch(function (item) {
                    var rowItemHTML = Mustache.render(rowItemTemplate, {
                            id: item.id
                        }),
                        viewModel,
                        replacementHTML;
                    $(".row-item-collection", contentEl).each(function () {
                        var rowItemCollection = $(this),
                            rowItems = $(".row-item", rowItemCollection);
                        if (rowItems.length < 2) {
                            rowItemCollection.append(rowItemHTML);
                            return false;
                        }
                    });

                    replacementHTML = Mustache.render(rowItemFigureTemplate, {
                        id              : item.id,
                        src             : item.src,
                        title           : item.title,
                        commentCount    : item.commentCount
                    })
                    $("#" + item.id).replaceWith(replacementHTML);
                    viewModel = new ItemViewModel();
                    viewModel.id(item.id);
                    viewModel.src(item.src);
                    viewModel.title(item.title);
                    viewModel.commentCount(item.commentCount);
                    ko.applyBindings(viewModel, $("#item-" + item.id)[0]);
                });
            });
        };

        this.common = function () {
            $(window).unbind("scroll");
            contentEl.html('<div class="preloader"></div>');
        };

        this.home = function () {
            that.common();
            that.loadImages();

            $(window).scroll(function() {
                if($(this).scrollTop() + $(this).height() > $(document).height() - 300) {
                    if (ServiceManager.getService("ImageQueue").finishedLastBatch()) {
                        contentEl.append('<div class="row preloader-row" style="position: relative; height: 100px;"><div class="preloader"></div></div>');
                        that.loadImages();
                    }
                }
            });
        };

        this.itemDetail = function (itemID) {
            that.common();

            service.getItemById(itemID, function (item) {
                var itemDetailHTML = Mustache.render(itemDetailTemplate, {
                        id              : item.id,
                        src             : item.src,
                        title           : item.v,
                        commentCount    : item.commentCount
                    }),
                    viewModel,
                    commentsEl;

                $(".preloader").remove();

                contentEl.html(itemDetailHTML);

                viewModel = new ItemViewModel();
                viewModel.id(item.id);
                viewModel.src(item.src);
                viewModel.title(item.title);
                viewModel.commentCount(item.commentCount);
                ko.applyBindings(viewModel, $(".row-item")[0]);

                commentsEl = $("section.comments", contentEl);
                commentsEl.html('<div class="preloader"></div>');
                service.getComments(itemID, function (comments) {

                    $(".preloader").remove();

                    if (0 === comments.length) {
                        commentsEl.html("<p>No comments yet</p>");
                        return;
                    }

                    comments.forEach(function (comment) {
                        var html = Mustache.render(commentTemplate, {
                            avatar: ServiceManager.getService("Facebook").getAvatar(comment.username),
                            body: comment.body.replace(/\n/g, "<br>"),
                            author: comment.author,
                            createdAt: moment(comment.createdAt * 1000).format("h:mm a, Do MMM YYYY")
                        });
                        commentsEl.append(html);
                    });

                });
            });
        };

        this.wishlist = function () {
            if (false === ServiceManager.getService("Facebook").isUserLoggedIn()) {
                that.login();
                return;
            }
            that.common();

            service.getWishList(ServiceManager.getService("Facebook").getUserProfile().id, function (items) {
                $(".preloader").remove();

                contentEl.html(Mustache.render(wishListTemplate, {}));

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

        this.login = function () {
            that.common();
            $(".preloader").remove();
            contentEl.html(loginTemplate);
            ko.applyBindings(ServiceManager.getService("AppViewModel"), $(".facebook-login-button")[0]);
        };

        this.logout = function () {
            ServiceManager.getService("Facebook").logout(function () {
                window.location.hash = "#/";
            });
        };

    };

});