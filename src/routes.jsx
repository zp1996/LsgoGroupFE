import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Route, IndexRoute  } from 'react-router';
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

export default (
    <Route path="/" component={Container}>
        <IndexRoute component={Index} />
        <Route path="sign" component={SignPage} />
    </Route>
);
