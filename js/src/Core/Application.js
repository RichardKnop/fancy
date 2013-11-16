"use strict";

define([
    "Core/Router",
    "Core/Service",
    "Model/ImageQueue",
    "Model/Facebook",
    "mustache",
    "parse",
    "jquery",
    "modernizr",
    "foundation",
    "foundation.topbar"
], function (Router, Service, ImageQueue, Facebook, Mustache) {

    return function () {

        var router = new Router(),
            service = new Service(),
            howManyImagesToLoadAtOnce = 5,
            imageQueue = new ImageQueue({
                capacity: howManyImagesToLoadAtOnce
            }),
            facebook = new Facebook(),
            that = this,
            doc = $(document),
            container = $("#content-container"),
            itemTemplate = $("#item-template").html(),
            seeMoreButtonTemplate = $("#see-more-button-template").html(),
            loginTemplate = $("#login-template").html();

        this.loadImages = function () {
            imageQueue.reset();
            service.getMoreItems(howManyImagesToLoadAtOnce).forEach(function (obj) {
                imageQueue.add(obj);
            });
            imageQueue.launch(function (obj) {
                var html = Mustache.render(itemTemplate, {
                    id: obj.id
                });
                if ($("#see-more-button", container).length > 0) {
                    $("#see-more-button", container).before(html);
                } else {
                    container.append(html);
                }
            });
        };

        this.loadMore = function () {
            if (imageQueue.finishedLastBatch()) {
                that.loadImages();
            }
        };

        this.pages = {
            home: function () {
                container.html("");
                that.loadImages();
                container.append(seeMoreButtonTemplate);
                $("#see-more-button").click(function () {
                    that.loadMore();
                    return false;
                });
                router.updateParam("page", "home");
            },
            login: function () {
                if (facebook.isUserLoggedIn()) {
                    return;
                }
                container.html(loginTemplate);
                facebook.init();
                $("#login-with-facebook").click(function () {
                    facebook.login(function () {
                        that.pages["home"]();
                    });
                    return false;
                });
                router.updateParam("page", "login");
            }
        };

        this.run = function () {
            router.parseHash(window.location.hash);
            this.pages[router.getParam("page")]();

            // init the foundation framework
            doc.foundation();

            // init cloud
            Parse.initialize(
                "uyHzk27yl86o2wM1eHGB4rgWXhTTb8ghMYQ6PzNp",
                "B1tvx6jMJCLkshNzKXtT4YG6M0uQ98gtM42Db6K3"
            );

            // topbar links
            $("#sign-in").click(function () {
                that.pages["login"]();
                return false;
            });
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