/// <reference path="../config/config.ts" />

module app {
    class Add {
        constructor(private $http: ng.IHttpService) {
            this.getDataLastSerie();
        }

        an = [1, 2, 3, 4];
        sem = [1, 2];
        anSelectat: number = this.an[0];
        semSelectat: number = this.sem[0];
        dataLastSerie;
        numeSerie = '';
        materii = [];

        adMat(id) {
            this.materii.push({ an: this.anSelectat, semestru: this.semSelectat });
        }

        saveSem() {

        }

        delMat(id) {
            this.materii.pop();
        }

        salveazaSerie() {
            this.$http.post('/newSeries', { serie: this.numeSerie, materii: this.materii })
                .then(data => {
                    console.log(data);
                    this.materii = [];
                }, err => {
                    console.log(err);
                });
        }

        getDataLastSerie() {
            this.$http.get('/getLastSerieMaterii')
                .then(data => {
                    this.dataLastSerie = this.formatMateriiDb(data);
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
        }
    }

    angular.module(moduleName).controller('Add', <any>Add);
}