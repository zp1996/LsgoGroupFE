const request = require('superagent'),
    apiRE = /^\/api(\/\w+)/;

export default () => async (ctx, next) => {
    const matches = apiRE.exec(ctx.url);
    if (matches == null) {
        await next();
    } else {
        ctx.body = {
            url: matches[1],
            method: ctx.method
        };
    }
};
