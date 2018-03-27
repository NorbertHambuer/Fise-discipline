var app;
(function (app_1) {
    app_1.moduleName = 'app';
    var app = angular.module(app_1.moduleName, ['ngRoute']);
    app.run(function (auth) { });
})(app || (app = {}));
/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var navbarController = /** @class */ (function () {
        function navbarController($http, $location, user) {
            this.$http = $http;
            this.$location = $location;
            this.user = user;
        }
        navbarController.prototype.login = function () {
            var _this = this;
            if (this.username && this.password) {
                this.user.login(this.username, this.password)
                    .then(function (data) {
                    _this.$location.path('/home');
                }, function (err) {
                    console.log(err);
                });
            }
            else {
                alert('Campurile trebuie sa fie completate!');
            }
        };
        navbarController.prototype.register = function () {
            this.$location.path('/register');
        };
        navbarController.prototype.logout = function () {
            this.user.logout();
        };
        return navbarController;
    }());
    angular.module(app.moduleName).controller('navbarController', navbarController);
})(app || (app = {}));
/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var AuthService = /** @class */ (function () {
        function AuthService($http, $q, $location, user) {
            this.$http = $http;
            this.$q = $q;
            this.$location = $location;
            this.user = user;
            this.setSession();
        }
        AuthService.prototype.setSession = function () {
            var token = localStorage.getItem('token') || '';
            console.log(token);
            if (token.length) {
                this.user.identity.isAuthenticated = true;
            }
            else {
                console.log('nu ai token');
            }
        };
        return AuthService;
    }());
    app.AuthService = AuthService;
    angular.module(app.moduleName).service('auth', AuthService);
})(app || (app = {}));
/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var UserService = /** @class */ (function () {
        function UserService($http, $q, $location) {
            this.$http = $http;
            this.$q = $q;
            this.$location = $location;
            this.identity = new Identity();
        }
        UserService.prototype.login = function (username, password) {
            var _this = this;
            var defered = this.$q.defer();
            this.$http.post('/login', { username: username, password: password })
                .then(function (data) {
                _this.saveToken(data.data.token);
                _this.identity.isAuthenticated = true;
                defered.resolve();
            }, function (err) {
                console.log(err);
                defered.reject(err);
            });
            return defered.promise;
        };
        UserService.prototype.logout = function () {
            this.deleteToken();
            this.identity.isAuthenticated = false;
            this.$location.path('/home');
        };
        UserService.prototype.register = function (username, password, fName, lName, email) {
            var defered = this.$q.defer();
            this.$http.post('/register', { username: username, password: password, fName: fName, lName: lName, email: email })
                .then(function (data) {
                defered.resolve();
            }, function (err) {
                defered.reject(err);
            });
            return defered.promise;
        };
        UserService.prototype.saveToken = function (token) {
            localStorage.setItem('token', token);
        };
        UserService.prototype.deleteToken = function () {
            localStorage.removeItem('token');
        };
        return UserService;
    }());
    app.UserService = UserService;
    var Identity = /** @class */ (function () {
        function Identity() {
            this.isAuthenticated = false;
        }
        return Identity;
    }());
    angular.module(app.moduleName).service('user', UserService);
})(app || (app = {}));
/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var Register = /** @class */ (function () {
        function Register($location, user) {
            this.$location = $location;
            this.user = user;
        }
        Register.prototype.register = function () {
            var _this = this;
            this.user.register(this.username, this.password, this.fName, this.lName, this.email)
                .then(function (data) {
                _this.$location.path('/home');
            }, function (err) {
                console.log(err);
            });
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
    var Edit = /** @class */ (function () {
        function Edit() {
            this.message = 'Edit';
        }
        return Edit;
    }());
    angular.module(app.moduleName).controller('Edit', Edit);
})(app || (app = {}));
/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var Add = /** @class */ (function () {
        function Add($http) {
            this.$http = $http;
            this.numeSerie = '';
            this.materiia1s1 = [{}];
            this.materiia1s2 = [{}];
            this.materiia2s1 = [{}];
            this.materiia2s2 = [{}];
            this.materiia3s1 = [{}];
            this.materiia3s2 = [{}];
            this.materiia4s1 = [{}];
            this.materiia4s2 = [{}];
        }
        Add.prototype.adMat = function (id) {
            switch (id) {
                case 1:
                    this.materiia1s1.push({});
                    break;
                case 2:
                    this.materiia1s2.push({});
                    break;
                case 3:
                    this.materiia2s1.push({});
                    break;
                case 4:
                    this.materiia2s2.push({});
                    break;
                case 5:
                    this.materiia3s1.push({});
                    break;
                case 6:
                    this.materiia3s2.push({});
                    break;
                case 7:
                    this.materiia4s1.push({});
                    break;
                case 8:
                    this.materiia4s2.push({});
                    break;
            }
        };
        Add.prototype.delMat = function (id) {
            switch (id) {
                case 1:
                    this.materiia1s1.pop();
                    break;
                case 2:
                    this.materiia1s2.pop();
                    break;
                case 3:
                    this.materiia2s1.pop();
                    break;
                case 4:
                    this.materiia2s2.pop();
                    break;
                case 5:
                    this.materiia3s1.pop();
                    break;
                case 6:
                    this.materiia3s2.pop();
                    break;
                case 7:
                    this.materiia4s1.pop();
                    break;
                case 8:
                    this.materiia4s2.pop();
                    break;
            }
        };
        Add.prototype.salveazaSerie = function () {
            var serie = {
                numeSerie: this.numeSerie,
                a1s1: this.materiia1s1,
                a1s2: this.materiia1s2,
                a2s1: this.materiia2s1,
                a2s2: this.materiia2s2,
                a3s1: this.materiia3s1,
                a3s2: this.materiia3s2,
                a4s1: this.materiia4s1,
                a4s2: this.materiia4s2,
            };
            this.$http.post('/newSeries', { serie: serie })
                .then(function (data) {
                console.log(data);
            }, function (err) {
                console.log(err);
            });
        };
        return Add;
    }());
    angular.module(app.moduleName).controller('Add', Add);
})(app || (app = {}));
/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var Home = /** @class */ (function () {
        function Home($http, $location) {
            this.$http = $http;
            this.$location = $location;
            this.getData();
        }
        Home.prototype.getData = function () {
            var _this = this;
            this.$http.get('/home')
                .then(function (data) {
                console.log(data);
                _this.data = data.data;
            }, function (err) {
                console.log(err);
            });
        };
        return Home;
    }());
    angular.module(app.moduleName).controller('Home', Home);
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
    app.run(function ($rootScope, user, routes) {
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            for (var _i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
                var route = routes_1[_i];
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
})(app || (app = {}));
//# sourceMappingURL=app.js.map