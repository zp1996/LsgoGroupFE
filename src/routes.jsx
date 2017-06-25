import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { getLocalStorage } from 'Helpers/EsExtend';
import store from 'Stores/index';
import LeftMenu from 'Containers/menu';
import IndexPage from 'Containers/index';
import SignPage from 'Containers/sign';
import TeamPage from 'Containers/team';
import RulePage from 'Containers/rule';
import SubmitPage from 'Containers/submit';

const Layout = ({ children, location }) => {
    return (
        <div className="main-container">
            <LeftMenu pathname={location.pathname} />
            <ReactCSSTransitionGroup
                component="div"
                className="web-wrapper"
                transitionName="router"
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={5}
            >
                <div className="web-main" key={location.pathname}>
                    { children }
                </div>
            </ReactCSSTransitionGroup>
        </div>
    );
};

const localStorage = getLocalStorage();

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
    pathname = pathname === '/sign' ? '/team' : pathname;
    if (token != null && storeToken === token) {
        browserHistory.push(pathname);
    }
};

export default (
    <Route path="/" component={Layout}>
        <Route onEnter={checkAuth}>
            <Route path="team" component={TeamPage} />
            <Route path="rule" component={RulePage} />
            <Route path="submit" component={SubmitPage} />
            <IndexRoute component={IndexPage} />
        </Route>
        <Route path="sign" component={SignPage} onEnter={hasLogin} />
    </Route>
);
