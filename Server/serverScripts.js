'use strict';

const jwt = require('jsonwebtoken');

module.exports = {
    login: login,
    register: register,
    home: home,
    verifyToken: verifyToken,
    newSeries: newSeries
}

async function login(ctx) {
    getMateriiDb("1");
    const user = {
        username: ctx.request.body.username,
        password: ctx.request.body.password
    }
    let found = false;
    utilizatori.find({ $and: [{ 'username': user.username }, { 'pass': user.password }] }, function (err, result) {
        if (err)
            throw err;
        if (result.length != 0) {
            found = true;
        }

    }).then(function () {
        console.log("here");
    });
    let promise = new Promise((res, rej) => {
        jwt.sign({ user }, 'secretkey', { expiresIn: '1d' }, (err, token) => {
            if (err) {
                rej(err);
            }
            console.log(token);

            res({ token: token });
        });
    });

    ctx.body = await promise;
}

async function register(ctx) {
    let success = false;
    const newUser = {
        fName: ctx.request.body.fName,
        lName: ctx.request.body.lName,
        username: ctx.request.body.username,
        password: ctx.request.body.password,
        email: ctx.request.body.email
    }


    let query = {
        email: newUser.email,
        username: newUser.username
    }

    utilizatori.find(query, function (err, result) {
        if (err)
            throw err;


        if (!result.length) {
            utilizatori.create({ username: newUser.username, pass: newUser.password, nume: newUser.fName, prenume: newUser.lName, email: newUser.email });
            success = true;
        }

    });

    ctx.body = success;
}
async function home(ctx) {
    let data = {
        a1s1: {
            data: [],
            C: 0,
            S: 0,
            L: 0,
            P: 0,
            CR: 0
        },
        a1s2: {
            data: [],
            C: 0,
            S: 0,
            L: 0,
            P: 0,
            CR: 0
        },
        a2s1: {
            data: [],
            C: 0,
            S: 0,
            L: 0,
            P: 0,
            CR: 0
        },
        a2s2: {
            data: [],
            C: 0,
            S: 0,
            L: 0,
            P: 0,
            CR: 0
        },
        a3s1: {
            data: [],
            C: 0,
            S: 0,
            L: 0,
            P: 0,
            CR: 0
        },
        a3s2: {
            data: [],
            C: 0,
            S: 0,
            L: 0,
            P: 0,
            CR: 0
        },
        a4s1: {
            data: [],
            C: 0,
            S: 0,
            L: 0,
            P: 0,
            CR: 0
        },
        a4s2: {
            data: [],
            C: 0,
            S: 0,
            L: 0,
            P: 0,
            CR: 0
        }
    }

    let a1s1C = 0;
    let jsonImportData = '{"ord":"101","disciplina":"Analiza matematica I (Calcul diferential)","an":1,"sem":1,"C":"2","S":"2","L":"","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"102","disciplina":"Algebra liniara, geometrie analitica si diferentiala","an":1,"sem":1,"C":"2","S":"2","L":"","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"103","disciplina":"Proiectare logica","an":1,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"104","disciplina":"Programarea calculatoarelor si limbaje de programare I","an":1,"sem":1,"C":"2","S":"2","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"105","disciplina":"Fizica","an":1,"sem":1,"C":"2","S":"","L":"1","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"106","disciplina":"Comunicare","an":1,"sem":1,"C":"2","S":"","L":"","P":"","CR":"2","Evaluare":"C"}[[[]]]{"ord":"107","disciplina":"Limba engleza I","an":1,"sem":1,"C":"","S":"2","L":"","P":"","CR":"2","Evaluare":"C"}[[[]]]{"ord":"108","disciplina":"Educatie fizica si sport I","an":1,"sem":1,"C":"","S":"2","L":"","P":"","CR":"2","Evaluare":"V"}[[[]]]{"ord":"201","disciplina":"Analiza matematica II (Calcul integral si ecuatii diferentiale)","an":1,"sem":2,"C":"2","S":"2","L":"","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"202","disciplina":"Matematici speciale","an":1,"sem":2,"C":"2","S":"2","L":"","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"203","disciplina":"Programarea calculatoarelor si limbaje de programare II","an":1,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"204","disciplina":"Grafica asistata de calculator","an":1,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"C"}[[[]]]{"ord":"205","disciplina":"Electrotehnica","an":1,"sem":2,"C":"2","S":"","L":"1","P":"","CR":"3","Evaluare":"E"}[[[]]]{"ord":"206","disciplina":"Electronica digitala","an":1,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"207","disciplina":"Limba engleza II","an":1,"sem":2,"C":"","S":"2","L":"","P":"","CR":"2","Evaluare":"C"}[[[]]]{"ord":"208","disciplina":"Educatie fizica si sport II","an":1,"sem":2,"C":"","S":"2","L":"","P":"","CR":"2","Evaluare":"V"}[[[]]]{"ord":"301","disciplina":"Matematici speciale in inginerie","an":2,"sem":1,"C":"2","S":"1","L":"","P":"","CR":"3","Evaluare":"C"}[[[]]]{"ord":"302","disciplina":"Metode numerice","an":2,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"303","disciplina":"Structuri de date","an":2,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"304","disciplina":"Dispozitive electronice si electronica analogica","an":2,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"C"}[[[]]]{"ord":"305","disciplina":"Programare Orientata pe Obiecte I (C++)","an":2,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"306","disciplina":"Structura si organizarea calculatoarelor","an":2,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"307","disciplina":"Elemente de grafica pe calculator","an":2,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"308","disciplina":"Limba engleza III (redactare documente tehnice)","an":2,"sem":1,"C":"2","S":"","L":"","P":"","CR":"2","Evaluare":"C"}[[[]]]{"ord":"401","disciplina":"Teoria sistemelor ","an":2,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"402","disciplina":"Baze de date","an":2,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"403","disciplina":"Proiectarea algoritmilor","an":2,"sem":2,"C":"2","S":"2","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"404","disciplina":"Sisteme de operare","an":2,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"405","disciplina":"Programare in limbaj de asamblare","an":2,"sem":2,"C":"2","S":"","L":"1","P":"","CR":"3","Evaluare":"C"}[[[]]]{"ord":"406","disciplina":"Programare Orientata pe obiecte II (Java)","an":2,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"407","disciplina":"Limba engleza IV (redactare documente tehnice)","an":2,"sem":2,"C":"2","S":"","L":"","P":"","CR":"2","Evaluare":"C"}[[[]]]{"ord":"408","disciplina":"Practica I (3 sapt, 90ore)","an":2,"sem":2,"C":"","S":"","L":"","P":"","CR":"4","Evaluare":"V"}[[[]]]{"ord":"501","disciplina":"Arhitectura sistemelor de calcul","an":3,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"5","Evaluare":"C"}[[[]]]{"ord":"502","disciplina":"Instrumentatie virtuala","an":3,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"C"}[[[]]]{"ord":"503","disciplina":"Retele de calculatoare","an":3,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"505","disciplina":"Ingineria programelor","an":3,"sem":1,"C":"2","S":"","L":"2","P":"1","CR":"5","Evaluare":"E"}[[[]]]{"ord":"506","disciplina":"Inteligenta artificiala","an":3,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"508","disciplina":"Economie","an":3,"sem":1,"C":"2","S":"","L":"","P":"","CR":"2","Evaluare":"C"}[[[]]]{"ord":"509","disciplina":"Sisteme de prelucrare grafica","an":3,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"601","disciplina":"Proiectare cu microprocesoare","an":3,"sem":2,"C":"2","S":"","L":"1","P":"1","CR":"4","Evaluare":"E"}[[[]]]{"ord":"602","disciplina":"Tehnologii Internet","an":3,"sem":2,"C":"2","S":"","L":"2","P":"1","CR":"5","Evaluare":"E"}[[[]]]{"ord":"603","disciplina":"Paradigme de programare","an":3,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"604","disciplina":"Tehnici de programare fundametale","an":3,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"605","disciplina":"Proiectare software","an":3,"sem":2,"C":"2","S":"","L":"2","P":"1","CR":"5","Evaluare":"E"}[[[]]]{"ord":"606","disciplina":"Sisteme inteligente","an":3,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"C"}[[[]]]{"ord":"607","disciplina":"Practica II (3sapt, 90ore)","an":3,"sem":2,"C":"","S":"","L":"","P":"","CR":"4","Evaluare":"V"}[[[]]]{"ord":"701","disciplina":"Managementul proiectelor","an":4,"sem":1,"C":"2","S":"","L":"","P":"1","CR":"3","Evaluare":"C"}[[[]]]{"ord":"702","disciplina":"Proiect protocoale si retele de comunicatii","an":4,"sem":1,"C":"","S":"","L":"","P":"2","CR":"3","Evaluare":"C"}[[[]]]{"ord":"703","disciplina":"Sisteme distribuite","an":4,"sem":1,"C":"2","S":"","L":"2","P":"2","CR":"6","Evaluare":"E"}[[[]]]{"ord":"704","disciplina":"Prelucrarea imaginilor","an":4,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"705","disciplina":"Aplicatii mobile","an":4,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"706","disciplina":"Programare Web","an":4,"sem":1,"C":"2","S":"","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"707","disciplina":"E-marketing","an":4,"sem":1,"C":"2","S":"","L":"","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"801","disciplina":"Sisteme informatice","an":4,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"5","Evaluare":"E"}[[[]]]{"ord":"802","disciplina":"Sisteme integrate","an":4,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"C"}[[[]]]{"ord":"803","disciplina":"Proiectarea bazelor de date","an":4,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"C"}[[[]]]{"ord":"804","disciplina":"Securitatea retelelor de calculatoare","an":4,"sem":2,"C":"2","S":"","L":"2","P":"","CR":"4","Evaluare":"E"}[[[]]]{"ord":"805","disciplina":"Metodologia intocmirii proiectelor","an":4,"sem":2,"C":"2","S":"","L":"","P":"","CR":"3","Evaluare":"C"}[[[]]]{"ord":"806","disciplina":"Activitatea de cercetare-proiectare pentru elaborarea lucrarii de diploma","an":4,"sem":2,"C":"","S":"","L":"","P":"5","CR":"7","Evaluare":"V"}[[[]]]{"ord":"807","disciplina":"Practica pentru elaborarea lucrarii de diploma","an":4,"sem":2,"C":"","S":"","L":"","P":"","CR":"3","Evaluare":"V"}[[[]]]';
    jsonImportData.split('[[[]]]').forEach(element => {
        if (element != "") {
            if (parseInt(JSON.parse(element).ord) < 200) {
                data.a1s1.data.push(JSON.parse(element));
                if (JSON.parse(element).C !== '') {
                    data.a1s1.C += parseInt(JSON.parse(element).C);
                }
                if (JSON.parse(element).S !== '') {
                    data.a1s1.S += parseInt(JSON.parse(element).S);
                }
                if (JSON.parse(element).L !== '') {
                    data.a1s1.L += parseInt(JSON.parse(element).L);
                }
                if (JSON.parse(element).P !== '') {
                    data.a1s1.P += parseInt(JSON.parse(element).P);
                }
                if (JSON.parse(element).CR !== '') {
                    data.a1s1.CR += parseInt(JSON.parse(element).CR);
                }
            } else if (parseInt(JSON.parse(element).ord) < 300) {
                data.a1s2.data.push(JSON.parse(element));
                if (JSON.parse(element).C !== '') {
                    data.a1s2.C += parseInt(JSON.parse(element).C);
                }
                if (JSON.parse(element).S !== '') {
                    data.a1s2.S += parseInt(JSON.parse(element).S);
                }
                if (JSON.parse(element).L !== '') {
                    data.a1s2.L += parseInt(JSON.parse(element).L);
                }
                if (JSON.parse(element).P !== '') {
                    data.a1s2.P += parseInt(JSON.parse(element).P);
                }
                if (JSON.parse(element).CR !== '') {
                    data.a1s2.CR += parseInt(JSON.parse(element).CR);
                }
            } else if (parseInt(JSON.parse(element).ord) < 400) {
                data.a2s1.data.push(JSON.parse(element));
                if (JSON.parse(element).C !== '') {
                    data.a2s1.C += parseInt(JSON.parse(element).C);
                }
                if (JSON.parse(element).S !== '') {
                    data.a2s1.S += parseInt(JSON.parse(element).S);
                }
                if (JSON.parse(element).L !== '') {
                    data.a2s1.L += parseInt(JSON.parse(element).L);
                }
                if (JSON.parse(element).P !== '') {
                    data.a2s1.P += parseInt(JSON.parse(element).P);
                }
                if (JSON.parse(element).CR !== '') {
                    data.a2s1.CR += parseInt(JSON.parse(element).CR);
                }
            } else if (parseInt(JSON.parse(element).ord) <500) {
                data.a2s2.data.push(JSON.parse(element));
                if (JSON.parse(element).C !== '') {
                    data.a2s2.C += parseInt(JSON.parse(element).C);
                }
                if (JSON.parse(element).S !== '') {
                    data.a2s2.S += parseInt(JSON.parse(element).S);
                }
                if (JSON.parse(element).L !== '') {
                    data.a2s2.L += parseInt(JSON.parse(element).L);
                }
                if (JSON.parse(element).P !== '') {
                    data.a2s2.P += parseInt(JSON.parse(element).P);
                }
                if (JSON.parse(element).CR !== '') {
                    data.a2s2.CR += parseInt(JSON.parse(element).CR);
                }
            } else if (parseInt(JSON.parse(element).ord) < 600) {
                data.a3s1.data.push(JSON.parse(element));
                if (JSON.parse(element).C !== '') {
                    data.a3s1.C += parseInt(JSON.parse(element).C);
                }
                if (JSON.parse(element).S !== '') {
                    data.a3s1.S += parseInt(JSON.parse(element).S);
                }
                if (JSON.parse(element).L !== '') {
                    data.a3s1.L += parseInt(JSON.parse(element).L);
                }
                if (JSON.parse(element).P !== '') {
                    data.a3s1.P += parseInt(JSON.parse(element).P);
                }
                if (JSON.parse(element).CR !== '') {
                    data.a3s1.CR += parseInt(JSON.parse(element).CR);
                }
            } else if (parseInt(JSON.parse(element).ord) < 700) {
                data.a3s2.data.push(JSON.parse(element));
                if (JSON.parse(element).C !== '') {
                    data.a3s2.C += parseInt(JSON.parse(element).C);
                }
                if (JSON.parse(element).S !== '') {
                    data.a3s2.S += parseInt(JSON.parse(element).S);
                }
                if (JSON.parse(element).L !== '') {
                    data.a3s2.L += parseInt(JSON.parse(element).L);
                }
                if (JSON.parse(element).P !== '') {
                    data.a3s2.P += parseInt(JSON.parse(element).P);
                }
                if (JSON.parse(element).CR !== '') {
                    data.a3s2.CR += parseInt(JSON.parse(element).CR);
                }
            } else if (parseInt(JSON.parse(element).ord) < 800) {
                data.a4s1.data.push(JSON.parse(element));
                if (JSON.parse(element).C !== '') {
                    data.a4s1.C += parseInt(JSON.parse(element).C);
                }
                if (JSON.parse(element).S !== '') {
                    data.a4s1.S += parseInt(JSON.parse(element).S);
                }
                if (JSON.parse(element).L !== '') {
                    data.a4s1.L += parseInt(JSON.parse(element).L);
                }
                if (JSON.parse(element).P !== '') {
                    data.a4s1.P += parseInt(JSON.parse(element).P);
                }
                if (JSON.parse(element).CR !== '') {
                    data.a4s1.CR += parseInt(JSON.parse(element).CR);
                }
            } else if (parseInt(JSON.parse(element).ord) < 900) {
                data.a4s2.data.push(JSON.parse(element));
                if (JSON.parse(element).C !== '') {
                    data.a4s2.C += parseInt(JSON.parse(element).C);
                }
                if (JSON.parse(element).S !== '') {
                    data.a4s2.S += parseInt(JSON.parse(element).S);
                }
                if (JSON.parse(element).L !== '') {
                    data.a4s2.L += parseInt(JSON.parse(element).L);
                }
                if (JSON.parse(element).P !== '') {
                    data.a4s2.P += parseInt(JSON.parse(element).P);
                }
                if (JSON.parse(element).CR !== '') {
                    data.a4s2.CR += parseInt(JSON.parse(element).CR);
                }
            }
        }
    });

    ctx.body = data;
}

async function newSeries(ctx) {
    console.log(ctx.request.body);
    ctx.body = 'Done!';
}

async function verifyToken(ctx, next) {
    console.log('intra');
    const bearerHeader = ctx.request.headers['authorization'];
    console.log(bearerHeader);
    if (bearerHeader) {
        ctx.request.token = bearerHeader.split(' ')[1];

        let p = new Promise((res, rej) => {
            jwt.verify(ctx.request.token, 'secretkey', (err, authData) => {
                if (err) {
                    rej(err);
                }
                res(authData);
            });
        });
        await p;

        next();
    } else {
        ctx.status = 401;
    }
}

async function getSeriiArray() {
    let data = [];

    serii.find({}, function (err, seriiData) {        
        seriiData.forEach(function (serie) {            
            data[serie._id] = serie.an_start + " - " + serie.an_stop;
        });        
        
    }).then(function () { return data; });

    
}

async function getMateriiDb(ctx) {
    let data = [];
    let seriiData = await getSeriiArray();

    
    materii.find({}).sort({ 'id_serie': 1,'an': 1,'sem':1 ,'ord':1}).exec( function (err, materiiData) {
        materiiData.forEach(function (materie) {            
           data.push(materie);
        });
       // ctx.body = data;        
    });    

}
