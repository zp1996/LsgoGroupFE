import { take, put, takeEvery } from 'redux-saga/effects';
import { Get, GetSuccess, GetFail } from 'Actions/team';
import { get } from 'Helpers/EsExtend';
import { TEAM_GET_ASYNC } from 'Constants/sagas';

function *teamGetAsync(action) {
    yield put(Get());
    try {
        const res = yield get('/api/team');
        yield put(GetSuccess(res));
    } catch(err) {
        yield put(GetFail(err));
    }
}

export default function *watchTeam() {
    yield takeEvery(TEAM_GET_ASYNC, teamGetAsync);
}
