/// <reference path="../config/config.ts" />

module app {
    class EditMaterie {
        constructor(private $http: ng.IHttpService, private $routeParams) {
            this.id = this.$routeParams.id;

            this.$http.get('/getDetaliiMaterie', {
                params: { id_materie: this.id }
            })
                .then(data => {
                    let dataReq = <any>{};
                    dataReq.info = data;
                    this.materie = dataReq.info.data.materie;
                    this.detalii = dataReq.info.data.detalii_materie ? dataReq.info.data.detalii_materie : <any>{};
                    console.log(this.materie);
                }, err => {
                    console.log(err);
                });
        }


        materie;
        detalii;
        id;
        message = 'EditMaterie';

        save() {
            this.$http.post('/editMaterie', { materie: this.materie, detalii_materie: this.detalii })
                .then(data => {
                    console.log(data);                    
                }, err => {
                    console.log(err);
                });
        }
    }

    angular.module(moduleName).controller('EditMaterie', <any>EditMaterie);
}