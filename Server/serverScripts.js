'use strict';

const jwt = require('jsonwebtoken');

module.exports = {
    login: login,
    register: register,
    home: home,
    verifyToken: verifyToken,
    newSeries: newSeries,
    getLastSerie,
    getLastSerieMaterii,
    getSerii,
    getMateriiSerieId,
    getDetaliiMaterie,
    editMaterie,    
}

async function home() { }

async function getLastSerieMaterii(ctx) {
    let data = {};
    data.serie = await serii.findOne({}).sort({ an_start: 'desc' });    
    data.materii = await materii.find({ id_serie: data.serie._id });
    ctx.body = data;
}

async function getLastSerie(ctx) {
    ctx.body = await serii.find({}).sort({ an_start: 'desc' }).limit(1);
}

async function getMateriiSerieId(ctx) {
    let data = {};
    data.materii = await materii.find({ id_serie: ctx.query.id_serie });
    ctx.body = data;
}

async function getSerii(ctx) {
    ctx.body = await serii.find({}).sort({an_start : 'desc'});
}

async function getDetaliiMaterie(ctx) {
    console.log(ctx.query.id_materie);
    let data = {};
    data.materie = await materii.findOne({_id : ctx.query.id_materie});
    data.detalii_materie = await detalii_materii.findOne({id_materie: ctx.query.id_materie});
    ctx.body = data;
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

async function newSeries(ctx) {
    console.log(ctx.request.body);
    ctx.body = 'Done!';
}

async function editMaterie(ctx) {    
    let id_materie = await saveMaterie(ctx.request.body.materie);
    let detalii_materie = ctx.request.body.detalii_materie;
    detalii_materie.id_materie = id_materie;
    let id_detaliu = await saveDetaliidetalii(detalii_materie);
    ctx.body = "Success!";
}

async function saveMaterie(materie) {
    if (!materie._id) {
        let nextMaterieId = await getNextIdMaterii();
        materie._id = nextMaterieId;
    }

    var query = { _id : materie._id},
        update = {           
            _id: materie._id,
            ord: materie.ord,
            disciplina: materie.disciplina,
            an: materie.an,
            sem: materie.sem,
            C: materie.C,
            S: materie.S,
            L: materie.L,
            P: materie.P,
            CR: materie.CR,
            Evaluare: materie.Evaluare,
            id_serie: materie.id_serie,
            PR: materie.PR            
        },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };
    
    materii.findOneAndUpdate(query, update, options, function (error, result) {
        if (!error) {            
            result.save(function (error) {
                if (!error) {
                    console.log("Item Saved!");                    
                } else {
                    throw error;
                }
            });
        }
    });    
    return materie._id;
}

async function saveDetaliidetalii(detalii) {
    if (!detalii._id) {
        let nextdetaliiId = await getNextIdDetaliiMaterie();
        detalii._id = nextdetaliiId;
    }

    var query = { $or: [{ _id: detalii._id }, { id_materie: detalii.id_materie }] },
        update = {
            _id: detalii._id,
            id_materie: detalii.id_materie,
            responsabil: detalii.responsabil,
            titular: detalii.titular,
            regim: detalii.regim,
            ore_curs: detalii.ore_curs,
            ore_laborator: detalii.ore_laborator,
            total_ore_curs: detalii.total_ore_curs,
            total_ore_laborator: detalii.total_ore_laborator,
            ore_studiu: detalii.ore_studiu,
            ore_documentatie: detalii.ore_documentatie,
            ore_pregatire: detalii.ore_pregatire,
            ore_tutoriat: detalii.ore_tutoriat,
            ore_examinari: detalii.ore_examinari,
            ore_activitati: detalii.ore_activitati
        },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };

    detalii_materii.findOneAndUpdate(query, update, options, function (error, result) {
        if (!error) {
            result.save(function (error) {
                if (!error) {
                    console.log("Item Saved!");
                    return detalii._id;
                } else {
                    throw error;
                }
            });
        }
    });    
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

    let sr = await serii.find({});

    sr.forEach(function (serie) {
        data[serie._id] = serie.an_start + " - " + serie.an_stop;
    });

    return sr;
}

async function getMateriiDb(ctx) {
    let data = [];
    let seriiData = await getSeriiArray();
    
    let mt = await materii.find({}).sort({ 'id_serie': 1,'an': 1,'sem':1 ,'ord':1});    

    return mt;
}

async function getNextIdDetaliiMaterie() {
    let lastDetaliu = await detalii_materii.findOne({}).sort({ _id: 'desc' });
    let nextId = lastDetaliu ? lastDetaliu._id + 1 : 1;
    return nextId;
}

async function getNextIdMaterii() {
    let lastMaterie = await materii.findOne({}).sort({ _id: 'desc' });
    return lastMaterie._id+1;
}