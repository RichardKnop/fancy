"use strict";

define([], function () {

    return function () {

        var hardcodedImages = [
            "http://s3.amazonaws.com/tumblr.ade/articles/767/landscape_images/full.jpg?1384193803",
            "http://s3.amazonaws.com/tumblr.ade/articles/771/landscape_images/full.jpg?1384377234",
            "http://data2.whicdn.com/images/56979769/IMG_3229josecret-blo_large.jpg",
            "http://data3.whicdn.com/images/81106715/large.jpg",
            "http://data3.whicdn.com/images/29947814/tumblr_m54jfxErx81qclf26o1_500_large.jpg",
            "http://25.media.tumblr.com/eecef321f63d295be2e6113229ff8610/tumblr_mwcyrslhhS1s6vsumo1_500.png",
            "http://data2.whicdn.com/images/86686998/large.jpg",
            "http://31.media.tumblr.com/00f9759b25ccb34f362364232d8da2e3/tumblr_mwcybyPm3R1skp1dbo1_500.jpg",
            "http://24.media.tumblr.com/757912d86476745c0e89df86b2dc634a/tumblr_mwcximThrV1slmypjo1_400.png",
            "http://31.media.tumblr.com/f1e13d90a9e19bafc6f3da0c214669d2/tumblr_mwcy92KOCP1slmypjo1_500.jpg",
            "http://data1.whicdn.com/images/86685470/large.jpg",
            "http://25.media.tumblr.com/71c0f592809a42745999c0ef97161fb5/tumblr_mwal7xgvp41r1iv4bo1_500.jpg",
            "http://25.media.tumblr.com/e34c12f2f89bb5e5611b54325fa94f20/tumblr_mw9z5xmfG21s8nhsgo1_500.jpg",
            "http://31.media.tumblr.com/e86b3d69c2aac3ec9cb0e74729622598/tumblr_mwc4f6CUzN1qhg1oco1_500.jpg",
            "http://24.media.tumblr.com/e811989181ab1e0d852abd2b3d0e7822/tumblr_mwaf1fZAjG1r09myso1_500.jpg",
            "http://24.media.tumblr.com/908de07daf114a299d3dd95ca1f6e499/tumblr_mw69bgNUtl1s3ddtpo1_500.png",
            "http://25.media.tumblr.com/dab9c6ade69e3efdcf4b1319777c6c7b/tumblr_mw3r1gyPYM1sbr3yko1_500.jpg",
            "http://25.media.tumblr.com/810d7177ece1bba349b0ce52b7e0328a/tumblr_mwa1n1CQwo1rsuch2o1_500.jpg",
            "http://25.media.tumblr.com/80ebc6e55429cb3302a062ef6f780a6f/tumblr_mwc11tQnRy1rns0quo1_500.jpg",
            "http://25.media.tumblr.com/b98771c5f25020b191909c87119e68ef/tumblr_mwbko9QbfP1qarsh8o1_500.png"
        ];

        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };

        function guid() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        this.getMoreItems = function (howmany) {
            var items = [], i;
            hardcodedImages.sort( function() {
                return 0.5 - Math.random()
            });
            for (i = 0; i < howmany; i += 1) {
                items.push({
                    id: guid(),
                    src: hardcodedImages[i]
                });
            }
            return items;
        };

    };

});