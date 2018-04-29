/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var navbarController = /** @class */ (function () {
        function navbarController($http, $location, user) {
            this.$http = $http;
            this.$location = $location;
            this.user = user;
        }
        navbarController.prototype.login = function () {
            var _this = this;
            if (this.username && this.password) {
                this.user.login(this.username, this.password)
                    .then(function (data) {
                    _this.$location.path('/home');
                }, function (err) {
                    console.log(err);
                });
            }
            else {
                alert('Campurile trebuie sa fie completate!');
            }
        };
        navbarController.prototype.register = function () {
            this.$location.path('/register');
        };
        navbarController.prototype.logout = function () {
            this.user.logout();
        };
        return navbarController;
    }());
    angular.module(app.moduleName).controller('navbarController', navbarController);
})(app || (app = {}));
//# sourceMappingURL=navbar.js.map