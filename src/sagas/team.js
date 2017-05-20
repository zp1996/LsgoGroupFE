import { take, put, takeEvery, select } from 'redux-saga/effects';
import {
    Get,
    GetSuccess,
    GetFail,
    Add,
    AddSuccess,
    AddFail,
    Del,
    DelFail
} from 'Actions/team';
import { get, getLocalStorage, post } from 'Helpers/EsExtend';
import { TEAM_GET_ASYNC, TEAM_ADD_ASYNC, TEAM_DEL_ASYNC } from 'Constants/sagas';

const localStorage = getLocalStorage();

const getTeams = () => {
    return localStorage.getItem('team').split('.');
};

function *teamGetAsync(action) {
    yield put(Get());
    try {
        const res = yield get('/api/team');
        localStorage && localStorage.setItem('team', JSON.stringify(res));
        yield put(GetSuccess(res));
    } catch(err) {
        yield put(GetFail(err));
    }
}

function *teamAddAsync(action) {
    const { data } = action,
        teams = getTeams();
    yield put(Add());
    try {
        const res = yield post('/api/team/add', {
            name: data
        });
        yield put(AddSuccess(res));
        localStorage.setItem('teams', teams.join('.'));
    } catch(err) {
        yield put(AddFail(err));
    }
}

function *teamDelAsync(action) {
    const { id } = action;
    let { team: { data } } = yield select();
    yield put(Del(id));
    try {
        const res = yield get(`/api/team/del/${id}`);
        let { team: { data } } = yield select();
        localStorage.setItem('team', JSON.stringify(
            data
        ));
    } catch(err) {
        yield put(DelFail(data, err));
    }
}

export default function *watchTeam() {
    yield takeEvery(TEAM_GET_ASYNC, teamGetAsync);
    yield takeEvery(TEAM_ADD_ASYNC, teamAddAsync);
    yield takeEvery(TEAM_DEL_ASYNC, teamDelAsync);
}
