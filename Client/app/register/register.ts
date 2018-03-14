/// <reference path="../config/config.ts" />

module app {
    class Register {
        constructor(private $http: ng.IHttpService, private $location: ng.ILocationService) { }

        user;

        register() {
            if (this.user.email && this.user.password && this.user.email) {

            } else {
                alert('Completati toate campurile!');
            }
        }

        cancel() {
            this.$location.path('/home');
        }
    }

    angular.module(moduleName).controller('Register', <any>Register);
}