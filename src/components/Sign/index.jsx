import React, { Component } from 'react';
import { Tabs, message } from 'antd';
import Login from './login';
import Register from './register';
import styles from './index.less';

const TabPane = Tabs.TabPane;

const Sign = ({ login, error, pending }) => {
    if (error) {
        setTimeout(() => {
            message.error(error.msg);
        });
    }
    return (
        <div className="sign-container">
            <Tabs defaultActiveKey="1">
                <TabPane tab="登 录" key="1">
                    <Login pending={pending} login={login} />
                </TabPane>
                <TabPane tab="注 册" key="2">
                    <Register pending={pending} login={login} />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Sign;
