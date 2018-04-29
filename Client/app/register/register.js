/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var Register = /** @class */ (function () {
        function Register($location, user) {
            this.$location = $location;
            this.user = user;
        }
        Register.prototype.register = function () {
            var _this = this;
            this.user.register(this.username, this.password, this.fName, this.lName, this.email)
                .then(function (data) {
                _this.$location.path('/home');
            }, function (err) {
                console.log(err);
            });
        };
        Register.prototype.cancel = function () {
            this.$location.path('/home');
        };
        return Register;
    }());
    angular.module(app.moduleName).controller('Register', Register);
})(app || (app = {}));
//# sourceMappingURL=register.js.map