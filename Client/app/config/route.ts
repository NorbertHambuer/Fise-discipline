/// <reference path="./config.ts" />

module app {

    var app = angular.module(moduleName);

    app.constant('routes', getRoutes());

    app.config(['$routeProvider', 'routes', ($routeProvider, routes) => {
        routes.forEach(r => $routeProvider.when(r.url, r.config));
        $routeProvider.otherwise({ redirectTo: '/home' });
    }]);

    app.run(($rootScope, user: UserService, routes) => {
        $rootScope.$on('$locationChangeStart', (event, next, current) => {
            for (let route of routes) {
                if (next.indexOf(route.url) != -1) {
                    if (route.config.requireLogin && !user.identity.isAuthenticated) {
                        alert("You need to be authenticated to see this page!");
                        event.preventDefault();
                    }
                }
            }
        });
    });
    
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
            }, {
                url: '/add',
                config: {
                    controller: "Add", controllerAs: "vm",
                    templateUrl: 'app/add/add.html',
                    title: 'Add',
                    requireLogin: true
                }
            }, {
                url: '/edit',
                config: {
                    controller: "Edit", controllerAs: "vm",
                    templateUrl: 'app/edit/edit.html',
                    title: 'Edit',
                    requireLogin: true
                }
            }
        ];
    }
}

