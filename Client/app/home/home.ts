/// <reference path="../config/config.ts" />

module app {
    class Home {
        constructor(private $http: ng.IHttpService, private $location: ng.ILocationService, private user: UserService) {
            this.getData();
            this.getSerii();
        }

        data;
        serii;
        totalC = 0;
        serieSelectata;

        getData() {
            this.$http.get('/getLastSerieMaterii')
                .then(data => {
                    this.data = this.formatMateriiDb(data);
                }, err => {
                    console.log(err);
                });
        }

        getSerii() {
            this.$http.get('/getSerii')
                .then(data => {                   
                    this.serii = data.data;
                    this.serieSelectata = this.serii[0];
                }, err => {
                    console.log(err);
                });
        }

        editMaterie(p) {
            this.$location.path('/editMaterie').search({ id: p });
        }

        listareFisa(id) {        
            this.$http.post('/fisaDisciplina', { id_materie: id })
                .then(data => {
                    console.log(data);
                }, err => {
                    console.log(err);
                });
        }

        listarePlanInvatamant() {            
            this.$http.post('/planInvatamant', { id_serie: this.serieSelectata })
                .then(data => {
                    console.log(data);
                }, err => {
                    console.log(err);
                });
        }

        getMateriiSerie() {
            this.$http.get('/getMateriiSerieId', {
                params: { id_serie: this.serieSelectata }
            })
                .then(data => {                   
                    this.data = this.formatMateriiDb(data);
                }, err => {
                    console.log(err);
                });
        }

        formatMateriiDb(dataDb) {
            let data = <any>{};
            data.info = dataDb.data;
            console.log(data);
            let materiiData = <any>{};
            data.info.materii.forEach(function (element) {
                let propName = element.an + "s" + element.sem;
                if (!materiiData[propName]) {
                    materiiData[propName] = <any>{};
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
        }


    }

    angular.module(moduleName).controller('Home', <any>Home);
}
