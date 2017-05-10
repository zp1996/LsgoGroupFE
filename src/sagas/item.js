import { delay } from 'redux-saga';
import { take, put, takeEvery } from 'redux-saga/effects';
import { POP_ITEM } from 'Constants/actions';
import { POP_ITEM_ASYNC } from 'Constants/sagas';
import { popItem } from 'Actions/item';

function *popItemAsync(action) {
    const { data } = action;
    console.log('正在加载中...', data);
    yield delay(2000);
    yield put(popItem());
    console.log('加载完成了...');
}

export default function *watchPopItem() {
    yield takeEvery(POP_ITEM_ASYNC, popItemAsync);
}
