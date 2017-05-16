import { fork } from 'redux-saga/effects';
import watchPopItem from './item';
import watchLogin from './login';
import watchTeam from './team';

export default function *rootSaga() {
    yield fork(watchPopItem);
    yield fork(watchLogin);
    yield fork(watchTeam);
}
