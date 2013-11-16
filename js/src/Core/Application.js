"use strict";

define([
    "Core/Service",
    "Model/ImageQueue",
    "parse",
    "jquery",
    "modernizr",
    "foundation",
    "foundation.topbar"
], function (Service, ImageQuque) {

    return function () {

        var service = new Service(),
            howManyImagesToLoadAtOnce = 5,
            imageQueue = new ImageQuque({
                capacity: howManyImagesToLoadAtOnce
            }),
            that = this,
            win = $(window),
            doc = $(document);

        this.loadModeImages = function () {
            imageQueue.reset();
            service.getMoreItems(howManyImagesToLoadAtOnce).forEach(function (obj) {
                imageQueue.add(obj);
            });
            imageQueue.launch();
        }

        this.hasReachedBottomOfPage = function () {
            return win.scrollTop() + win.height() == doc.height();
        };

        this.onScroll = function () {
            if (that.hasReachedBottomOfPage() && imageQueue.finishedLastBatch()) {
                console.log("loading more images");
                that.loadModeImages();
            }
        };

        this.run = function () {
            // load first images
            this.loadModeImages();

            // init the foundation framework
            doc.foundation();

            // init cloud
            Parse.initialize(
                "uyHzk27yl86o2wM1eHGB4rgWXhTTb8ghMYQ6PzNp",
                "B1tvx6jMJCLkshNzKXtT4YG6M0uQ98gtM42Db6K3"
            );

            // endless scrolling
            win.scroll(this.onScroll);
        };

    };

});

//            var TestObject = Parse.Object.extend("TestObject");
//            var testObject = new TestObject();
//            testObject.save({foo: "bar"}, {
//                success: function(object) {
//                    alert("yay! it worked");
//                }
//            });