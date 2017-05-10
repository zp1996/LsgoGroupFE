import { take, put, takeEvery } from 'redux-saga/effects';
import { Login, LoginSuccess, LoginFail } from 'Actions/login';
import { post } from 'Helpers/EsExtend';
import { LOGIN_ASYNC } from 'Constants/sagas';

function *loginAsync(action) {
    const { data, url } = action;
    yield put(Login());
    try {
        const res = yield post(url, data);
        yield put(LoginSuccess());
    } catch(err) {
        yield put(LoginFail(err));
    }
}

export default function *watchLogin() {
    yield takeEvery(LOGIN_ASYNC, loginAsync);
}
