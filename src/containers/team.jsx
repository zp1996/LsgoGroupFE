import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Input, Select } from 'antd';
import WebTable from 'Components/WebTable';
import { RemoveFail } from 'Actions/team';
import { TEAM_GET_ASYNC } from 'Constants/sagas';
import Layout from './layout';

const after = '小组';

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
    constructor(props) {
        super(props);

        const { dispatch } = props;

        this.state = {
            modal: false,
            groupname: ''
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.changeGroupName = this.changeGroupName.bind(this);
        this.addGroup = this.addGroup.bind(this);

        this.getData = () => dispatch({ type: TEAM_GET_ASYNC });
        this.removeErr = () => dispatch(RemoveFail());
    }
    showModal() {
        this.setState({ modal: true });
    }
    hideModal() {
        this.setState({ modal: false });
    }
    addGroup() {
        console.log(`${this.state.groupname}${after}`);
        this.hideModal();
    }
    changeGroupName(e) {
        const { value } = e.target;
        this.setState({ groupname: value });
    }
    render() {
        const { team: { pending, data, error } } = this.props,
            { modal, groupname } = this.state;
        return this.layout(
            <div>
                <div className="add-team">
                    <Button type="primary" icon="plus"
                        onClick={this.showModal} loading={pending}>
                        新增小组
                    </Button>
                    <Modal title="新增小组" visible={modal} onOk={this.addGroup}
                        onCancel={this.hideModal}>
                        <div className="team-name">
                            <div className="team-name-item">
                                <label>小组名：</label>
                                <Input type="text" addonAfter={after}
                                    placeholder="请输入小组名" value={groupname}
                                    onChange={this.changeGroupName} />
                            </div>
                            <div className="team-name-item">
                                <label>小组组长：</label>
                                <Select defaultValue="none" style={{ width: 120 }}>
                                    <Option value="none">暂无</Option>
                                    <Option value="lucy">Lucy</Option>
                                    <Option value="Yiminghe">yiminghe</Option>
                                </Select>
                            </div>
                        </div>
                    </Modal>
                </div>
                <WebTable getData={this.getData} data={data} error={error}
                    loading={pending} columns={TeamPage.columns}
                    removeErr={this.removeErr} />
            </div>,
            'team-handle'
        );
    }
}

export default TeamPage;
