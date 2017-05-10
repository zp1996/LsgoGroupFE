import { fork } from 'redux-saga/effects';
import { helloSaga } from './hello';
import watchPopItem from './item';
import watchLogin from './login';

export default function *rootSaga() {
    yield fork(helloSaga);
    yield fork(watchPopItem);
    yield fork(watchLogin);
}
