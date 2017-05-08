import React, { Component } from 'react';
import { Tabs } from 'antd';
import Login from './login';
import Register from './register';
import styles from './index.less';

const TabPane = Tabs.TabPane;

const Sign = () => {
    return (
        <div className="sign-container">
            <Tabs defaultActiveKey="2">
                <TabPane tab="登 录" key="1">
                    <Login />
                </TabPane>
                <TabPane tab="注 册" key="2">
                    <Register />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Sign;
