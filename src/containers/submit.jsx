import React from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row, Button, Icon, Spin } from 'antd';
import { get } from 'Helpers/EsExtend';
import { submit } from 'Constants/menu';
import { GET_SUBMIT_ASYNC } from 'Constants/sagas';
import Layout from './layout';

@connect(
    state => ({
        team: state.team,
        submit: state.submit
    })
)
class SubmitPage extends Layout {
    constructor(props) {
        super(props);

        const { dispatch } = props;
        console.log(dispatch);
        this.getData = () => dispatch({
            type: GET_SUBMIT_ASYNC
        });
    }
    componentWillMount() {
        this.getData();
    }
    hasDataRender() {
        return (
            <div className="submit-wrapper">
                <Row>
                    <Col span="8">
                        <Card title="第一部分" bordered={false}>
                            Card content
                        </Card>
                    </Col>
                    <Col span="8">
                        <Card title="第二部分" bordered={false}>
                            Card content
                        </Card>
                    </Col>
                    <Col span="8">
                        <Card title="第三部分" bordered={false}>
                            Card content
                        </Card>
                    </Col>
                </Row>
                <div className="submit-button">
                    <Button type="primary">
                        <Icon type="to-top" />
                        提交月总结
                    </Button>
                </div>
            </div>
        );
    }
    render() {
        const { submit: { data } } = this.props;
        const dom = data ? this.hasDataRender() : (
            <div className="submit-loading-wrapper">
                <Spin tip="Loading..." />
            </div>
        );
        return this.layout(dom, submit);
    }
}

export default SubmitPage;
