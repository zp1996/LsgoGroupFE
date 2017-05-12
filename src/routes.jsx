import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Route, IndexRoute, browserHistory } from 'react-router';
import store from 'Stores/index';
import Index from 'Containers/index';
import Test from 'Containers/test';
import SignPage from 'Containers/sign';

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
    const token = localStorage.getItem('token'),
        storeToken = store.getState().login.token;
    if (token == null || storeToken !== token) {
        this.hasLogin = false;
        browserHistory.push('/sign');
    }
};

export default (
    <Route path="/" component={Container}>
        <Route onEnter={checkAuth}>
            <IndexRoute component={Index} />
        </Route>
        <Route path="sign" component={SignPage} />
    </Route>
);
