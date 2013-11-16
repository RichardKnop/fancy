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

        function preloadImg(src, placeholder) {
            var img = document.createElement('img'); // or new Image()
            img.onload = function () {
                placeholder.replaceWith($(img));
            };
            img.src = src;
        }

        this.run = function () {
            (new Service()).getMoreItems().forEach(function (item) {
                $("#content-container").append(Mustache.render($("#item-template").html(), {
                    id: item.id
                }));
                preloadImg(item.src, $("#" + item.id));
            });
            $(document).foundation();
        };

    };

});