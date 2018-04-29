/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var EditMaterie = /** @class */ (function () {
        function EditMaterie($http, $routeParams) {
            this.$http = $http;
            this.$routeParams = $routeParams;
            this.message = 'EditMaterie';
            this.id = this.$routeParams.id;
            console.log("test");
            this.$http.get('/getLastSerieMaterii')
                .then(function (data) {
                console.log(data);
            }, function (err) {
                console.log(err);
            });
        }
        return EditMaterie;
    }());
    angular.module(app.moduleName).controller('EditMaterie', EditMaterie);
})(app || (app = {}));
//# sourceMappingURL=editMaterie.js.map