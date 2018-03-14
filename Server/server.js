'use strict';

const koa = require('koa');
const serve  = require('koa-static');
const route = require('koa-router')();
const body = require('koa-body')();
const jwt = require('jsonwebtoken');
const mongo = require('mongodb');
const app = new koa();

var url = "mongodb://localhost:27017/";

mongo.connect(url, function (err, db) {
    if (err) {
        console.log(err);
        throw err;
    }
    
    var dbo = db.db("fise_discipline");
    
    dbo.listCollections().toArray(function (err, collInfos) {
        console.log(collInfos);
    });
});

route.get('/home', verifyToken, async ctx => {
    console.log('home');
    ctx.body = 'done home';
})

route.post('/test', body, verifyToken, async ctx => {
    console.log('test');
    ctx.body = 'done';
});

route.post('/login', body, async ctx => {
    const user = {
        username: ctx.request.body.username,
        password: ctx.request.body.password
    }

    let promise = new Promise((res, rej) => {
        jwt.sign({ user }, 'secretkey', { expiresIn: '1d' }, (err, token) => {
            if (err) {
                rej(err);
            }
            console.log(token);

            res({ token: token });
        });
    })

    ctx.body = await promise;
});


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
