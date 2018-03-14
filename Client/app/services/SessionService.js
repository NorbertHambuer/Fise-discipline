/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var SessionService = /** @class */ (function () {
        function SessionService() {
            this.userIsAuthenticated = false;
        }
        SessionService.prototype.setUserAuthenticated = function (value) {
            this.userIsAuthenticated = value;
        };
        SessionService.prototype.getUserAuthenticated = function () {
            return this.userIsAuthenticated;
        };
        return SessionService;
    }());
    app.SessionService = SessionService;
    angular.module(app.moduleName).service('SessionService', SessionService);
})(app || (app = {}));
//# sourceMappingURL=SessionService.js.map