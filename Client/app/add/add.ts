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

        salveazaSerie() {
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
                    }).then(data => {
                        console.log(data);
                        this.materii = [];
                    }, err => {
                        console.log(err);
                    });
            } else {
                alert('Nu ati introdus materii pentru toti ani!');
            }
        }

        adaugaMaterieNoua(p) {
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
        }

        stergeMaterie(e, id) {
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
        }

        getDataLastSerie() {
            this.$http.get('/getLastSerieMaterii')
                .then(data => {
                    this.dataLastSerie = this.formatMateriiDb(data);
                    //console.log('aici', this.dataLastSerie.a1s1);
                }, err => {
                    console.log(err);
                });
        }

        formatMateriiDb(dataDb) {
            let data = <any>{};
            data.info = dataDb.data;
            this.numeSerie = `${data.info.serie.an_start}-${data.info.serie.an_stop}`;
            //console.log('data', data.info.serie.an_start);
            let materiiData = <any>{};
            data.info.materii.forEach(function (element) {

                //console.log(element);

                let propName = "a" + element.an + "s" + element.sem;
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