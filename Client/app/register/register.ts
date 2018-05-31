/// <reference path="../config/config.ts" />

module app {
    class Register {
        constructor(private $location: ng.ILocationService, private user: UserService) { }

        username;
        password;
        fName;
        lName;
        email;

        register() {
            this.user.register(this.username, this.password, this.fName, this.lName, this.email)
                .then(data => {
                    this.$location.path('/home');
                }, err => {
                    console.log(err);
                })
        }

        cancel() {
            this.$location.path('/home');
        }
    }

    angular.module(moduleName).controller('Register', <any>Register);
}