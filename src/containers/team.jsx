import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Input, Select, Spin } from 'antd';
import WebTable from 'Components/WebTable';
import { showErr } from 'Helpers/component';
import { get } from 'Helpers/EsExtend';
import { RemoveFail, ChangeModal, Del } from 'Actions/team';
import {
    TEAM_GET_ASYNC, TEAM_ADD_ASYNC,
    TEAM_DEL_ASYNC, TEAM_UPDATE_ASYNC
} from 'Constants/sagas';
import { teamHandle } from 'Constants/menu';
import Layout from './layout';

const after = '小组',
    none = 'null',
    pattern = /\./g,
    Option = Select.Option;

@connect(
    state => ({
        team: state.team
    })
)
class TeamPage extends Layout {
    static columns = [
        { name: '小组名' },
        { number: '小组人数' },
        { leader: '小组组长' },
        { mentor: '小组副组长' },
        { handle: '操作' }
    ]
    static verify(groupname, leader, mentor) {
        let err = null;
        if (!groupname || pattern.test(groupname)) {
            err = { msg: '请正确输入小组名！' };
        } else if(leader === mentor && leader !== none) {
            err = { msg: '小组组长与副组长不能是同一人！' };
        } else if (leader === 'loading' || mentor === 'loading') {
            err = { msg: '数据未加载完毕！'};
        }
        return err;
    }
    static getOptions(value, users, fn) {
        return (
            <Select value={value} style={{ width: 120 }} onChange={fn}>
                <Option value={none}>暂无</Option>
                {
                    users && Array.isArray(users) ? users.map(user => {
                        const { id, username } = user;
                        return (
                            <Option value={id.toString()}
                                key={id}>
                                { username }
                            </Option>
                        );
                    }) : (
                        <Option value="loading" className="option-loading">
                            <Spin />
                        </Option>
                    )
                }
            </Select>
        );
    }
    constructor(props) {
        super(props);

        const { dispatch } = props;

        this.state = {
            id: null,
            status: 'add',
            groupname: '',
            users: null,
            leader: none,
            mentor: none
        };

        this.changeGroupName = this.changeGroupName.bind(this);
        this.changeLeader = this.changeSeclect('leader');
        this.changeMentor = this.changeSeclect('mentor');
        this.handleGroup = {
            addGroup: this.baseHandleGroup.bind(this, TEAM_ADD_ASYNC),
            changeGroup: this.baseHandleGroup.bind(this, TEAM_UPDATE_ASYNC)
        };

        this.getData = () => dispatch({ type: TEAM_GET_ASYNC });
        this.removeErr = () => dispatch(RemoveFail());
        this.hideModal = () => dispatch(ChangeModal(false));
        this.showModal = this.baseShowModal.bind(this, 'add');
        this.showChangeModal = this.baseShowModal.bind(this, 'change');
        this.del = id => dispatch({ type: TEAM_DEL_ASYNC, id });

        const { columns } = TeamPage;
        columns[columns.length - 1].render = this.renderHandle.bind(this);
    }
    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.team.modal === false
            && this.props.team.modal === true) {
            this.setState({ groupname: '' });
        }
    }
    getUsers() {
        const { users } = this.state;
        if (users == null) {
            get('/api/users').then(data => {
                this.setState({ users: data });
            });
        }
    }
    baseShowModal(type, other = {}) {
        this.setState({ status: type, ...other });
        this.getUsers();
        this.props.dispatch(ChangeModal(true));
    }
    renderHandle(text, data) {
        const { id, name, leader, mentor } = data,
            { del, showChangeModal } = this;
        return (
            <span className="handles">
                <a href="javascript: void(0)" onClick={del.bind(this, id)}>删除</a>
                <a href="javascript: void(0)" onClick={showChangeModal.bind(this, {
                    groupname: name.slice(0, -2),
                    leader: leader ? leader : none,
                    mentor: mentor ? mentor : none,
                    id
                })}>编辑小组</a>
            </span>
        );
    }
    baseHandleGroup(type) {
        let { groupname, leader, mentor, id } = this.state;
        const err = TeamPage.verify(groupname, leader, mentor);
        if (err != null) {
            showErr(err);
        } else {
            const baseData = {
                name: `${groupname}${after}`,
                leader,
                mentor
            };
            this.props.dispatch({
                type,
                data: id ? Object.assign(baseData, { id }) : baseData
            });
        }
        this.hideModal();
    }
    changeGroupName(e) {
        const { value } = e.target;
        this.setState({ groupname: value });
    }
    changeSeclect(type) {
        return val => this.setState({
            [type]: val
        });
    }
    render() {
        const { team: { pending, data, error, modal } } = this.props,
            { groupname, users, leader, mentor, status } = this.state;
        return this.layout(
            <div>
                <div className="add-team">
                    <Button type="primary" icon="plus"
                        onClick={this.showModal} loading={pending}>
                        新增小组
                    </Button>
                    <Modal title="新增小组" visible={modal} onOk={this.handleGroup[`${status}Group`]}
                        onCancel={this.hideModal} confirmLoading={pending}>
                        <div className="team-name">
                            <div className="team-name-item">
                                <label>小组名：</label>
                                <Input type="text" addonAfter={after}
                                    placeholder="请输入小组名" value={groupname}
                                    onChange={this.changeGroupName} />
                            </div>
                            <div className="team-name-item">
                                <label>组长：</label>
                                {
                                    TeamPage.getOptions(leader, users, this.changeLeader)
                                }
                            </div>
                            <div className="team-name-item">
                                <label>副组长：</label>
                                {
                                    TeamPage.getOptions(mentor, users, this.changeMentor)
                                }
                            </div>
                        </div>
                    </Modal>
                </div>
                <WebTable getData={this.getData} data={data} error={error}
                    loading={pending} columns={TeamPage.columns}
                    removeErr={this.removeErr} />
            </div>, teamHandle
        );
    }
}

export default TeamPage;
