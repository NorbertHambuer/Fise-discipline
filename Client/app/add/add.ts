/// <reference path="../config/config.ts" />

module app {
    class Add {
        constructor(private $http: ng.IHttpService) {

        }

        an = [1, 2, 3, 4];
        sem = [1, 2];
        anSelectat: number = this.an[0];
        semSelectat: number = this.sem[0];

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

    }

    angular.module(moduleName).controller('Add', <any>Add);
}