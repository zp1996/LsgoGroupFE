import { take, put, takeEvery, select } from 'redux-saga/effects';
import { Get, GetSuccess, GetFail, Submit, SubmitFail } from 'Actions/submit';
import { get, post } from 'Helpers/EsExtend';
import { GET_SUBMIT_ASYNC, SUBMIT_SUBMIT_ASYNC } from 'Constants/sagas';

function *submitGetAsync(action) {
    yield put(Get());
    try {
        const { data } = yield get('/api/submit');
        yield put(GetSuccess(data));
    } catch(err) {
        yield put(GetFail(err));
    }
}

function *submitSubmitAsync(action) {
    const { data } = action,
        { submit: { data: lastData } } = yield select();
    yield put(Submit(data));
    try {
        const res = yield post('/api/submit', data);
    } catch(err) {
        yield put(SubmitFail(lastData, err));
    }
}

export default function *watchSubmit() {
    yield takeEvery(GET_SUBMIT_ASYNC, submitGetAsync);
    yield takeEvery(SUBMIT_SUBMIT_ASYNC, submitSubmitAsync);
}
