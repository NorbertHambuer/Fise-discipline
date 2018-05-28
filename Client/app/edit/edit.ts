/// <reference path="../config/config.ts" />

module app {
    class Edit {
        constructor(private $http: ng.IHttpService, private $location: ng.ILocationService, private user: UserService) {
            this.serieSelectata = localStorage.getItem("idSerieCurenta");
            this.getMateriiSerie();
            this.materieNoua = <any>{};

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

        materieNoua;
        message = 'Edit';
        data;
        serieSelectata;
        metaAddMaterieAn = 0 ;
        metaAddMaterieSem = 0;
        maxOrd = "0.00";

        getMateriiSerie() {
            this.$http.get('/getMateriiSerieId', {
                params: { id_serie: this.serieSelectata }
            })
                .then(data => {
                    this.data = this.formatMateriiDb(data);
                    localStorage.setItem("idSerie", this.serieSelectata);
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

        deleteMaterie(element, index) {
            if(confirm("Sigur doriti sa stergeti aceasta materie?"))            
            this.$http.post('/deleteMaterie', { idMaterie: element._id })
                .then(data => {
                    let dataIndex = element.an + "s" + element.sem;
                    this.data[dataIndex].data.splice(index, 1);
                    this.data[dataIndex].C -= element.C;
                    this.data[dataIndex].CR -= element.CR;
                    this.data[dataIndex].L -= element.L;
                    this.data[dataIndex].P -= element.P;
                    this.data[dataIndex].PR -= element.PR;
                    this.data[dataIndex].S -= element.S;
                }, err => {
                    console.log(err);
                });            
        }

        setAddMaterieMeta(an, sem) {            
            let dataIndex = an + "s" + sem;
            let maxOrd = this.maxOrd;
            this.data[dataIndex].data.forEach(function (element) {                
                if (parseFloat(element.ord) > parseFloat(maxOrd)) {
                    maxOrd = element.ord;                    
                }
            });
            this.maxOrd = maxOrd;            
            this.materieNoua.an = an;
            this.materieNoua.sem = sem;
        }

        adaugareMaterieNoua() {            
        this.$http.post('/addMaterie', { materie: this.materieNoua })
            .then(data => {                
                    this.materieNoua._id = data.data;
                    let dataIndex = this.materieNoua.an + "s" + this.materieNoua.sem;
                    this.data[dataIndex].data.push(this.materieNoua);
                    this.data[dataIndex].C += this.materieNoua.C;
                    this.data[dataIndex].CR += this.materieNoua.CR;
                    this.data[dataIndex].L += this.materieNoua.L;
                    this.data[dataIndex].P += this.materieNoua.P;
                    this.data[dataIndex].PR += this.materieNoua.PR;
                    this.data[dataIndex].S = this.materieNoua.S;
                }, err => {
                    console.log(err);
                });                        
        }

        checkMaxOrd() {
            if (parseFloat(this.materieNoua.ord) > parseFloat(this.maxOrd)) {
                alert("Ord trebuie sa fie mai mic!");
                this.materieNoua.ord = "";
            }
        }

    }



    angular.module(moduleName).controller('Edit', <any>Edit);
}