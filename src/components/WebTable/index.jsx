import React, { Component } from 'react';
import { Table, message } from 'antd';
import { showErr } from 'Helpers/component';
import pureRender from 'pure-render-decorator';

const { Column } = Table;

const getColumns = columns => {
    return columns.map(column => {
        const { 0: key } = Object.keys(column);
        return {
            title: column[key],
            dataIndex: key,
            key,
            render: column.render || (text => {
                return text == null ? '暂无' : text;
            })
        };
    });
};

@pureRender
class WebTable extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.getData();
    }
    componentDidUpdate() {
        const { error, removeErr } = this.props;
        if (error) {
            showErr(error);
            removeErr();
        }
    }
    render() {
        const { loading, columns, data } = this.props;
        return (
            <Table loading={loading} dataSource={data}>
                {
                    getColumns(columns).map(col => (
                        <Column {...col} />
                    ))
                }
            </Table>
        );
    }
}

export default WebTable;
