/// <reference path="../config/config.ts" />

module app {
    class Login {
        constructor(private $http: ng.IHttpService, private $location: ng.ILocationService) { }

        username;
        password;

        login() {
            if (this.username && this.password) {
                this.$http.post('/login', { username: this.username, password: this.password })
                    .then(data => {
                        //let token = data.data.token;
                        //console.log('token:', token);
                    }, err => {
                        console.log(err);
                    });
            } else {
                alert('nu');
            }
        }

        cancel() {
            this.$location.path('/home');
        }
    }

    angular.module(moduleName).controller('Login', <any>Login);
}