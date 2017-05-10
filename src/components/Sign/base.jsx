import React, { Component } from 'react';
import { Form, Button } from 'antd';
import { post } from 'Helpers/EsExtend';

class Base extends Component {
    constructor(props) {
        super(props);
    }
    request(url) {
        const { login, form: { validateFields } } = this.props;
        validateFields((err, values) => {
            if (err == null) {
                login(url, values);
            }
        });
    }
    layout(children, text, loadingText = 'Loading') {
        const { pending } = this.props;
        return (
            <Form className="sign-form-container">
                { children }
                <Button type="primary" className="sign-btn"
                    onClick={this.request} loading={pending}>
                    {
                        pending ? loadingText : text
                    }
                </Button>
            </Form>
        );
    }
}

export default Base;
