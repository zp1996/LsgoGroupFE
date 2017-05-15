import React, { Component } from 'react';
import WebMenu from 'Components/WebMenu';
import styles from 'Styles/layout.less';

class Layout extends Component {
    constructor(props) {
        super(props);
    }
    layout(children, select) {
        return (
            <div className="main-container">
                <div className="web-menu">
                    <WebMenu select={select} />
                </div>
                <div className="web-wrapper">
                    <div className="web-main">
                        { children }
                    </div>
                </div>
            </div>
        );
    }
}

export default Layout;
