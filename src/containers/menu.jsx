import React from 'react';
import { connect } from 'react-redux';
import WebMenu from 'Components/WebMenu';
import * as config from 'Constants/menu';

const LeftMenu = ({ pathname, team }) => {
    return (
        <div className="web-menu">
            <WebMenu {...config[pathname.slice(1)]} groups={team} />
        </div>
    );
};

export default connect(state => ({
    team: state.team.data
}))(LeftMenu);
