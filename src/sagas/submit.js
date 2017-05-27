import { take, put, takeEvery } from 'redux-saga/effects';
import { Get, GetSuccess, GetFail } from 'Actions/submit';
import { get } from 'Helpers/EsExtend';
import { GET_SUBMIT_ASYNC } from 'Constants/sagas';

function *submitGetAsync(action) {
    yield put(Get());
    try {
        const { data } = yield get('/api/submit');
        yield put(GetSuccess(data));
    } catch(err) {
        yield put(GetFail(err));
    }
}

export default function *watchSubmit() {
    yield takeEvery(GET_SUBMIT_ASYNC, submitGetAsync);
}
