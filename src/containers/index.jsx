import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from 'Components/Header';
import List from 'Components/List';
import { POP_ITEM_ASYNC } from 'Constants/sagas';

@connect(
    state => ({
        items: state.items
    })
)
class Index extends Component {
    constructor(props) {
        super(props);
        const { dispatch } = props;
        this.popItem = () => dispatch({
            type: POP_ITEM_ASYNC
        });
    }
    render() {
        const { items } = this.props;
        return (
            <div>
                <h1>Index Page</h1>
                <Link to="/sign">Sign Page</Link>
                <div className="index-container">
                    <List items={items} />
                </div>
                <button onClick={this.popItem}>删除元素</button>
            </div>
        );
    }
}

export default Index;
