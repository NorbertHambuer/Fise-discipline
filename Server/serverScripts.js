'use strict';

module.exports = {
    login: login,
    register: register,
    home: home
}

async function login(ctx) {
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
}

async function register(ctx) {
    const newUser = {
        fName: ctx.request.body.fName,
        lName: ctx.request.body.lName,
        username: ctx.request.body.username,
        password: ctx.request.body.password,
        email: ctx.request.body.email
    }

    // il adaugi in baza de date

    ctx.body = 'done';
}

async function home(ctx) {
    console.log('home');
    ctx.body = 'done home';
}