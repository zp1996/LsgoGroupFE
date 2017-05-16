import React, { Component } from 'react';
import { Table, message } from 'antd';

const info = msg => {
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
    render() {
        const { loading, columns } = this.props;
        return (
            <Table columns={getColumns(columns)}
                loading={loading} />
        );
    }
}

export default WebTable;
