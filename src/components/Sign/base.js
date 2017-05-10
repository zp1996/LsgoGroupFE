import React, { Component } from 'react';
import { Form, Button } from 'antd';
import { post } from 'Helpers/EsExtend';

class Base extends Component {
    constructor(props) {
        super(props);
    }
    request(url) {
        this.props.form.validateFields((err, values) => {
            if (err == null) {
                console.log(values);
                post(url, values)
                    .then(data => console.log(data));
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
