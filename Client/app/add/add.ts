/// <reference path="../config/config.ts" />

module app {
    class Add {
        constructor(private $http: ng.IHttpService) {

        }

        numeSerie = '';
        materiia1s1 = [{}];
        materiia1s2 = [{}];
        materiia2s1 = [{}];
        materiia2s2 = [{}];
        materiia3s1 = [{}];
        materiia3s2 = [{}];
        materiia4s1 = [{}];
        materiia4s2 = [{}];

        adMat(id) {
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
        }

        delMat(id) {
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
        }

        salveazaSerie() {
            let serie = {
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
                .then(data => {
                    console.log(data);
                }, err => {
                    console.log(err);
                });
        }

    }

    angular.module(moduleName).controller('Add', <any>Add);
}