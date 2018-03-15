'use strict';

const koa = require('koa');
const serve  = require('koa-static');
const route = require('koa-router')();
const body = require('koa-body')();
const mongo = require('mongodb');
const routes = require('./serverScripts.js');
const app = new koa();
const url = "mongodb://localhost:27017/";

mongo.connect(url, function (err, db) {
    if (err) {
        console.log(err);
        throw err;
    }
    
    global.dbo = db.db("fise_discipline");
    /*
    dbo.listCollections().toArray(function (err, collInfos) {
        console.log(collInfos);
    });
    */
});

route.get('/home', routes.verifyToken, routes.home);
route.post('/login', body, routes.login);
route.post('/register', body, routes.register);

app.use(serve('../client'));
app.use(route.routes());
app.use(route.allowedMethods());

const port = process.env.port || 10001;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
