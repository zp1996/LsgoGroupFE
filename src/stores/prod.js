import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from 'Reducers/index';
import rootSaga from 'Sagas/index';

class ProdStore {
    constructor() {
        const sagaMiddleware = createSagaMiddleware();
        const enhancer = applyMiddleware(sagaMiddleware);
        const initialState = typeof __INITIAL_STATE__ === 'undefined' ? {} : __INITIAL_STATE__;
        this.store = createStore(reducer, initialState, enhancer);
        sagaMiddleware.run(rootSaga);
    }
}

ProdStore.getStore = function() {
    let store = null;
    return () => {
        if (store == null) {
            store = new ProdStore().store;
        }
        return store;
    };
}();

export default ProdStore;
