"use strict";

define([
    "Core/Config", "Core/Router", "Core/Service",
    "Model/ImageQueue", "Model/Facebook"
], function (Config, Router, Service, ImageQueue, Facebook) {

    var services = {};

    return {

        init: function () {
            this.setService("Router", new Router());
            this.setService("Service", new Service());
            this.setService("ImageQueue", new ImageQueue({
                capacity: Config.imageQueueCapacity
            }));
            this.setService("Facebook", new Facebook());
            this.getService("Facebook").init();
            this.getService("Router").parseHash(window.location.hash);
        },

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