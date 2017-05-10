import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from 'Constants/actions';

export const Login = (data) => ({
    type: LOGIN,
    data
});
