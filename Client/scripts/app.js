var app;
(function (app_1) {
    app_1.moduleName = 'app';
    var app = angular.module(app_1.moduleName, ['ngRoute']);
})(app || (app = {}));
/// <reference path="./config.ts" />
var app;
(function (app_2) {
    var app = angular.module(app_2.moduleName);
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
/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var Home = /** @class */ (function () {
        function Home($http, $location) {
            this.$http = $http;
            this.$location = $location;
            this.message = 'Salut';
        }
        return Home;
    }());
    angular.module(app.moduleName).controller('Home', Home);
})(app || (app = {}));
/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var Login = /** @class */ (function () {
        function Login($http, $location) {
            this.$http = $http;
            this.$location = $location;
        }
        Login.prototype.login = function () {
            if (this.username && this.password) {
                this.$http.post('/login', { username: this.username, password: this.password })
                    .then(function (data) {
                    //let token = data.data.token;
                    //console.log('token:', token);
                }, function (err) {
                    console.log(err);
                });
            }
            else {
                alert('nu');
            }
        };
        Login.prototype.cancel = function () {
            this.$location.path('/home');
        };
        return Login;
    }());
    angular.module(app.moduleName).controller('Login', Login);
})(app || (app = {}));
/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var Register = /** @class */ (function () {
        function Register($http, $location) {
            this.$http = $http;
            this.$location = $location;
        }
        Register.prototype.register = function () {
            if (this.user !== undefined) {
                if (this.user.username !== unde)
                    console.log('works');
            }
        };
        Register.prototype.cancel = function () {
            this.$location.path('/home');
        };
        return Register;
    }());
    angular.module(app.moduleName).controller('Register', Register);
})(app || (app = {}));
/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var SessionService = /** @class */ (function () {
        function SessionService() {
            this.userIsAuthenticated = false;
        }
        SessionService.prototype.setUserAuthenticated = function (value) {
            this.userIsAuthenticated = value;
        };
        SessionService.prototype.getUserAuthenticated = function () {
            return this.userIsAuthenticated;
        };
        return SessionService;
    }());
    app.SessionService = SessionService;
    angular.module(app.moduleName).service('SessionService', SessionService);
})(app || (app = {}));
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
//# sourceMappingURL=app.js.map