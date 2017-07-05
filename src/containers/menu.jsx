import React from 'react';
import { connect } from 'react-redux';
import WebMenu from 'Components/WebMenu';
import * as config from 'Constants/menu';

const LeftMenu = ({ pathname, team }) => {
    const key = pathname.slice(1).replace(
        /\-([a-z])/,
        (_, $1) => $1.toUpperCase()
    );
    return (
        <div className="web-menu">
            <WebMenu {...config[key]} groups={team} />
        </div>
    );
};

export default connect(state => ({
    team: state.team.data
}))(LeftMenu);
