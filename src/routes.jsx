import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Route, IndexRoute, browserHistory } from 'react-router';
import { getLocalStorage } from 'Helpers/EsExtend';
import store from 'Stores/index';
import Index from 'Containers/index';
import SignPage from 'Containers/sign';

const localStorage = getLocalStorage();

const Container = ({children, location}) => (
    <ReactCSSTransitionGroup
            component="div"
            className="tranistion-wrapper"
            transitionName="route"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
        >
        <div key={location.pathname} className="router-container">
            <div className="main-container">
                {children}
            </div>
        </div>
    </ReactCSSTransitionGroup>
);

const checkAuth = () => {
    if (localStorage == null) return;
    const token = localStorage.getItem('token'),
        storeToken = store.getState().login.token;
    if (token == null || storeToken !== token) {
        browserHistory.push('/sign');
    }
};

const hasLogin = () => {
    if (localStorage == null) return;
    const token = localStorage.getItem('token');
    let {
        routing: { locationBeforeTransitions: { pathname } },
        login: { token: storeToken }
    } = store.getState();
    pathname = pathname === '/sign' ? '/' : pathname;
    if (token != null && storeToken === token) {
        browserHistory.push(pathname);
    }
};

export default (
    <Route path="/" component={Container}>
        <Route onEnter={checkAuth}>
            <IndexRoute component={Index} />
        </Route>
        <Route path="sign" component={SignPage} onEnter={hasLogin} />
    </Route>
);
