/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var Home = /** @class */ (function () {
        function Home($http, $location, user) {
            this.$http = $http;
            this.$location = $location;
            this.user = user;
            this.getData();
        }
        Home.prototype.getData = function () {
            var _this = this;
            this.$http.get('/home')
                .then(function (data) {
                console.log(data);
                _this.data = data.data;
            }, function (err) {
                console.log(err);
            });
        };
        Home.prototype.editMaterie = function (p) {
            this.$location.path('/editMaterie').search({ id: p });
        };
        return Home;
    }());
    angular.module(app.moduleName).controller('Home', Home);
})(app || (app = {}));
//# sourceMappingURL=home.js.map