import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Base extends Component {
    constructor(props) {
        super(props);
        this.hasLogin = null;
    }
    componentWillMount() {
        const token = localStorage.getItem('token');
        if (token == null) {
            this.hasLogin = false;
            browserHistory.push('/sign');
        }
    }
    layout(children) {
        return this.hasLogin ? children : null;
    }
}

export default Base;
