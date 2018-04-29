/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var Add = /** @class */ (function () {
        function Add($http) {
            this.$http = $http;
            this.an = [1, 2, 3, 4];
            this.sem = [1, 2];
            this.anSelectat = this.an[0];
            this.semSelectat = this.sem[0];
            this.numeSerie = '';
            this.materii = [];
        }
        Add.prototype.adMat = function (id) {
            this.materii.push({ an: this.anSelectat, semestru: this.semSelectat });
        };
        Add.prototype.saveSem = function () {
        };
        Add.prototype.delMat = function (id) {
            this.materii.pop();
        };
        Add.prototype.salveazaSerie = function () {
            var _this = this;
            this.$http.post('/newSeries', { serie: this.numeSerie, materii: this.materii })
                .then(function (data) {
                console.log(data);
                _this.materii = [];
            }, function (err) {
                console.log(err);
            });
        };
        return Add;
    }());
    angular.module(app.moduleName).controller('Add', Add);
})(app || (app = {}));
//# sourceMappingURL=add.js.map