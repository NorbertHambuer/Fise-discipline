var app;
(function (app_1) {
    app_1.moduleName = 'app';
    var app = angular.module(app_1.moduleName, ['ngRoute']);
    app.run(function (auth) { });
})(app || (app = {}));
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
            this.getDataLastSerie();
        }
        Add.prototype.adMat = function (id) {
            this.materii.push({ an: this.anSelectat, semestru: this.semSelectat });
        };
        Add.prototype.salveazaSerie = function () {
            var _this = this;
            if (this.dataLastSerie.a1s1 !== undefined && this.dataLastSerie.a1s2 !== undefined
                && this.dataLastSerie.a2s1 !== undefined && this.dataLastSerie.a2s2 !== undefined
                && this.dataLastSerie.a3s1 !== undefined && this.dataLastSerie.a3s2 !== undefined
                && this.dataLastSerie.a3s1 !== undefined && this.dataLastSerie.a3s2 !== undefined
                && this.dataLastSerie.a1s1.data.length > 0 && this.dataLastSerie.a1s2.data.length > 0
                && this.dataLastSerie.a2s1.data.length > 0 && this.dataLastSerie.a2s2.data.length > 0
                && this.dataLastSerie.a3s1.data.length > 0 && this.dataLastSerie.a3s2.data.length > 0
                && this.dataLastSerie.a4s1.data.length > 0 && this.dataLastSerie.a4s2.data.length > 0) {
                this.$http.post('/newSeries', {
                    serie: this.numeSerie,
                    materii: {
                        a1s1: this.dataLastSerie.a1s1.data,
                        a1s2: this.dataLastSerie.a1s2.data,
                        a2s1: this.dataLastSerie.a2s1.data,
                        a2s2: this.dataLastSerie.a2s2.data,
                        a3s1: this.dataLastSerie.a3s1.data,
                        a3s2: this.dataLastSerie.a3s2.data,
                        a4s1: this.dataLastSerie.a4s1.data,
                        a4s2: this.dataLastSerie.a4s2.data,
                    }
                }).then(function (data) {
                    console.log(data);
                    _this.materii = [];
                }, function (err) {
                    console.log(err);
                });
            }
            else {
                alert('Nu ati introdus materii pentru toti ani!');
            }
        };
        Add.prototype.adaugaMaterieNoua = function (p) {
            switch (p) {
                case 'a1s1':
                    if (this.dataLastSerie.a1s1 === undefined) {
                        this.dataLastSerie.a1s1 = {};
                        this.dataLastSerie.a1s1.data = [];
                    }
                    this.dataLastSerie.a1s1.data.push({});
                    break;
                case 'a1s2':
                    if (this.dataLastSerie.a1s2 === undefined) {
                        this.dataLastSerie.a1s2 = {};
                        this.dataLastSerie.a1s2.data = [];
                    }
                    this.dataLastSerie.a1s2.data.push({});
                    break;
                case 'a2s1':
                    if (this.dataLastSerie.a2s1 === undefined) {
                        this.dataLastSerie.a2s1 = {};
                        this.dataLastSerie.a2s1.data = [];
                    }
                    this.dataLastSerie.a2s1.data.push({});
                    break;
                case 'a2s2':
                    if (this.dataLastSerie.a2s2 === undefined) {
                        this.dataLastSerie.a2s2 = {};
                        this.dataLastSerie.a2s2.data = [];
                    }
                    this.dataLastSerie.a2s2.data.push({});
                    break;
                case 'a3s1':
                    if (this.dataLastSerie.a3s1 === undefined) {
                        this.dataLastSerie.a3s1 = {};
                        this.dataLastSerie.a3s1.data = [];
                    }
                    this.dataLastSerie.a3s1.data.push({});
                    break;
                case 'a3s2':
                    if (this.dataLastSerie.a3s2 === undefined) {
                        this.dataLastSerie.a3s2 = {};
                        this.dataLastSerie.a3s2.data = [];
                    }
                    this.dataLastSerie.a3s2.data.push({});
                    break;
                case 'a4s1':
                    if (this.dataLastSerie.a4s1 === undefined) {
                        this.dataLastSerie.a4s1 = {};
                        this.dataLastSerie.a4s1.data = [];
                    }
                    this.dataLastSerie.a4s1.data.push({});
                    break;
                case 'a4s2':
                    if (this.dataLastSerie.a4s2 === undefined) {
                        this.dataLastSerie.a4s2 = {};
                        this.dataLastSerie.a4s2.data = [];
                    }
                    this.dataLastSerie.a4s2.data.push({});
                    break;
            }
        };
        Add.prototype.stergeMaterie = function (e, id) {
            switch (e) {
                case 'a1s1':
                    this.dataLastSerie.a1s1.data.splice(id, 1);
                    break;
                case 'a1s2':
                    this.dataLastSerie.a1s2.data.splice(id, 1);
                    break;
                case 'a2s1':
                    this.dataLastSerie.a2s1.data.splice(id, 1);
                    break;
                case 'a2s2':
                    this.dataLastSerie.a2s2.data.splice(id, 1);
                    break;
                case 'a3s1':
                    this.dataLastSerie.a3s1.data.splice(id, 1);
                    break;
                case 'a3s2':
                    this.dataLastSerie.a3s2.data.splice(id, 1);
                    break;
                case 'a4s1':
                    this.dataLastSerie.a4s1.data.splice(id, 1);
                    break;
                case 'a4s2':
                    this.dataLastSerie.a4s2.data.splice(id, 1);
                    break;
            }
        };
        Add.prototype.getDataLastSerie = function () {
            var _this = this;
            this.$http.get('/getLastSerieMaterii')
                .then(function (data) {
                _this.dataLastSerie = _this.formatMateriiDb(data);
                //console.log('aici', this.dataLastSerie.a1s1);
            }, function (err) {
                console.log(err);
            });
        };
        Add.prototype.formatMateriiDb = function (dataDb) {
            var data = {};
            data.info = dataDb.data;
            this.numeSerie = data.info.serie.an_start + "-" + data.info.serie.an_stop;
            //console.log('data', data.info.serie.an_start);
            var materiiData = {};
            data.info.materii.forEach(function (element) {
                //console.log(element);
                var propName = "a" + element.an + "s" + element.sem;
                if (!materiiData[propName]) {
                    materiiData[propName] = {};
                    materiiData[propName].data = [];
                    materiiData[propName].C = 0;
                    materiiData[propName].CR = 0;
                    materiiData[propName].L = 0;
                    materiiData[propName].P = 0;
                    materiiData[propName].S = 0;
                    materiiData[propName].PR = 0;
                }
                materiiData[propName].C += parseInt(element.C) || 0;
                materiiData[propName].CR += parseInt(element.CR) || 0;
                materiiData[propName].L += parseInt(element.L) || 0;
                materiiData[propName].P += parseInt(element.P) || 0;
                materiiData[propName].PR += parseInt(element.PR) || 0;
                materiiData[propName].S += parseInt(element.S) || 0;
                materiiData[propName].data.push(element);
            });
            return materiiData;
        };
        return Add;
    }());
    angular.module(app.moduleName).controller('Add', Add);
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
            }, {
                url: '/editMaterie',
                config: {
                    controller: "EditMaterie", controllerAs: "vm",
                    templateUrl: 'app/editMaterie/editMaterie.html',
                    title: 'Editeaza Materie',
                    requireLogin: true
                }
            }
        ];
    }
})(app || (app = {}));
/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var Edit = /** @class */ (function () {
        function Edit($http, $location, user) {
            this.$http = $http;
            this.$location = $location;
            this.user = user;
            this.message = 'Edit';
            this.metaAddMaterieAn = 0;
            this.metaAddMaterieSem = 0;
            this.maxOrd = "0.00";
            this.serieSelectata = localStorage.getItem("idSerieCurenta");
            this.getMateriiSerie();
            this.materieNoua = {};
            this.materieNoua.Evaluare = "";
            this.materieNoua.ord = "";
            this.materieNoua.disciplina = "";
            this.materieNoua.C = 0;
            this.materieNoua.CR = 0;
            this.materieNoua.L = 0;
            this.materieNoua.P = 0;
            this.materieNoua.PR = 0;
            this.materieNoua.S = 0;
            this.materieNoua.an = 0;
            this.materieNoua.sem = 0;
            this.materieNoua.id_serie = parseInt(this.serieSelectata);
            this.materieNoua._id = 0;
            this.maxOrd = "0.00";
        }
        Edit.prototype.getMateriiSerie = function () {
            var _this = this;
            this.$http.get('/getMateriiSerieId', {
                params: { id_serie: this.serieSelectata }
            })
                .then(function (data) {
                _this.data = _this.formatMateriiDb(data);
                localStorage.setItem("idSerie", _this.serieSelectata);
            }, function (err) {
                console.log(err);
            });
        };
        Edit.prototype.formatMateriiDb = function (dataDb) {
            var data = {};
            data.info = dataDb.data;
            console.log(data);
            var materiiData = {};
            data.info.materii.forEach(function (element) {
                var propName = element.an + "s" + element.sem;
                if (!materiiData[propName]) {
                    materiiData[propName] = {};
                    materiiData[propName].data = [];
                    materiiData[propName].C = 0;
                    materiiData[propName].CR = 0;
                    materiiData[propName].L = 0;
                    materiiData[propName].P = 0;
                    materiiData[propName].PR = 0;
                    materiiData[propName].S = 0;
                }
                materiiData[propName].C += parseInt(element.C) || 0;
                materiiData[propName].CR += parseInt(element.CR) || 0;
                materiiData[propName].L += parseInt(element.L) || 0;
                materiiData[propName].P += parseInt(element.p) || 0;
                materiiData[propName].PR += parseInt(element.PR) || 0;
                materiiData[propName].S += parseInt(element.S) || 0;
                materiiData[propName].data.push(element);
            });
            return materiiData;
        };
        Edit.prototype.deleteMaterie = function (element, index) {
            var _this = this;
            if (confirm("Sigur doriti sa stergeti aceasta materie?"))
                this.$http.delete('/materie', { params: { idMaterie: element._id, idSerie: element.id_serie, ord: element.ord } })
                    .then(function (data) {
                    var dataIndex = element.an + "s" + element.sem;
                    _this.data[dataIndex].data.splice(index, 1);
                    _this.data[dataIndex].C -= element.C;
                    _this.data[dataIndex].CR -= element.CR;
                    _this.data[dataIndex].L -= element.L;
                    _this.data[dataIndex].P -= element.P;
                    _this.data[dataIndex].PR -= element.PR;
                    _this.data[dataIndex].S -= element.S;
                    var dataIndexOne = element.an + "s1";
                    var dataIndexTwo = element.an + "s2";
                    for (var i = 0; i < _this.data[dataIndexOne].data.length; i++) {
                        console.log(_this.data[dataIndexOne].data[i].ord);
                        if (_this.data[dataIndexOne].data[i].ord >= element.ord && _this.data[dataIndexOne].data[i]._id != element._id) {
                            _this.data[dataIndexOne].data[i].ord = (parseFloat(_this.data[dataIndexOne].data[i].ord) - 1) + ".00";
                        }
                    }
                    for (var i = 0; i < _this.data[dataIndexTwo].data.length; i++) {
                        console.log(_this.data[dataIndexTwo].data[i].ord);
                        if (_this.data[dataIndexTwo].data[i].ord >= element.ord && _this.data[dataIndexTwo].data[i]._id != element._id) {
                            _this.data[dataIndexTwo].data[i].ord = (parseFloat(_this.data[dataIndexTwo].data[i].ord) - 1) + ".00";
                        }
                    }
                }, function (err) {
                    console.log(err);
                });
        };
        Edit.prototype.setAddMaterieMeta = function (an, sem) {
            var dataIndex = an + "s" + sem;
            var maxOrd = this.maxOrd;
            this.data[dataIndex].data.forEach(function (element) {
                if (parseFloat(element.ord) > parseFloat(maxOrd)) {
                    maxOrd = element.ord;
                }
            });
            this.maxOrd = maxOrd;
            this.materieNoua.an = an;
            this.materieNoua.sem = sem;
        };
        Edit.prototype.adaugareMaterieNoua = function () {
            var _this = this;
            this.$http.post('/materie', { materie: this.materieNoua })
                .then(function (data) {
                var response = {};
                response = data.data;
                _this.materieNoua._id = response.id_materie;
                var dataIndex = _this.materieNoua.an + "s" + _this.materieNoua.sem;
                _this.data[dataIndex].data.push(_this.materieNoua);
                _this.data[dataIndex].C += _this.materieNoua.C;
                _this.data[dataIndex].CR += _this.materieNoua.CR;
                _this.data[dataIndex].L += _this.materieNoua.L;
                _this.data[dataIndex].P += _this.materieNoua.P;
                _this.data[dataIndex].PR += _this.materieNoua.PR;
                _this.data[dataIndex].S = _this.materieNoua.S;
                var materieNoua = _this.materieNoua;
                if (response.reorder) {
                    var dataIndexOne = _this.materieNoua.an + "s1";
                    var dataIndexTwo = _this.materieNoua.an + "s2";
                    for (var i = 0; i < _this.data[dataIndexOne].data.length; i++)
                        if (_this.data[dataIndexOne].data[i].ord >= materieNoua.ord && _this.data[dataIndexOne].data[i]._id != materieNoua._id) {
                            _this.data[dataIndexOne].data[i].ord = (parseFloat(_this.data[dataIndexOne].data[i].ord) + 1) + ".00";
                        }
                    _this.data[dataIndexOne].data.sort(_this.compare);
                    for (var i = 0; i < _this.data[dataIndexTwo].data.length; i++)
                        if (_this.data[dataIndexTwo].data[i].ord >= materieNoua.ord && _this.data[dataIndexTwo].data[i]._id != materieNoua._id) {
                            _this.data[dataIndexTwo].data[i].ord = (parseFloat(_this.data[dataIndexTwo].data[i].ord) + 1) + ".00";
                        }
                    _this.data[dataIndexTwo].data.sort(_this.compare);
                }
            }, function (err) {
                console.log(err);
            });
        };
        Edit.prototype.checkMaxOrd = function () {
            if (parseFloat(this.materieNoua.ord) >= parseFloat(this.maxOrd)) {
                alert("Ord trebuie sa fie mai mic!");
                this.materieNoua.ord = "";
            }
        };
        Edit.prototype.compare = function (a, b) {
            if (parseFloat(a.ord) < parseFloat(b.ord))
                return -1;
            if (parseFloat(a.ord) > parseFloat(b.ord))
                return 1;
            return 0;
        };
        return Edit;
    }());
    angular.module(app.moduleName).controller('Edit', Edit);
})(app || (app = {}));
/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var EditMaterie = /** @class */ (function () {
        function EditMaterie($http, $routeParams) {
            var _this = this;
            this.$http = $http;
            this.$routeParams = $routeParams;
            this.id = this.$routeParams.id;
            this.$http.get('/getDetaliiMaterie', {
                params: { id_materie: this.id }
            })
                .then(function (data) {
                var dataReq = {};
                dataReq.info = data;
                _this.materie = dataReq.info.data.materie;
                _this.detalii = dataReq.info.data.detalii_materie ? dataReq.info.data.detalii_materie : {};
                console.log(_this.materie);
            }, function (err) {
                console.log(err);
            });
        }
        EditMaterie.prototype.save = function () {
            this.$http.put('/materie', { materie: this.materie, detalii_materie: this.detalii })
                .then(function (data) {
                console.log(data);
            }, function (err) {
                console.log(err);
            });
        };
        return EditMaterie;
    }());
    angular.module(app.moduleName).controller('EditMaterie', EditMaterie);
})(app || (app = {}));
/// <reference path="../config/config.ts" />
var app;
(function (app) {
    var Home = /** @class */ (function () {
        function Home($http, $location, user) {
            this.$http = $http;
            this.$location = $location;
            this.user = user;
            this.totalC = 0;
            this.getData();
            this.getSerii();
        }
        Home.prototype.getData = function () {
            var _this = this;
            this.$http.get('/getLastSerieMaterii')
                .then(function (data) {
                _this.data = _this.formatMateriiDb(data);
            }, function (err) {
                console.log(err);
            });
        };
        Home.prototype.getSerii = function () {
            var _this = this;
            this.$http.get('/getSerii')
                .then(function (data) {
                _this.serii = data.data;
                _this.serii.splice(0, 0, { _id: -1, an_start: "Anul", an_stop: "Curent" });
                _this.serieSelectata = _this.serii[0];
            }, function (err) {
                console.log(err);
            });
        };
        Home.prototype.editMaterie = function (p) {
            this.$location.path('/editMaterie').search({ id: p });
        };
        Home.prototype.listareFisa = function (id) {
            this.$http.post('/fisaDisciplina', { id_materie: id })
                .then(function (data) {
                window.open('localhost:10001/fisaDisciplina.pdf');
                console.log(data);
            }, function (err) {
                console.log(err);
            });
        };
        Home.prototype.listarePlanInvatamant = function () {
            this.$http.post('/planInvatamant', { id_serie: this.serieSelectata })
                .then(function (data) {
                console.log(data);
                window.open('localhost:10001/planInvatamant.pdf');
            }, function (err) {
                console.log(err);
            });
        };
        Home.prototype.getMateriiSerie = function () {
            var _this = this;
            console.log(this.serieSelectata);
            if (this.serieSelectata == -1)
                this.$http.get('/getMateriiAnCurent', {
                    params: { id_serie: this.serieSelectata }
                })
                    .then(function (data) {
                    _this.data = _this.formatMateriiDb(data);
                    localStorage.setItem("idSerieCurenta", _this.serieSelectata);
                }, function (err) {
                    console.log(err);
                });
            else
                this.$http.get('/getMateriiSerieId', {
                    params: { id_serie: this.serieSelectata }
                })
                    .then(function (data) {
                    _this.data = _this.formatMateriiDb(data);
                    localStorage.setItem("idSerieCurenta", _this.serieSelectata);
                }, function (err) {
                    console.log(err);
                });
        };
        Home.prototype.formatMateriiDb = function (dataDb) {
            var data = {};
            data.info = dataDb.data;
            var materiiData = {};
            data.info.materii.forEach(function (element) {
                var propName = element.an + "s" + element.sem;
                if (!materiiData[propName]) {
                    materiiData[propName] = {};
                    materiiData[propName].data = [];
                    materiiData[propName].C = 0;
                    materiiData[propName].CR = 0;
                    materiiData[propName].L = 0;
                    materiiData[propName].P = 0;
                    materiiData[propName].PR = 0;
                    materiiData[propName].S = 0;
                }
                if (element.sem == 1) {
                    if (element.an == 1)
                        materiiData[propName].serieNr = dataDb.data.firstSerie;
                    if (element.an == 2)
                        materiiData[propName].serieNr = dataDb.data.secondSerie;
                    if (element.an == 3)
                        materiiData[propName].serieNr = dataDb.data.thirdSerie;
                    if (element.an == 4)
                        materiiData[propName].serieNr = dataDb.data.fourthSerie;
                }
                materiiData[propName].C += parseInt(element.C) || 0;
                materiiData[propName].CR += parseInt(element.CR) || 0;
                materiiData[propName].L += parseInt(element.L) || 0;
                materiiData[propName].P += parseInt(element.p) || 0;
                materiiData[propName].PR += parseInt(element.PR) || 0;
                materiiData[propName].S += parseInt(element.S) || 0;
                materiiData[propName].data.push(element);
            });
            return materiiData;
        };
        return Home;
    }());
    angular.module(app.moduleName).controller('Home', Home);
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
                    alert('Datele introduse sunt gresite!');
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
                defered.resolve(data);
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
//# sourceMappingURL=app.js.map