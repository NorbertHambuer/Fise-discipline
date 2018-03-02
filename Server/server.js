'use strict';

const koa = require('koa');
const serve  = require('koa-static');
const route = require('koa-router')();
const body = require('koa-body')();


const port = process.env.port || 10001;
const app = new koa();

app.use(serve('../client')); //- urmeaza cand avem clientu



app.use(route.routes());
app.use(route.allowedMethods());


app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
