import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Route, IndexRoute, browserHistory } from 'react-router';
import { getLocalStorage } from 'Helpers/EsExtend';
import store from 'Stores/index';
import IndexPage from 'Containers/index';
import SignPage from 'Containers/sign';
import TeamPage from 'Containers/team';
import RulePage from 'Containers/rule';
import SubmitPage from 'Containers/submit';

const localStorage = getLocalStorage();

const Container = ({ children, location }) => (
    <ReactCSSTransitionGroup
            component="div"
            className="tranistion-wrapper"
            transitionName="router"
            transitionEnterTimeout={100}
            transitionLeaveTimeout={500}
        >
        <div key={location.pathname} className="router-container">
            {children}
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
            <Route path="team" component={TeamPage} />
            <Route path="rule" component={RulePage} />
            <Route path="submit" component={SubmitPage} />
            <IndexRoute component={IndexPage} />
        </Route>
        <Route path="sign" component={SignPage} onEnter={hasLogin} />
    </Route>
);
