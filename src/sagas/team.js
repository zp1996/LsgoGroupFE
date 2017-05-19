import { take, put, takeEvery } from 'redux-saga/effects';
import {
    Get,
    GetSuccess,
    GetFail,
    Add,
    AddSuccess,
    AddFail
} from 'Actions/team';
import { get, getLocalStorage, post } from 'Helpers/EsExtend';
import { TEAM_GET_ASYNC, TEAM_ADD_ASYNC } from 'Constants/sagas';

const localStorage = getLocalStorage();

function *teamGetAsync(action) {
    yield put(Get());
    try {
        const res = yield get('/api/team');
        localStorage && localStorage.setItem('team', res.join('.'));
        yield put(GetSuccess(res));
    } catch(err) {
        yield put(GetFail(err));
    }
}

function *teamAddAsync(action) {
    const { data } = action,
        teams = localStorage.getItem('team').split('.');
    yield put(Add());
    const index = teams.push(data) - 1;
    try {
        const res = yield post('/api/team/add', {
            name: data
        });
        yield put(AddSuccess());
        localStorage.setItem('teams', teams.join('.'));
    } catch(err) {
        yield put(AddFail(index, err));
    }
}

export default function *watchTeam() {
    yield takeEvery(TEAM_GET_ASYNC, teamGetAsync);
    yield takeEvery(TEAM_ADD_ASYNC, teamAddAsync);
}
