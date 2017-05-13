import { API } from './utils';

const loginPath = '/sign';

export default () => async (ctx, next) => {
    const token = ctx.cookies.get('token'),
        { url } = ctx;
    console.log(true);
    if (!token && url !== loginPath) {
        return ctx.redirect(loginPath);
    }
    try {
        const { login } = await API.post('/auth', { token });
        if (url === loginPath) {
            return ctx.redirect('/');
        }
    } catch(err) {
        if (url !== loginPath) {
            return ctx.redirect(loginPath);
        }
    }
    await next();
}
