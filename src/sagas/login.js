import { browserHistory } from 'react-router';
import { take, put, takeEvery } from 'redux-saga/effects';
import { Login, LoginSuccess, LoginFail } from 'Actions/login';
import { post, getLocalStorage } from 'Helpers/EsExtend';
import { LOGIN_ASYNC } from 'Constants/sagas';

function *loginAsync(action) {
    const { data, url } = action;
    yield put(Login());
    try {
        const { token } = yield post(url, data),
            localStorage = getLocalStorage();
        yield put(LoginSuccess(token));
        localStorage && localStorage.setItem('token', token);
        browserHistory.push('/team');
    } catch(err) {
        yield put(LoginFail(err));
    }
}

export default function *watchLogin() {
    yield takeEvery(LOGIN_ASYNC, loginAsync);
}
