import React from 'react';
import { connect } from 'react-redux';
import WebTable from 'Components/WebTable';
import { TEAM_GET_ASYNC } from 'Constants/sagas';
import { getColumns } from 'Helpers/columns';
import Layout from './layout';

@connect(
    state => ({
        team: state.team
    })
)
class TeamPage extends Layout {
    static columns = getColumns([
        { name: '小组名' },
        { number: '小组人数' },
        { leader: '小组组长' },
        { mentor: '小组副组长' }
    ])
    constructor(props) {
        super(props);

        const { dispatch } = props;

        this.getData = () => dispatch({
            type: TEAM_GET_ASYNC
        });
    }
    render() {
        const { team: { pending } } = this.props;
        return this.layout(
            <div>
                <WebTable getData={this.getData}
                    loading={pending} columns={TeamPage.columns} />
            </div>,
            'team-handle'
        );
    }
}

export default TeamPage;
