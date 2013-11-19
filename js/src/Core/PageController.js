"use strict";

define([
    "Core/Config", "Core/ServiceManager", "ViewModel/Item",
    "mustache", "knockout", "jquery"
], function (Config, ServiceManager, ItemViewModel, Mustache, ko) {

    return function () {

        var that = this,
            imageQueue = ServiceManager.getService("ImageQueue"),
            service = ServiceManager.getService("Service"),
            router = ServiceManager.getService("Router"),
            container = $("#content-container"),
            rowTemplate = $("#row-template").html(),
            rowItemTemplate = $("#row-item-template").html(),
            loginTemplate = $("#login-template").html(),
            itemDetailTemplate = $("#item-detail-template").html();

        this.loadImages = function () {
            var i;
            imageQueue.reset();
            service.getMoreItems(Config.imageQueueCapacity, function (items) {
                items.forEach(function (obj) {
                    imageQueue.add(obj);
                });
            });
            for (i = 0; i < Config.imageQueueCapacity / 2; i += 1) {
                container.append(rowTemplate);
            }
            imageQueue.launch(function (obj) {
                var rowItemHTML = Mustache.render(rowItemTemplate, {
                        id              : obj.id,
                        placeholder     : '<div class="preloader" id="' + obj.id + '"></div>',
                        description     : obj.description,
                        commentCount    : obj.commentCount,
                        swishCount      : obj.swishCount
                    }),
                    viewModel,
                    replacementHTML;
                $(".row-item-collection", container).each(function () {
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
                viewModel.swishCount(obj.swishCount);
                ko.applyBindings(viewModel, $("#item-" + obj.id)[0]);
            });
        };

        this.goToHomePage = function () {
            router.reset();
            router.updateParam("page", "home");
            container.html("");
            this.loadImages();
            $(window).scroll(function() {
                if($(window).scrollTop() + $(window).height() == $(document).height()) {
                    if (ServiceManager.getService("ImageQueue").finishedLastBatch()) {
                        that.loadImages();
                    }
                }
            });
        };

        this.goToLoginPage = function () {
            router.reset();
            router.updateParam("page", "login");
            container.html(loginTemplate);
            ko.applyBindings(ServiceManager.getService("AppViewModel"), $("#login-with-fb")[0]);
        };

        this.goToDetailsPage = function (id) {
            router.reset();
            router.updateParam("page", "details");
            router.updateParam("id", id);
            service.getItemById(id, function (obj) {
                var itemDetailHTML = Mustache.render(itemDetailTemplate, {
                        id              : obj.id,
                        src             : obj.src,
                        description     : obj.description,
                        commentCount    : obj.commentCount,
                        swishCount      : obj.swishCount,
                        swished         : obj.swished
                    }),
                    viewModel;
                container.html(itemDetailHTML);

                viewModel = new ItemViewModel();
                viewModel.id(obj.id);
                viewModel.src(obj.src);
                viewModel.description(obj.description);
                viewModel.commentCount(obj.commentCount);
                viewModel.swishCount(obj.swishCount);
                ko.applyBindings(viewModel, $(".row-item")[0]);
            });
        };

        this.goTo404Page = function () {
            alert("not implemented");
        };

    };

});