import React, { Component } from 'react';
import { Table, message } from 'antd';

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
}];

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
        const err = { msg: '数据获取发生异常！' },
            loading = true;
        return (
            <Table columns={columns}
                loading={loading} />
        );
    }
}

export default WebTable;
