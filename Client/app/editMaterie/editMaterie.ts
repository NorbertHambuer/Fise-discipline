/// <reference path="../config/config.ts" />

module app {
    class EditMaterie {
        constructor(private $http: ng.IHttpService, private $routeParams) {
            this.id = this.$routeParams.id;

            console.log("test1");
            this.$http.get('/getLastSerieMaterii')
                .then(data => {
                    console.log(data);
                }, err => {
                    console.log(err);
                });
        }



        id;
        message = 'EditMaterie';
    }

    angular.module(moduleName).controller('EditMaterie', <any>EditMaterie);
}