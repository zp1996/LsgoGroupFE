import React from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row, Button, Icon, Spin } from 'antd';
import WebTextArea from 'Components/WebTextArea';
import { get } from 'Helpers/EsExtend';
import { showErr } from 'Helpers/component';
import { submit } from 'Constants/menu';
import { Clear } from 'Actions/submit';
import { GET_SUBMIT_ASYNC, SUBMIT_SUBMIT_ASYNC } from 'Constants/sagas';
import Layout from './layout';

const attrs = [ 'hasdo', 'wechat', 'code', 'other', 'todo' ];

@connect(
    state => ({
        team: state.team,
        submit: state.submit
    })
)
class SubmitPage extends Layout {
    static initState() {
        const state = {};
        attrs.forEach(attr => {
            state[attr] = ''
        });
        return state;
    }
    static initChangeFn(ctx) {
        attrs.forEach(attr => {
            ctx[`change${attr}`] = ctx.baseChangeState(attr);
        });
    }
    constructor(props) {
        super(props);

        const { dispatch } = props;

        this.state = props.submit.data || SubmitPage.initState();

        SubmitPage.initChangeFn(this);
        this.submit = this.submit.bind(this);

        this.getData = () => dispatch({
            type: GET_SUBMIT_ASYNC
        });
    }
    componentWillMount() {
        this.getData();
    }
    componentWillReceiveProps(nextProps, nextState) {
        const { data, error } = nextProps.submit;
        if (data && Object.keys(data).length && this.state.data == null) {
            this.setState(data);
        }
        error && showErr(error);
    }
    componentWillUnmount() {
        this.props.dispatch(Clear());
    }
    baseChangeState(key) {
        return (e) => {
            const { value } = e.target;
            this.setState({ [key]: value });
        };
    }
    submit() {
        this.props.dispatch({
            type: SUBMIT_SUBMIT_ASYNC,
            data: this.state
        });
    }
    hasDataRender() {
        const { hasdo, wechat, code, other, todo } = this.state;
        return (
            <div className="submit-wrapper">
                <Row>
                    <Col span="8">
                        <Card title="第一部分" bordered={false}>
                            <WebTextArea value={hasdo} change={this.changehasdo}
                                title="在团队的这个月，自己的收获有什么？" />
                        </Card>
                    </Col>
                    <Col span="8">
                        <Card title="第二部分" bordered={false}>
                            <div className="second-part">
                                <WebTextArea value={wechat} change={this.changewechat}
                                    title="知识分享方面，为大家分享了哪些微信图文？" />
                                <WebTextArea value={code} change={this.changecode}
                                    title="团队代码积累方面，为团队积累了哪些代码？" />
                                <WebTextArea value={other} change={this.changeother}
                                    title="其它，等等？" />
                            </div>
                        </Card>
                    </Col>
                    <Col span="8">
                        <Card title="第三部分" bordered={false}>
                            <WebTextArea value={todo} change={this.changetodo}
                                title="计划下个月，自己要怎么去做？" />
                        </Card>
                    </Col>
                </Row>
                <div className="submit-button">
                    <Button type="primary" onClick={this.submit}>
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
