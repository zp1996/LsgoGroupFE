import React, { Component } from 'react';
import { Tabs, Alert } from 'antd';
import Login from './login';
import Register from './register';
import styles from './index.less';

const TabPane = Tabs.TabPane;

const Sign = ({ login, error, pending }) => {
    return (
        <div className="sign-container">
            <div className="sign-error">
                {
                    error ? (
                        <Alert message={error.msg} type="error"
                            showIcon closable />
                    ) : null
                }
            </div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="登 录" key="1">
                    <Login pending={pending} />
                </TabPane>
                <TabPane tab="注 册" key="2">
                    <Register pending={pending} />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default Sign;
