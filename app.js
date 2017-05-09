import path from 'path';
import Koa from 'koa';
import KoaStatic from 'koa-static';
import render from 'koa-ejs';
import bodyParser from 'koa-bodyparser'
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { readSmallFile } from 'lsgo-file';
import store from 'Stores/prod';
import Header from 'Components/Header';
import routes from './src/routes';
import api from './middlewares/api'

const app = new Koa(),
    staticPath = path.join(__dirname, 'dist'),
    port = 9000;

render(app, {
    root: staticPath,
    viewExt: 'ejs',
    layout: false,
    debug: true
});

app.use(
    KoaStatic(staticPath, {
        index: path.join(staticPath, 'index.ejs')
    })
);

app.use(bodyParser());

app.use(api());

const matchPromise = ctx =>
    new Promise((resolve, reject) => {
        match({  routes, location: ctx.url }, (err, redirect, props) => {
            if (err) {
                reject(err);
            } else if (redirect) {
                console.log('redirect');
            } else if (props) {
                const html = renderToString(
                    <Provider store={store}>
                        <div>
                            <Header />
                            <RouterContext {...props} />
                        </div>
                    </Provider>
                );
                resolve(html);
            } else {
                reject(404);
            }
        });
    });
app.use(async (ctx, next) => {
    try {
        const html = await matchPromise(ctx);
        await ctx.render('index', {
            html,
            state: JSON.stringify(store.getState())
        });
    } catch (err) {
        if (err === 404) {
            await next();
        } else {
            ctx.status = 500;
            ctx.body = `Internal Server Error ${err}`;
        }
    }
});

app.use(async ctx => {
    ctx.status = 404;
    ctx.body = await readSmallFile('./404.html');
});

app.listen(port, () => {
    console.log(`server is on http://localhost:${port}`);
});
