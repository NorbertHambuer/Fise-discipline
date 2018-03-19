/// <reference path="../config/config.ts" />

module app {
    class navbarController {
        constructor(private $http: ng.IHttpService, private $location: ng.ILocationService, private user: UserService) {

        }

        username;
        password;

        login() {
            if (this.username && this.password) {
                this.user.login(this.username, this.password)
                    .then(data => {
                        this.$location.path('/home');
                    }, err => {
                        console.log(err);
                    });
            } else {
                alert('Campurile trebuie sa fie completate!');
            }
        }



        register() {
            this.$location.path('/register');
        }

        logout() {
            this.user.logout();
        }

    }

    angular.module(moduleName).controller('navbarController', <any>navbarController);
}