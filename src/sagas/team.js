import { take, put, takeEvery, select } from 'redux-saga/effects';
import {
    Get, GetSuccess, GetFail,
    Add, AddSuccess, AddFail,
    Del, DelFail, UpdateSuccess
} from 'Actions/team';
import { get, getLocalStorage, post } from 'Helpers/EsExtend';
import {
    TEAM_GET_ASYNC, TEAM_ADD_ASYNC,
    TEAM_DEL_ASYNC, TEAM_UPDATE_ASYNC
} from 'Constants/sagas';

const localStorage = getLocalStorage();

const getTeams = () => {
    return JSON.parse(localStorage.getItem('team'));
};
const setTeams = data => {
    localStorage && localStorage.setItem('team', JSON.stringify(data));
};

function *teamGetAsync(action) {
    yield put(Get());
    try {
        const res = yield get('/api/team');
        setTeams(res);
        yield put(GetSuccess(res));
    } catch(err) {
        yield put(GetFail(err));
    }
}

const BaseTeam = (url, fn) => {
    function *handle(action) {
        const { data } = action,
            teams = getTeams();
        yield put(Add());
        try {
            const res = yield post(url, data);
            yield put(fn(res));
            const state = yield select();
            setTeams(state.team.data);
        } catch(err) {
            yield put(AddFail(err));
        }
    }
    return handle;
}

function *teamDelAsync(action) {
    const { id } = action;
    let { team: { data } } = yield select();
    yield put(Del(id));
    try {
        const res = yield get(`/api/team/del/${id}`);
        let { team: { data } } = yield select();
        setTeams(data);
    } catch(err) {
        yield put(DelFail(data, err));
    }
}

export default function *watchTeam() {
    yield takeEvery(TEAM_GET_ASYNC, teamGetAsync);
    yield takeEvery(
        TEAM_ADD_ASYNC,
        BaseTeam('/api/team/add', AddSuccess)
    );
    yield takeEvery(
        TEAM_UPDATE_ASYNC,
        BaseTeam('/api/team/update', UpdateSuccess)
    );
    yield takeEvery(TEAM_DEL_ASYNC, teamDelAsync);
}
