import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from 'Constants/actions';

export const Login = () => ({
    type: LOGIN
});

export const LoginSuccess = token => ({
    type: LOGIN_SUCCESS,
    token
});

export const LoginFail = error => ({
    type: LOGIN_FAIL,
    error
});
