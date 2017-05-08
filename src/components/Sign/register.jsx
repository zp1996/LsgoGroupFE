import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import pattern from './pattern';

const FormItem = Form.Item;
const { username, email, password, repassword } = pattern;

class Register extends Component {
    constructor(props) {
        super(props);
        this.toRegister = this.toRegister.bind(this);

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
    toRegister() {
        this.props.form.validateFields((err, values) => {
            if (err == null) {
                console.log(values);
            }
        });
    }
    render() {
        const { form: { getFieldDecorator } } = this.props;
        return (
            <Form className="sign-form-container">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{
                            required: true,
                            ...username
                        }],
                    })(
                        <Input prefix={<Icon type="user" />} placeholder="请输入姓名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{
                            required: true,
                            ...email
                        }],
                    })(
                        <Input prefix={<Icon type="mail" />} placeholder="请输入邮箱" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true,
                            ...password
                        }],
                    })(
                        <Input prefix={<Icon type="lock" />} placeholder="请输入密码"
                            type="password" />
                    )}
                </FormItem>
                <FormItem>
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
                <Button type="primary" className="sign-btn" onClick={this.toRegister}>注 册</Button>
            </Form>
        );
    }
}

const WrapperRegister = Form.create()(Register)
export default WrapperRegister;
