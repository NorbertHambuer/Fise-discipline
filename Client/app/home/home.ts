/// <reference path="../config/config.ts" />

module app {
    class Home {
        constructor(private $http: ng.IHttpService, private $location: ng.ILocationService, private user: UserService) {
            this.getData();
        }

        data;

        getData() {
            this.$http.get('/home')
                .then(data => {
                    console.log(data);
                    this.data = data.data;
                }, err => {
                    console.log(err);
                });
        }

        editMaterie(p) {
            this.$location.path('/editMaterie').search({ id: p });
        }

    }

    angular.module(moduleName).controller('Home', <any>Home);
}