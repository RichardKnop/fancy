"use strict";

define(["Core/Config", "jquery"], function (Config) {

    return function () {

        var queue = [],
            loadedImagesCount = 0,
            that = this;

        this.preloadImg = function (obj, callback) {
            var img = document.createElement('img');
            img.onload = function () {
                loadedImagesCount += 1;
                callback(obj);
            };
            img.src = obj.src;
        };

        this.add = function (obj) {
            queue.push(obj);
        };

        this.launch = function (callback) {
            queue.forEach(function (obj) {
                that.preloadImg(obj, callback);
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