/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var Home = /** @class */ (function () {
        function Home($http, $location) {
            this.$http = $http;
            this.$location = $location;
            this.message = 'Salut';
        }
        return Home;
    }());
    angular.module(app.moduleName).controller('Home', Home);
})(app || (app = {}));
//# sourceMappingURL=home.js.map