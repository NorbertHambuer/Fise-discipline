module app {
    class Home {
        constructor() {

        }

        message = 'Salut';
    }

    angular.module(moduleName).controller('Home', <any>Home);
}