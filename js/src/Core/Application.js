"use strict";

define([
    "Core/Service",
    "mustache",
    "jquery",
    "modernizr",
    "foundation",
    "foundation.topbar"
], function (Service, Mustache) {

    return function () {

        var service = new Service(),
            howManyImagesToLoadAtOnce = 5,
            loadedImagesCount = 0;

        function preloadImg(src, placeholder) {
            var img = document.createElement('img'); // or new Image()
            img.onload = function () {
                placeholder.replaceWith($(img));
                loadedImagesCount += 1;
            };
            img.src = src;
        }

        function loadModeImages() {
            console.log("loading more images");
            service.getMoreItems(howManyImagesToLoadAtOnce).forEach(function (item) {
                $("#content-container").append(Mustache.render($("#item-template").html(), {
                    id: item.id
                }));
                preloadImg(item.src, $("#" + item.id));
            });
        }

        this.run = function () {
            var win = $(window),
                doc = $(document);

            loadModeImages();
            doc.foundation();

            // endless scrolling
            win.scroll(function () {
                if (win.scrollTop() + win.height() == doc.height() && howManyImagesToLoadAtOnce === loadedImagesCount) {
                    loadedImagesCount = 0;
                    loadModeImages();
                }
            });
        };

    };

});