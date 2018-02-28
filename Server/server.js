'use strict';

const koa = require('koa');
const serve  = require('koa-static');
const route = require('koa-router')();
const body = require('koa-body')();


const port = process.env.port || 10000;
const app = new koa();

//app.use(serve(../client)); - urmeaza cand avem clientu


route.get('/', async ctx => ctx.body = '/')
route.get('/test', async ctx => ctx.body = '/test');


app.use(route.routes());
app.use(route.allowedMethods());


app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
