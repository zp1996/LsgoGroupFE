import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import Base from './base';
import pattern from './pattern';

const FormItem = Form.Item;

class Login extends Base {
    constructor(props) {
        super(props);
        this.request = this.request.bind(this, '/api/login');
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const children = [
            <FormItem key="email">
                {getFieldDecorator('email', {
                    rules: [{
                        required: true,
                        ...pattern.email
                    }],
                })(
                    <Input prefix={<Icon type="mail" />} placeholder="请输入邮箱" />
                )}
            </FormItem>,
            <FormItem key="password">
                {getFieldDecorator('password', {
                    rules: [{
                        required: true,
                        ...pattern.password
                    }],
                })(
                    <Input prefix={<Icon type="lock" />} placeholder="请输入密码"
                        type="password" />
                )}
            </FormItem>
        ]
        return this.layout(children, '登 录');
    }
}

const WrapperLogin = Form.create()(Login)
export default WrapperLogin;
