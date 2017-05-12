import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducer from 'Reducers/index';
import rootSaga from 'Sagas/index';

const sagaMiddleware = createSagaMiddleware();

class DevStore {
    constructor() {
        const middlewares = [
            logger,
            sagaMiddleware
        ];
        const enhancer = applyMiddleware(...middlewares);
        const initialState = window.__INITIAL_STATE__;
        this.store = configureStore(reducer, initialState, enhancer);
    }
}

function configureStore(reducer, initialState, enhancer) {
    const store = createStore(reducer, initialState, enhancer);
    sagaMiddleware.run(rootSaga);
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}

DevStore.getStore = function() {
    let store = null;
    return () => {
        if (store == null) {
            store = new DevStore().store;
        }
        return store;
    };
}();

export default DevStore;
