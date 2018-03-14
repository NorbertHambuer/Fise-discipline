'use strict';

const koa = require('koa');
const serve  = require('koa-static');
const route = require('koa-router')();
const body = require('koa-body')();
const jwt = require('jsonwebtoken');
const mongo = require('mongodb');
const requests = require('./serverScripts.js');
let dbo;
const app = new koa();

var url = "mongodb://localhost:27017/";

mongo.connect(url, function (err, db) {
    if (err) {
        console.log(err);
        throw err;
    }
    
    dbo = db.db("fise_discipline");
    
    dbo.listCollections().toArray(function (err, collInfos) {
        console.log(collInfos);
    });
});

route.get('/home', verifyToken, requests.home);
route.post('/login', body, requests.login);
route.post('/register', body, requests.register);

app.use(serve('../client'));
app.use(route.routes());
app.use(route.allowedMethods());


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
       ctx.status = 403;
    }
}

const port = process.env.port || 10001;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
