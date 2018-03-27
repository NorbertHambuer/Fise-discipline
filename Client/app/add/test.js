/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var Test = /** @class */ (function () {
        function Test() {
            this.message = 'test';
        }
        return Test;
    }());
    angular.module(app.moduleName).controller('Test', Test);
})(app || (app = {}));
//# sourceMappingURL=test.js.map