/// <reference path="../config/config.ts" />

module app {
    class Edit {
        constructor() {

        }

        message = 'Edit';
    }

    angular.module(moduleName).controller('Edit', <any>Edit);
}