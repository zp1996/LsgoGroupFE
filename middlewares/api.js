const request = require('superagent'),
    { target } = require('../proxy.json'),
    apiRE = /^\/api(\/\w+)/;

const API = {
    post: (url, data) => {
        return new Promise((resolve, reject) => {
            request.post(`${target}${url}`)
                .send(data)
                .end((err, res) => {
                    if (err == null) {
                        resolve(res.body);
                    } else {
                        reject(res);
                    }
                })
        });
    }
};
// 添加超时时间为3.5秒
const timeout = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('timeout');
    }, 3500);
});
Object.keys(API).forEach(key => {
    const fn = API[key];
    API[key] = (url, data) => Promise.race([
        fn(url, data),
        timeout()
    ]);
});

export default () => async (ctx, next) => {
    const { method, url, request: { body } } = ctx;
    const matches = apiRE.exec(url);
    if (matches == null) {
        await next();
    } else {
        try {
            const res = await API[method.toLowerCase()](matches[1], body);
            ctx.body = res;
        } catch(err) {
            if (err === 'timeout') {
                ctx.status = 502;
                ctx.body = { msg: '服务端繁忙，请稍后再试！' };
            } else {
                ctx.status = 500;
                ctx.body = { err };
            }
        }
    }
};
