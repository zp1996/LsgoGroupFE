import React from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row, Button, Icon, Spin } from 'antd';
import WebTextArea from 'Components/WebTextArea';
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
                            <WebTextArea title="在团队的这个月，自己的收获有什么？" />
                        </Card>
                    </Col>
                    <Col span="8">
                        <Card title="第二部分" bordered={false}>
                            <div className="second-part">
                                <WebTextArea title="知识分享方面，为大家分享了哪些微信图文？" />
                                <WebTextArea title="团队代码积累方面，为团队积累了哪些代码？" />
                                <WebTextArea title="其它，等等？" />
                            </div>
                        </Card>
                    </Col>
                    <Col span="8">
                        <Card title="第三部分" bordered={false}>
                            <WebTextArea title="计划下个月，自己要怎么去做？" />
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
