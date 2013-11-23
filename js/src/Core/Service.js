"use strict";

define([], function () {

    return function () {

        var hardcodedImages = [
            "/images/1.jpg",
            "/images/2.jpg",
            "/images/3.jpg",
            "/images/4.jpg",
            "/images/5.jpg",
            "/images/6.jpg",
            "/images/7.jpg",
            "/images/8.jpg",
            "/images/9.jpg",
            "/images/10.jpg",
            "/images/11.jpg",
            "/images/12.jpg",
            "/images/13.jpg",
            "/images/14.jpg",
            "/images/15.jpg",
            "/images/16.jpg",
            "/images/17.jpg",
            "/images/18.jpg",
            "/images/19.jpg",
            "/images/20.jpg",
            "/images/21.jpg",
            "/images/22.png",
            "/images/23.jpg",
            "/images/24.jpg",
            "/images/25.jpg",
            "/images/26.jpg",
            "/images/27.jpg"
        ];

        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        function guid() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        this.getMoreItems = function (howmany, callback) {
            var items = [], i;
            hardcodedImages.sort( function() {
                return 0.5 - Math.random()
            });
            for (i = 0; i < howmany; i += 1) {
                items.push({
                    id              : guid(),
                    src             : hardcodedImages[i],
                    title           : "Lorem Ipsum Sit Dolor by Foo Bar",
                    commentCount    : Math.floor(Math.random() * 100)
                });
            }
            callback(items);
        };

        this.getItemById = function (id, callback) {
            hardcodedImages.sort( function() {
                return 0.5 - Math.random()
            });
            callback({
                id              : guid(),
                src             : hardcodedImages[0],
                title           : "Lorem Ipsum Sit Dolor by Foo Bar",
                commentCount    : Math.floor(Math.random() * 100)
            });
        };

        this.getWishList = function (id, callback) {
            var items = [], i;
            hardcodedImages.sort( function() {
                return 0.5 - Math.random()
            });
            for (i = 0; i < 18; i += 1) {
                items.push({
                    id              : guid(),
                    src             : hardcodedImages[i],
                    title           : "Lorem Ipsum Sit Dolor by Foo Bar",
                    commentCount    : Math.floor(Math.random() * 100)
                });
            }
            callback(items);
        };

    };

});