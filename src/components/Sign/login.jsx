import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import pattern from './pattern';

const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props);
        this.toLogin = this.toLogin.bind(this);
    }
    toLogin() {
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
                    {getFieldDecorator('email', {
                        rules: [{
                            required: true,
                            ...pattern.email
                        }],
                    })(
                        <Input prefix={<Icon type="mail" />} placeholder="email" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true,
                            ...pattern.password
                        }],
                    })(
                        <Input prefix={<Icon type="lock" />} placeholder="password"
                            type="password" />
                    )}
                </FormItem>
                <Button type="primary" className="sign-btn" onClick={this.toLogin}>登 录</Button>
            </Form>
        );
    }
}

const WrapperLogin = Form.create()(Login)
export default WrapperLogin;
