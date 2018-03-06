'use strict';

const koa = require('koa');
const serve  = require('koa-static');
const route = require('koa-router')();
const body = require('koa-body')();
const app = new koa();

route.get('/test', async ctx => {
    ctx.body = 'Done!';
});


app.use(serve('../client'));
app.use(route.routes());
app.use(route.allowedMethods());


const port = process.env.port || 10001;

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
