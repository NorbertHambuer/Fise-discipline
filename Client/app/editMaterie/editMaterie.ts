/// <reference path="../config/config.ts" />

module app {
    class EditMaterie {
        constructor(private $routeParams) {
            this.id = this.$routeParams.id;
        }
        id;
        message = 'EditMaterie';
    }

    angular.module(moduleName).controller('EditMaterie', <any>EditMaterie);
}