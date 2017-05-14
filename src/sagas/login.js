import { take, put, takeEvery } from 'redux-saga/effects';
import { Login, LoginSuccess, LoginFail } from 'Actions/login';
import { post, getLocalStorage } from 'Helpers/EsExtend';
import { LOGIN_ASYNC } from 'Constants/sagas';

function *loginAsync(action) {
    const { data, url } = action;
    yield put(Login());
    try {
        const res = yield post(url, data),
            localStorage = getLocalStorage();
        yield put(LoginSuccess());
        localStorage && localStorage.setItem('token', res.token);
    } catch(err) {
        yield put(LoginFail(err));
    }
}

export default function *watchLogin() {
    yield takeEvery(LOGIN_ASYNC, loginAsync);
}
