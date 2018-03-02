module app {

    var app = angular.module(moduleName);

    app.constant('routes', getRoutes());

    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/home' });
    }

    function getRoutes() {
        return [
            {
                url: '/home',
                config: {
                    controller: "Home", controllerAs: 'vm',
                    templateUrl: 'app/home/home.html',
                    //icon: "fa-home",
                    title: 'Pagina de start'
                }
            }
        ];
    }
}

