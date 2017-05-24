import React from 'react';
import { connect } from 'react-redux';
import { get } from 'Helpers/EsExtend';
import { submit } from 'Constants/menu';
import Layout from './layout';

@connect(
    state => ({
        team: state.team
    })
)
class SubmitPage extends Layout {
    constructor(props) {
        super(props);
    }
    render() {
        return this.layout(
            <h1>Hello World!</h1>, submit
        )
    }
}

export default SubmitPage;
