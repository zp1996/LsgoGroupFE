import React, { Component } from 'react';
import { Table, message } from 'antd';

const info = msg => {
    message.error(msg);
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
            <Table columns={columns}
                loading={loading} />
        );
    }
}

export default WebTable;
