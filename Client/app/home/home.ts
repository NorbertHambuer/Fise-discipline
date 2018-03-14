/// <reference path="../config/config.ts" />

module app {
    class Home {
        constructor(private $http: ng.IHttpService, private $location: ng.ILocationService) {

        }

        message = 'Salut';

    }

    angular.module(moduleName).controller('Home', <any>Home);
}