"use strict";

define([], function () {

    return function () {

        var interestingKeys = [
                "page",
                "id"
            ],
            storage = {},
            defaults = {
                page: "home"
            };

        this.parseHash = function (queryString) {
            var params, i, parts, paramsFromHash;

            queryString = queryString.substring(1);
            params = queryString.split("&");

            paramsFromHash = {};
            for (i = 0; i < params.length; i += 1) {
                parts = params[i].split("=");
                paramsFromHash[parts[0]] = decodeURIComponent(parts[1]);
            }

            storage = {};
            for (i = 0; i < interestingKeys.length; i += 1) {
                if (paramsFromHash.hasOwnProperty(interestingKeys[i])) {
                    storage[interestingKeys[i]] = paramsFromHash[interestingKeys[i]];
                }
            }
        };

        this.getParam = function (id) {
            if (storage.hasOwnProperty(id)) {
                return storage[id];
            }
            if (defaults.hasOwnProperty(id)) {
                return defaults[id];
            }
            return undefined;
        };

        this.updateParam = function (key, value) {
            var i,
                newHashParamParts = [],
                param;

            for (i = 0; i < interestingKeys.length; i += 1) {
                if (interestingKeys[i] === key) {
                    storage[key] = value;
                }
            }

            for (param in storage) {
                if (storage.hasOwnProperty(param)) {
                    newHashParamParts.push(param + "=" + encodeURIComponent(storage[param]));
                }
            }

            window.location.hash = "#" + newHashParamParts.join("&");
        };

        this.reset = function () {
            window.location.hash = "";
            storage = {};
        };

    };

});