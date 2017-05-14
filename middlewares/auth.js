import { API } from './utils';
import { get, set } from '../redis';

const loginPath = '/sign';

const getLogin = async (token) => {
    const flag = token && await get(token);
    if (flag != null) {
        return Boolean(flag);
    } else {
        try {
            const { login } = await API.post('/auth', { token });
            set(token, login);
            return login;
        } catch(err) {
            return null;
        }
    }
};

export default () => async (ctx, next) => {
    const token = ctx.cookies.get('token'),
        { url } = ctx;
    if (!token) {
        if (url !== loginPath) {
            return ctx.redirect(loginPath);
        }
    } else {
        const login = await getLogin(token);
        if (login && url === loginPath) {
            return ctx.redirect('/');
        } else if (!login && url !== loginPath) {
            return ctx.redirect(loginPath);
        }
    }
    await next();
}
