import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import Base from './base';
import pattern from './pattern';

const FormItem = Form.Item;
const { username, email, password, repassword } = pattern;

class Register extends Base {
    constructor(props) {
        super(props);
        this.request = this.request.bind(this, '/api/register');

        repassword.validator = repassword.validator.bind(this);
        password.validator = (rule, value, callback) => {
            const { getFieldValue, setFields } = this.props.form;
            if (!value || !password.pattern.test(value)) {
                return callback(false);
            }
            const reValue = getFieldValue('repassword');
            if (reValue !== value) {
                setFields({
                    repassword: {
                        value: reValue,
                        errors: [new Error(repassword.message)]
                    }
                });
            } else {
                setFields({
                    repassword: {
                        value: reValue
                    }
                });
            }
            callback();
        };
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const children = [
            <FormItem key="username">
                {getFieldDecorator('username', {
                    rules: [{
                        required: true,
                        ...username
                    }],
                })(
                    <Input prefix={<Icon type="user" />} placeholder="请输入姓名" />
                )}
            </FormItem>,
            <FormItem key="email">
                {getFieldDecorator('email', {
                    rules: [{
                        required: true,
                        ...email
                    }],
                })(
                    <Input prefix={<Icon type="mail" />} placeholder="请输入邮箱" />
                )}
            </FormItem>,
            <FormItem key="password">
                {getFieldDecorator('password', {
                    rules: [{
                        required: true,
                        ...password
                    }],
                })(
                    <Input prefix={<Icon type="lock" />} placeholder="请输入密码"
                        type="password" />
                )}
            </FormItem>,
            <FormItem key="repassword">
                {getFieldDecorator('repassword', {
                    rules: [{
                        required: true,
                        ...repassword
                    }],
                })(
                    <Input prefix={<Icon type="lock" />} placeholder="确认密码"
                        type="password" />
                )}
            </FormItem>
        ];
        return this.layout(children, '注 册');
    }
}

const WrapperRegister = Form.create()(Register)
export default WrapperRegister;
