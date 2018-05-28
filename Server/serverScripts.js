'use strict';

const jwt = require('jsonwebtoken');

module.exports = {
    login: login,
    register: register,
    home: home,
    //verifyToken: verifyToken,
    newSeries: newSeries,
    getLastSerie,
    getLastSerieMaterii,
    getSerii,
    getMateriiSerieId,
    getDetaliiMaterie,
    editMaterie,    
    listareFisaDisciplina,
    listarePlanInvatamant,
    deleteMaterie,
    addMaterie,
    getMateriiAnCurent
}

const fs = require('fs');
const pdf = require('html-pdf');
const http = require('http');

function compare(a, b) {
    if (parseFloat(a.ord) < parseFloat(b.ord))
        return -1;
    if (parseFloat(a.ord) > parseFloat(b.ord))
        return 1;
    return 0;
}

async function home() { }

async function getLastSerieMaterii(ctx) {
    let data = {};
    data.serie = await serii.findOne({}).sort({ an_start: 'desc' });    
    data.materii = await materii.find({ id_serie: data.serie._id });
    data.materii.sort(compare);
    ctx.body = data;
}

async function getLastSerie(ctx) {
    ctx.body = await serii.find({}).sort({ an_start: 'desc' }).limit(1);
}

async function getMateriiSerieId(ctx) {
    let data = {};
    data.materii = await materii.find({ id_serie: ctx.query.id_serie });
    data.materii.sort(compare);
    ctx.body = data;
}

async function getSerii(ctx) {
    ctx.body = await serii.find({}).sort({an_start : 'desc'});
}

async function getDetaliiMaterie(ctx) {    
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
            cat: detalii.cat,
            tip: detalii.tip,
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

async function deleteMaterie(ctx) {
    let idMaterie = ctx.request.body.idMaterie;    
    await materii.remove({ "_id": idMaterie });
    
    await generateOrd(ctx.request.body.idSerie, idMaterie, ctx.request.body.ord, false);
    ctx.body = "Item deleted!";
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

async function addMaterie(ctx) {
    let materie = ctx.request.body.materie;
    let id_materie = await saveMaterie(materie);    
    let duplicate = await materii.findOne({ ord: materie.ord });
    let resp = {};
    
    if (duplicate) {
        await generateOrd(materie.id_serie, id_materie, materie.ord, true);
        resp.reorder = true;
    }
    else
        resp.reorder = false;
    resp.id_materie = id_materie;
    
    ctx.body = resp;
}

async function generateOrd(id_serie,id_materie, ord, add = true) {
    let materiiUpd = await materii.find({ id_serie: id_serie });
    let newOrd = 0;
    
    for (let element of materiiUpd) {
        if (element._id != id_materie && parseFloat(element.ord) >= parseFloat(ord)) {
            if(add == true)
                newOrd = parseFloat(element.ord) + 1;
            else
                newOrd = parseFloat(element.ord) -  1;
            var query = { _id: element._id },
                update = {
                    ord: newOrd + ".00"
                },
                options = { upsert: true, new: false, setDefaultsOnInsert: true };

            await materii.findOneAndUpdate(query, update, options, function (error, result) {
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
        }
    }
}

async function listareFisaDisciplina(ctx) {
    let materie = await materii.findOne({ _id: ctx.request.body.id_materie });
    let detalii_materie = await detalii_materii.findOne({ id_materie: ctx.request.body.id_materie });
    let pdfContent = fs.readFileSync('template_materie.html');
    let options = { format: 'Letter', "orientation": "portrait" };
    let total_studiu_ind = detalii_materie.ore_studiu + detalii_materie.ore_documentatie + detalii_materie.ore_pregatire + detalii_materie.ore_tutoriat + detalii_materie.ore_examinari + detalii_materie.ore_activitati;
    pdfContent = pdfContent.toString();
    pdfContent = pdfContent
        .replace('@ord', materie.ord)
        .replace('@denumire', materie.disciplina)
        .replace('@responsabil', detalii_materie.responsabil)
        .replace('@titular', detalii_materie.titular)
        .replace('@an', materie.an)
        .replace('@sem', materie.sem)
        .replace('@evaluare', materie.Evaluare)
        .replace('@regim', detalii_materie.cat + '\\' + detalii_materie.tip)
        .replace('@totalOreSapt', detalii_materie.ore_curs + detalii_materie.ore_laborator)
        .replace('@oreCurs', detalii_materie.ore_curs)
        .replace('@oreLaborator', detalii_materie.ore_laborator)
        .replace('@totalOrePlan', detalii_materie.total_ore_curs + detalii_materie.total_ore_laborator)
        .replace('@totalOreCurs', detalii_materie.total_ore_curs)
        .replace('@totalOreLaborator', detalii_materie.total_ore_laborator)
        .replace('@oreStudiu', detalii_materie.ore_studiu)
        .replace('@oreDocumentatie', detalii_materie.ore_documentatie)
        .replace('@orePregatire', detalii_materie.ore_pregatire)
        .replace('@oreTutoriat', detalii_materie.ore_tutoriat)
        .replace('@oreExaminari', detalii_materie.ore_examinari)
        .replace('@oreActivitati', detalii_materie.ore_activitati)
        .replace('@totalOreStudiu', total_studiu_ind)
        .replace('@totalOreSemestru', total_studiu_ind + detalii_materie.total_ore_curs + detalii_materie.total_ore_laborator)
        .replace('@nrCredite', materie.CR);

    await pdf.create(pdfContent, options).toFile('./fisaDisciplina.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }

    });
    ctx.body = pdfContent;
   // ctx.body = fs.createReadStream('./fisaDisciplina.pdf');
  //  ctx.set('Content-disposition', 'attachment; filename=' + 'fisaDisciplina');
    //ctx.set('Content-type', 'application/pdf');
}

async function listarePlanInvatamant(ctx) {
    let id_serie = ctx.request.body.id_serie;    
    let serie = await serii.findOne({ _id: id_serie });
    let materiiSerie = await materii.find({ _id: id_serie });

    console.log(id_serie);

    let materiiDB = await materii.aggregate([
        {
            $lookup:
                {
                    from: "detalii_materii",
                    localField: "_id",
                    foreignField: "id_materie",
                    as: "detalii"
                }
        }
    ]);
    let detaliiMaterii = [];
    materiiDB.forEach(function (element) {        
        if (element.id_serie == id_serie) {            
            detaliiMaterii.push(element);
        }
    });


    detaliiMaterii.sort(function (a, b) {
        if (a.ord < b.ord)
            return -1;
        if (a.ord > b.ord)
            return 1;
        return 0;
    });

    let anCurent = 0;
    let semCurent = 0;
    let pdfContent = fs.readFileSync('template_plan.html');
    let options = { format: 'Letter', "orientation": "portrait" };
    let tableTop = "";
    let tableBottom = "";
    let tableRow = "";
    let tables = "";
    let evaluare_1 = "", evaluare_2 = "", evaluare_3 = "";
    let total_ore_ind = 0, total_ore_sem = 0;

    let c_1 = 0, c_2 = 0, s_1 = 0, s_2 = 0, l_1 = 0, l_2 = 0, p_1 = 0, p_2 = 0, pr_1 = 0, pr_2 = 0, total_an = 0, total_an_c = 0, total_an_apl = 0, total_an_ind = 0, total_cr_1 = 0, total_cr_2 = 0, total_ore_an_1 = 0, total_ore_an_2 = 0;

    pdfContent = pdfContent.toString();   

    detaliiMaterii.forEach(function (materie) {
        if (materie.an != anCurent) {
            if (anCurent != 0) {
                total_ore_an_1 = c_1 + s_1 + l_1 + p_1 + pr_1;
                total_ore_an_2 = c_2 + s_2 + l_2 + p_2 + pr_2;
                tableBottom = fs.readFileSync('table_bottom.html').toString();
                tableBottom = tableBottom
                    .replace('@c_1', c_1)
                    .replace('@s_1', s_1)
                    .replace('@l_1', l_1)
                    .replace('@p_1', p_1)
                    .replace('@pr_1', pr_1)
                    .replace('@c_2', c_2)
                    .replace('@s_2', s_2)
                    .replace('@l_2', l_2)
                    .replace('@p_2', p_2)
                    .replace('@pr_2', pr_2)
                    .replace('@total_an', total_an)
                    .replace('@total_an_c', total_an_c)
                    .replace('@total_an_apl', total_an_apl)
                    .replace('@total_an_ind', total_an_ind)
                    .replace('@total_cr_1', total_cr_1)
                    .replace('@total_cr_2', total_cr_2)
                    .replace('@total_ore_an_1', total_ore_an_1)
                    .replace('@total_ore_an_2', total_ore_an_2);
                tables = tables + tableBottom;
                c_1 = 0; c_2 = 0; s_1 = 0; s_2 = 0; l_1 = 0; l_2 = 0; p_1 = 0; p_2 = 0; pr_1 = 0; pr_2 = 0; total_an = 0; total_an_c = 0; total_an_apl = 0; total_an_ind = 0; total_cr_1 = 0; total_cr_2 = 0; total_ore_an_1 = 0; total_ore_an_2 = 0;
            }
            anCurent = materie.an;
            //semCurent = element.sem;
            
            tableTop = fs.readFileSync('table_top.html').toString();
            tableTop = tableTop
                .replace('@an', anCurent)
                .replace('@a_universitar', serie.an_start + " - " + serie.an_stop);
            
            tables = tables + tableTop;// + tableBottom;
        }

        let detaliiMaterieCurenta = materie.detalii[0];
        total_ore_ind = 0;
        total_ore_sem = 0;

        if (detaliiMaterieCurenta) {
            total_ore_ind = detaliiMaterieCurenta.ore_studiu + detaliiMaterieCurenta.ore_documentatie + detaliiMaterieCurenta.ore_pregatire + detaliiMaterieCurenta.ore_tutoriat + detaliiMaterieCurenta.ore_examinari + detaliiMaterieCurenta.ore_activitati;
            total_ore_sem = total_ore_ind + detaliiMaterieCurenta.total_ore_curs + detaliiMaterieCurenta.total_ore_laborator;
        }

        if (materie.sem == 1) {
            tableRow = fs.readFileSync('table_mid_left.html').toString();
            c_1 += materie.C;
            s_1 += materie.S;
            l_1 += materie.L;
            p_1 += materie.P;
            pr_1 += materie.PR;
            total_cr_1 += materie.CR;
        }
        else {
            tableRow = fs.readFileSync('table_mid_right.html').toString();
            c_2 += materie.C;
            s_2 += materie.S;
            l_2 += materie.L;
            p_2 += materie.P;
            pr_2 += materie.PR;
            total_cr_2 += materie.CR;
        }

        evaluare_1 = materie.Evaluare == "E" ? "E" : "";
        evaluare_2 = materie.Evaluare == "C" ? "C" : "";
        evaluare_3 = materie.Evaluare == "V" ? "V" : "";

        tableRow = tableRow
            .replace('@denumire', materie.disciplina)
            .replace('@C', materie.C)
            .replace('@S', materie.S)
            .replace('@L', materie.L)
            .replace('@P', materie.P)
            .replace('@PR', materie.PR)
            .replace('@evaluare_1', evaluare_1)
            .replace('@evaluare_2', evaluare_2)
            .replace('@evaluare_3', evaluare_3)
            .replace('@ore_total', total_ore_sem)
            .replace('@ore_curs', (detaliiMaterieCurenta && detaliiMaterieCurenta.total_ore_curs ? detaliiMaterieCurenta.total_ore_curs : 0))
            .replace('@ore_apl', (detaliiMaterieCurenta && detaliiMaterieCurenta.total_ore_laborator ? detaliiMaterieCurenta.total_ore_laborator : 0))
            .replace('@cat', (detaliiMaterieCurenta && detaliiMaterieCurenta.cat ? detaliiMaterieCurenta.cat : ""))
            .replace('@tip', (detaliiMaterieCurenta && detaliiMaterieCurenta.tip ? detaliiMaterieCurenta.tip : ""))
            .replace('@ore_ind', total_ore_ind)
            .replace('@CR', materie.CR);

        
        total_an += total_ore_sem;
        total_an_c += (detaliiMaterieCurenta && detaliiMaterieCurenta.total_ore_curs ? detaliiMaterieCurenta.total_ore_curs : 0);
        total_an_apl += (detaliiMaterieCurenta && detaliiMaterieCurenta.total_ore_laborator ? detaliiMaterieCurenta.total_ore_laborator : 0);
        total_an_ind += total_ore_ind;
        tables = tables + tableRow;
    });
    total_ore_an_1 = c_1 + s_1 + l_1 + p_1 + pr_1;
    total_ore_an_2 = c_2 + s_2 + l_2 + p_2 + pr_2;
    tableBottom = fs.readFileSync('table_bottom.html').toString();
    tableBottom = tableBottom
        .replace('@c_1', c_1)
        .replace('@s_1', s_1)
        .replace('@l_1', l_1)
        .replace('@p_1', p_1)
        .replace('@pr_1', pr_1)
        .replace('@c_2', c_2)
        .replace('@s_2', s_2)
        .replace('@l_2', l_2)
        .replace('@p_2', p_2)
        .replace('@pr_2', pr_2)
        .replace('@total_an', total_an)
        .replace('@total_an_c', total_an_c)
        .replace('@total_an_apl', total_an_apl)
        .replace('@total_an_ind', total_an_ind)
        .replace('@total_cr_1', total_cr_1)
        .replace('@total_cr_2', total_cr_2)
        .replace('@total_ore_an_1', total_ore_an_1)
        .replace('@total_ore_an_2', total_ore_an_2);
        
    tables = tables + tableBottom;    
    
    pdfContent = pdfContent
        .replace('@content', tables);
                
    await pdf.create(pdfContent, options).toFile('./planInvatamant.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }

    });

    /*
    let detaliiMaterii = await materii.aggregate([
        {
            $lookup:
                {
                    from: "detalii_materii",
                    let: { id_serie: "$id_serie", id: "$_id" },
                    pipeline: [
                        {
                            $match:
                                {
                                    $expr:
                                        {
                                            $and:
                                                [
                                                    { $eq: [5, "$$id_serie"] },
                                                    { $eq: ["$id_materie", "$$id"] }
                                                ]
                                        }
                                }
                        }
                    ],
                    as: "detalii"
                }
        }
    ])*/    
    ctx.body = "Success!";
}

async function getMateriiAnCurent(ctx) {    
    let year = (new Date()).getFullYear();
    let firstSerie = await serii.findOne({ "an_start": { $lte: year } }).sort({an_start : 'desc'});
    let secondSerie = await serii.findOne({ "an_start": { $lt: firstSerie.an_start } }).sort({ an_start: 'desc' });
    let thirdSerie = await serii.findOne({ "an_start": { $lt: secondSerie.an_start } }).sort({ an_start: 'desc' });
    let fourthSerie = await serii.findOne({ "an_start": { $lt: thirdSerie.an_start } }).sort({ an_start: 'desc' });
    let result = {};
    let materiiFirst = await materii.find({ id_serie: firstSerie._id });
    let materiiSecond = await materii.find({ id_serie: secondSerie._id });
    let materiiThird = await materii.find({ id_serie: thirdSerie._id });
    let materiiFourth = await materii.find({ id_serie: fourthSerie._id }); 

    materiiFirst.map((obj) => {
        obj.serieNr = firstSerie.an_start + " - " + firstSerie.an_stop;
        return obj;
    })

    materiiSecond.map((obj) => {
        obj.serieNr = secondSerie.an_start + " - " + secondSerie.an_stop;
        return obj;
    })

    materiiThird.map((obj) => {
        obj.serieNr = thirdSerie.an_start + " - " + thirdSerie.an_stop;
        return obj;
    })

    materiiFourth.map((obj) => {
        obj.serieNr = fourthSerie.an_start + " - " + fourthSerie.an_stop;
        return obj;
    })

    result.materii = materiiFirst;    
    result.materii = result.materii.concat(materiiSecond);
    result.materii = result.materii.concat(materiiThird);
    result.materii = result.materii.concat(materiiFourth);

    result.firstSerie = firstSerie.an_start + " - " + firstSerie.an_stop;
    result.secondSerie = secondSerie.an_start + " - " + secondSerie.an_stop;
    result.thirdSerie = thirdSerie.an_start + " - " + thirdSerie.an_stop;
    result.fourthSerie = fourthSerie.an_start + " - " + fourthSerie.an_stop;
    result.materii.sort(compare);
    ctx.body = result;
}