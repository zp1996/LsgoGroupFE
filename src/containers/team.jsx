import React from 'react';
import { connect } from 'react-redux';
import WebTable from 'Components/WebTable';
import Layout from './layout';

@connect()
class TeamPage extends Layout {
    constructor(props) {
        super(props);
    }
    render() {
        return this.layout(
            <div>
                <WebTable getData={() => {}} />
            </div>,
            'team-handle'
        );
    }
}

export default TeamPage;
