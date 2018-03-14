/// <reference path="./config.ts" />
var app;
(function (app_1) {
    var app = angular.module(app_1.moduleName);
    app.constant('routes', getRoutes());
    app.config(['$routeProvider', 'routes', function ($routeProvider, routes) {
            routes.forEach(function (r) { return $routeProvider.when(r.url, r.config); });
            $routeProvider.otherwise({ redirectTo: '/home' });
        }]);
    /*
    app.run(($rootScope, SessionService: SessionService, routes) => {
        $rootScope.$on('$locationChangeStart', (event, next, current) => {
            console.log(routes);
            for (let i in routes) {
                if (next.indexOf(i) != -1) {
                    if (routes[i].config.requireLogin && !SessionService.getUserAuthenticated()) {
                        alert("You need to be authenticated to see this page!");
                        event.preventDefault();
                    }
                }
            }
        });
    });
    */
    function getRoutes() {
        return [
            {
                url: '/home',
                config: {
                    controller: "Home", controllerAs: 'vm',
                    templateUrl: 'app/home/home.html',
                    title: 'Pagina de start',
                    requireLogin: false
                }
            }, {
                url: '/test',
                config: {
                    controller: "Test", controllerAs: 'vm',
                    templateUrl: 'app/test/test.html',
                    title: 'Pagina de test',
                    requireLogin: true
                }
            }, {
                url: '/login',
                config: {
                    controller: "Login", controllerAs: "vm",
                    templateUrl: 'app/login/login.html',
                    title: 'Log in',
                    requireLogin: false
                }
            }, {
                url: '/register',
                config: {
                    controller: "Register", controllerAs: "vm",
                    templateUrl: 'app/register/register.html',
                    title: 'Register',
                    requireLogin: false
                }
            }
        ];
    }
})(app || (app = {}));
//# sourceMappingURL=route.js.map