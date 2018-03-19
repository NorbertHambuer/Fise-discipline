/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var Login = /** @class */ (function () {
        function Login($http, $location) {
            this.$http = $http;
            this.$location = $location;
        }
        Login.prototype.login = function () {
            if (this.username && this.password) {
                this.$http.post('/login', { username: this.username, password: this.password })
                    .then(function (data) {
                    // let token = data.data.token;
                    // console.log('token:', token);
                }, function (err) {
                    console.log(err);
                });
            }
            else {
                alert('nu');
            }
        };
        Login.prototype.cancel = function () {
            this.$location.path('/home');
        };
        return Login;
    }());
    angular.module(app.moduleName).controller('Login', Login);
})(app || (app = {}));
//# sourceMappingURL=login.js.map