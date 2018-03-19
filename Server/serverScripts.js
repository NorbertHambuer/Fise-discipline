'use strict';

const jwt = require('jsonwebtoken');

module.exports = {
    login: login,
    register: register,
    home: home,
    verifyToken: verifyToken
}

async function login(ctx) {
    const user = {
        username: ctx.request.body.username,
        password: ctx.request.body.password
    }

    // trebe verificat in db useru

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

    let utilizatori = dbo.collection('utilizatori');
    let query = {
        email: newUser.email,
        username: newUser.username
    }

    utilizatori.find(query).toArray(function (err, result) {
        if (err)
            throw err;
        if (!result) {
            utilizatori.insert({ username: newUser.username, pass: newUser.password, nume: newUser.fName, prenume: newUser.lName, email: newUser.email });
            success = true;
        }

    });

    ctx.body = success;
}

async function home(ctx) {
    console.log('home');
    ctx.body = 'done home';
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