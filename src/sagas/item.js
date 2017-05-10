import { delay } from 'redux-saga';
import { take, put, takeEvery, fork } from 'redux-saga/effects';
import { POP_ITEM } from 'Constants/actions';
import { POP_ITEM_ASYNC } from 'Constants/sagas';
import { popItem } from 'Actions/item';

function* popItemAsync() {
    const data = yield take(POP_ITEM_ASYNC);
    console.log('正在加载中...');
    yield delay(2000);
    yield put(popItem());
    console.log('加载完成了...');
}

export default function *watchPopItem() {
    while (true) {
        yield take(POP_ITEM_ASYNC);
        yield fork(popItemAsync);
    }
}
