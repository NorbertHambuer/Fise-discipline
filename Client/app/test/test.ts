module app {
    class Test {
        constructor() {

        }

        message = 'test';
    }

    angular.module(moduleName).controller('Test', <any>Test);
}