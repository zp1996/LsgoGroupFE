import React, { Component } from 'react';
import { connect } from 'react-redux';

class TaskPage extends Component {
    static columns = [
        { name: '任务名' },
        { group: '归属小组' },
        { person: '任务归属人' }
    ];
    constructor(props) {
        super(props);
    }
    render() {
        return (<div>Hello World</div>);
    }
}

export default TaskPage;
