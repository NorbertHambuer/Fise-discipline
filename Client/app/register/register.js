/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var Register = /** @class */ (function () {
        function Register($http, $location) {
            this.$http = $http;
            this.$location = $location;
        }
        Register.prototype.register = function () {
            if (this.user.email && this.user.password && this.user.email) {
            }
            else {
                alert('Completati toate campurile!');
            }
        };
        Register.prototype.cancel = function () {
            this.$location.path('/home');
        };
        return Register;
    }());
    angular.module(app.moduleName).controller('Register', Register);
})(app || (app = {}));
//# sourceMappingURL=register.js.map