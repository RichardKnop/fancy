"use strict";

define([
    "Core/Config", "Core/ServiceManager", "ViewModel/Item",
    "mustache", "knockout", "jquery"
], function (Config, ServiceManager, ItemViewModel, Mustache, ko) {

    return function () {

        var queue = [],
            loadedImagesCount = 0,
            that = this;

        this.preloadImg = function (obj) {
            var img = document.createElement('img');
            img.onload = function () {
                var figure = Mustache.render($("#fig-template").html(), {
                        src: obj.src,
                        caption: obj.desc
                    }),
                    viewModel;

                $("#" + obj.id).replaceWith(figure);
                loadedImagesCount += 1;

                viewModel = new ItemViewModel();
                viewModel.likesCount(obj.likesCount);
                ko.applyBindings(viewModel, $("#item-" + obj.id)[0]);
            };
            img.src = obj.src;
        };

        this.add = function (obj) {
            queue.push(obj);
        };

        this.launch = function (callback) {
            queue.forEach(function (obj) {
                callback(obj);
                that.preloadImg(obj);
            });
        };

        this.reset = function () {
            loadedImagesCount = 0;
            queue = [];
        };

        this.finishedLastBatch = function () {
            return Config.imageQueueCapacity === loadedImagesCount;
        };

    };

});