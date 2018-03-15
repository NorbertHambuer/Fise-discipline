/// <reference path="../config/config.ts" />

module app {
    class Register {
        constructor(private $http: ng.IHttpService, private $location: ng.ILocationService) { }

        user;

        register() {
            if (this.user !== undefined) {
                if (this.user.username !== unde)
                console.log('works');
            }
        }

        cancel() {
            this.$location.path('/home');
        }
    }

    angular.module(moduleName).controller('Register', <any>Register);
}