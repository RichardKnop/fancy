"use strict";

define(["mustache"], function (Mustache) {

    return function (options) {

        var queue = [],
            loadedImagesCount = 0,
            capacity = options.capacity,
            that = this;

        this.preloadImg = function (src, placeholderId) {
            var img = document.createElement('img');
            img.onload = function () {
                $("#" + placeholderId).replaceWith($(img));
                loadedImagesCount += 1;
            };
            img.src = src;
        }

        this.add = function (obj) {
            queue.push(obj);
        };

        this.launch = function () {
            var container = $("#content-container"),
                template = $("#item-template").html();
            queue.forEach(function (obj) {
                container.append(Mustache.render(template, {
                    id: obj.id
                }));
                that.preloadImg(obj.src, obj.id);
            });
        };

        this.reset = function () {
            loadedImagesCount = 0;
            queue = [];
        };

        this.finishedLastBatch = function () {
            return capacity === loadedImagesCount;
        };

    };

});