'use strict';

const koa = require('koa');
const serve  = require('koa-static');
const route = require('koa-router')();
const body = require('koa-body')();
const mongo = require('mongodb');
const routes = require('./serverScripts.js');
const fs = require('fs');
const html = fs.readFileSync('template.html', 'utf8');
const app = new koa();
const url = "mongodb://localhost:27017/fise_discipline";
const mongoose = require('mongoose');
mongoose.connect(url);

const dbMongoose = mongoose.connection;
dbMongoose.once("open", function () {
    mongoose.model('Serii', new mongoose.Schema({ _id: Number, specializare: String, an_start: Number, an_stop: Number }), "serii");
    mongoose.model('Utilizatori', new mongoose.Schema({ username: String, pass: String, nume: String, prenume: String, email: String }), "utilizatori");
    mongoose.model('Materii', new mongoose.Schema({ _id: Number, ord: String, disciplina: String, C: Number, S: Number, L: Number, P: Number, PR: Number, CR: Number, Evaluare: String, an: Number, sem: Number, id_serie: Number }), "materii");
    mongoose.model('Detalii_Materii', new mongoose.Schema({ _id: Number, id_materie: Number, responsabil: String, titular: String, regim: String, ore_curs: Number, ore_laborator: Number, total_ore_curs:Number, total_ore_laborator:Number, ore_studiu: Number, ore_documentatie: Number, ore_pregatire:Number, ore_tutoriat:Number, ore_examinari: Number, ore_activitati: Number}), "detalii_materii");
    global.serii = dbMongoose.model("Serii");
    global.utilizatori = dbMongoose.model("Utilizatori");
    global.materii = dbMongoose.model("Materii");
    global.detalii_materii = dbMongoose.model("Detalii_Materii");

    //Import date cti.ubm.ro
    /*
    let an_start = 2016;
    let an_stop = 2020;
    let last_an = 0;
    let id_serie = 0;
    let idMaterie = 1;
    
    
    let jsonImportData = '{"ord":"101","disciplina":"Analiză matematică I (Calcul diferențial)","an":1,"sem":1,"C":"2","S":"2","L":"","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"102","disciplina":"Algebră liniară, geometrie analitică și diferențială","an":1,"sem":1,"C":"2","S":"2","L":"","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"103","disciplina":"Proiectare logică","an":1,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"104","disciplina":"Programarea calculatoarelor și limbaje de programare I","an":1,"sem":1,"C":"2","S":"2","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"105","disciplina":"Fizica","an":1,"sem":1,"C":"2","S":"","L":"1","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"106","disciplina":"Comunicare","an":1,"sem":1,"C":"2","S":"","L":"","P":"","CR":"2","Evaluare":"C"}[[[]]]{"ord":"107","disciplina":"Limba engleză I","an":1,"sem":1,"C":"","S":"2","L":"","P":"","CR":"2","Evaluare":"C"}[[[]]]{"ord":"108","disciplina":"Educație fizică și sport I","an":1,"sem":1,"C":"","S":"2","L":"","P":"","CR":"2","Evaluare":"V"}[[[]]]{"ord":"201","disciplina":"Analiză matematică II (Calcul integral și ecuații diferențiale)","an":1,"sem":2,"C":"2","S":"2","L":"","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"202","disciplina":"Matematici speciale","an":1,"sem":2,"C":"2","S":"2","L":"","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"203","disciplina":"Programarea calculatoarelor și limbaje de programare II","an":1,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"204","disciplina":"Grafică asistată de calculator","an":1,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"C"}[[[]]]{"ord":"205","disciplina":"Electrotehnică","an":1,"sem":2,"C":"2","S":"","L":"1","P":"","CR":"3","Evaluare":"E"}[[[]]]{"ord":"206","disciplina":"Electronică digitală","an":1,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"207","disciplina":"Limba engleză II","an":1,"sem":2,"C":"","S":"2","L":"","P":"","CR":"2","Evaluare":"C"}[[[]]]{"ord":"208","disciplina":"Educație fizică și sport II","an":1,"sem":2,"C":"","S":"2","L":"","P":"","CR":"2","Evaluare":"V"}[[[]]]{"ord":"301","disciplina":"Matematici speciale în inginerie","an":2,"sem":1,"C":"2","S":"1","L":"","P":"","CR":"3","Evaluare":"C"}[[[]]]{"ord":"302","disciplina":"Metode numerice","an":2,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"303","disciplina":"Structuri de date","an":2,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"304","disciplina":"Dispozitive electronice și electronică analogică","an":2,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"C"}[[[]]]{"ord":"305","disciplina":"Programare Orientată pe Obiecte I (C++)","an":2,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"306","disciplina":"Structura și organizarea calculatoarelor","an":2,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"307","disciplina":"Elemente de grafică pe calculator","an":2,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"308","disciplina":"Limba engleză III (redactare documente tehnice)","an":2,"sem":1,"C":"2","S":"","L":"","P":"","CR":"2","Evaluare":"C"}[[[]]]{"ord":"401","disciplina":"Teoria sistemelor ","an":2,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"402","disciplina":"Baze de date","an":2,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"403","disciplina":"Proiectarea algoritmilor","an":2,"sem":2,"C":"2","S":"2","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"404","disciplina":"Sisteme de operare","an":2,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"405","disciplina":"Programare în limbaj de asamblare","an":2,"sem":2,"C":"2","S":"","L":"1","P":"","CR":"3","Evaluare":"C"}[[[]]]{"ord":"406","disciplina":"Programare Orientată pe obiecte II (Java)","an":2,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"407","disciplina":"Limba engleză IV (redactare documente tehnice)","an":2,"sem":2,"C":"2","S":"","L":"","P":"","CR":"2","Evaluare":"C"}[[[]]]{"ord":"408","disciplina":"Practica I (3 sapt, 90ore)","an":2,"sem":2,"C":"","S":"","L":"","P":"","CR":"4","Evaluare":"V"}[[[]]]{"ord":"501","disciplina":"Arhitectura sistemelor de calcul","an":3,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"5","Evaluare":"C"}[[[]]]{"ord":"502","disciplina":"Instrumentație virtuală","an":3,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"C"}[[[]]]{"ord":"503","disciplina":"Rețele de calculatoare","an":3,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"505","disciplina":"Ingineria programelor","an":3,"sem":1,"C":"2","S":"","L":"2","P":"1","CR":"5","Evaluare":"E"}[[[]]]{"ord":"506","disciplina":"Inteligență artificială","an":3,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"508","disciplina":"Economie","an":3,"sem":1,"C":"2","S":"","L":"","P":"","CR":"2","Evaluare":"C"}[[[]]]{"ord":"509","disciplina":"Sisteme de prelucrare grafică","an":3,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"601","disciplina":"Proiectare cu microprocesoare","an":3,"sem":2,"C":"2","S":"","L":"1","P":"1","CR":"4","Evaluare":"E"}[[[]]]{"ord":"602","disciplina":"Tehnologii Internet","an":3,"sem":2,"C":"2","S":"","L":"2","P":"1","CR":"5","Evaluare":"E"}[[[]]]{"ord":"603","disciplina":"Paradigme de programare","an":3,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"604","disciplina":"Tehnici de programare fundametale","an":3,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"605","disciplina":"Proiectare software","an":3,"sem":2,"C":"2","S":"","L":"2","P":"1","CR":"5","Evaluare":"E"}[[[]]]{"ord":"606","disciplina":"Sisteme inteligente","an":3,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"C"}[[[]]]{"ord":"607","disciplina":"Practica II (3sapt, 90ore)","an":3,"sem":2,"C":"","S":"","L":"","P":"","CR":"4","Evaluare":"V"}[[[]]]{"ord":"701","disciplina":"Managementul proiectelor","an":4,"sem":1,"C":"2","S":"","L":"","P":"1","CR":"3","Evaluare":"C"}[[[]]]{"ord":"702","disciplina":"Proiect protocoale și rețele de comunicații","an":4,"sem":1,"C":"","S":"","L":"","P":"2","CR":"3","Evaluare":"C"}[[[]]]{"ord":"703","disciplina":"Sisteme distribuite","an":4,"sem":1,"C":"2","S":"","L":"2","P":"2","CR":"6","Evaluare":"E"}[[[]]]{"ord":"704","disciplina":"Prelucrarea imaginilor","an":4,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"705","disciplina":"Aplicații mobile","an":4,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"706","disciplina":"Programare Web","an":4,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"707","disciplina":"E-marketing","an":4,"sem":1,"C":"2","S":"","L":"","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"801","disciplina":"Sisteme informatice","an":4,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"802","disciplina":"Sisteme integrate","an":4,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"C"}[[[]]]{"ord":"803","disciplina":"Proiectarea bazelor de date","an":4,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"C"}[[[]]]{"ord":"804","disciplina":"Securitatea rețelelor de calculatoare","an":4,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"805","disciplina":"Metodologia întocmirii proiectelor","an":4,"sem":2,"C":"2","S":"","L":"","P":"","CR":"3","Evaluare":"C"}[[[]]]{"ord":"806","disciplina":"Activitatea de cercetare-proiectare pentru elaborarea lucrării de diplomă","an":4,"sem":2,"C":"","S":"","L":"","P":"5","CR":"7","Evaluare":"V"}[[[]]]{"ord":"807","disciplina":"Practică pentru elaborarea lucrării de diplomă","an":4,"sem":2,"C":"","S":"","L":"","P":"","CR":"3","Evaluare":"V"}[[[]]]';
    serii.remove({}, function () { console.log("here");});
    materii.remove({}, function () { console.log("here"); });
    jsonImportData.split('[[[]]]').forEach(function (element) {
        if (element != "") {
            var jsonObject = JSON.parse(element);
            try {
                if (jsonObject.an != last_an) {
                    id_serie++;
                    serii.create({ _id: id_serie, specializare: 'cal', an_start: an_start, an_stop: an_stop });

                    an_start--;
                    an_stop--;
                    last_an = jsonObject.an;                                        
                }
                jsonObject._id = idMaterie;
                jsonObject.id_serie = id_serie;
                jsonObject.C = parseInt(jsonObject.C) || 0;
                jsonObject.CR = parseInt(jsonObject.CR) || 0;
                jsonObject.L = parseInt(jsonObject.L) || 0;
                jsonObject.P = parseInt(jsonObject.p) || 0;
                jsonObject.PR = parseInt(jsonObject.PR) || 0;
                jsonObject.S = parseInt(jsonObject.S) || 0;
                jsonObject.PR = 0;
                materii.create(jsonObject);
                idMaterie++;
                console.log(jsonObject);
            } catch (ex) {
                console.log(ex);
            }
        }
    });*/
});

route.get('/home', routes.home);
route.get('/getLastSerie', routes.getLastSerie);
route.get('/getLastSerieMaterii', routes.getLastSerieMaterii);
route.get('/getSerii', routes.getSerii);
route.get('/getMateriiSerieId', routes.getMateriiSerieId);
route.get('/getDetaliiMaterie', routes.getDetaliiMaterie);
route.post('/login', body, routes.login);
route.post('/register', body, routes.register);
route.post('/newSeries', body, routes.newSeries);
route.post('/editMaterie', body, routes.editMaterie);
route.post('/fisaDisciplina', body, routes.listareFisaDisciplina);



app.use(serve('../client'));
app.use(route.routes());
app.use(route.allowedMethods());

const port = process.env.port || 10001;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
