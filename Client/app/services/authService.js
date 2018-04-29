/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var AuthService = /** @class */ (function () {
        function AuthService($http, $q, $location, user) {
            this.$http = $http;
            this.$q = $q;
            this.$location = $location;
            this.user = user;
            this.setSession();
        }
        AuthService.prototype.setSession = function () {
            var token = localStorage.getItem('token') || '';
            console.log(token);
            if (token.length) {
                this.user.identity.isAuthenticated = true;
            }
            else {
                console.log('nu ai token');
            }
        };
        return AuthService;
    }());
    app.AuthService = AuthService;
    angular.module(app.moduleName).service('auth', AuthService);
})(app || (app = {}));
//# sourceMappingURL=authService.js.map