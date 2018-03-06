module app {

    var app = angular.module(moduleName);

    app.constant('routes', getRoutes());

    app.config(['$routeProvider', 'routes', ($routeProvider, routes) => {
        routes.forEach(r => $routeProvider.when(r.url, r.config));
        $routeProvider.otherwise({ redirectTo: '/home' });
    }]);

    function getRoutes() {
        return [
            {
                url: '/home',
                config: {
                    controller: "Home", controllerAs: 'vm',
                    templateUrl: 'app/home/home.html',
                    title: 'Pagina de start'
                }
            }, {
                url: '/test',
                config: {
                    controller: "Test", controllerAs: 'vm',
                    templateUrl: 'app/test/test.html',
                    title: 'Pagina de test'
                }
            }
        ];
    }
}

