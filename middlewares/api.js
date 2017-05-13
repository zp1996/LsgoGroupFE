import { API } from './utils';

const apiRE = /^\/api(\/\w+)/;
const handleError = {
    400: (ctx, err) => {
        ctx.status = 400;
        ctx.body = JSON.parse(err.text);
    },
    500: (ctx) => {
        ctx.status = 500;
        ctx.body = { msg: '服务器发生错误！' };
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
            if (res && res.token) {
                ctx.cookies.set('token', res.token);
            }
            ctx.body = res;
        } catch(err) {
            if (err === 'timeout') {
                ctx.status = 502;
                ctx.body = { msg: '服务端繁忙，请稍后再试！' };
            } else {
                handleError[err.status || 500](ctx, err);
            }
        }
    }
};
