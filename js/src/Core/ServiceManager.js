"use strict";

define([], function () {

    var services = {};

    return {

        setService: function (id, service) {
            services[id] = service;
        },

        getService: function (id) {
            if (services.hasOwnProperty(id)) {
                return services[id];
            }
            throw id + " not found in service manager";
        }

    };

});