import { take, put, takeEvery } from 'redux-saga/effects';
import { get } from 'Helpers/EsExtend';
import { TEAM_GET_ASYNC } from 'Constants/sagas';

function *teamGetAsync(action) {
    yield put(Get());
    try {

    } catch(err) {

    }
}
