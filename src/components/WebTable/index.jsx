import React, { Component } from 'react';
import { Table, message } from 'antd';

const { Column } = Table;

const err = msg => {
    message.error(msg);
};

const getColumns = columns => {
    return columns.map(column => {
        const { 0: key } = Object.keys(column);
        return {
            title: column[key],
            dataIndex: key,
            key
        };
    });
};

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
            err(error.msg);
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
