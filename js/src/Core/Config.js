"use strict";

define([], function () {

    return {

        init: function (optionsJSON) {
            var key;
            for (key in optionsJSON) {
                if (optionsJSON.hasOwnProperty(key)) {
                    this[key] = optionsJSON[key];
                }
            }
        }

    };

});