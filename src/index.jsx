import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import Header from 'Components/Header';
import 'Styles/index.less';
import routes from './routes';

let store = null;
if (process.env.NODE_ENV === 'production') {
    store = require('Stores/prod').default;
} else {
    store = require('Stores/dev').default;
}
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <div>
            <Header />
            <Router history={history}>
                {routes}
            </Router>
        </div>
    </Provider>, document.getElementById('root')
);
