import React from 'react';
import Layout from './layout';

class TeamPage extends Layout {
    constructor(props) {
        super(props);
    }
    render() {
        return this.layout(
            <div>
                Group
            </div>,
            'team-handle'
        );
    }
}

export default TeamPage;
