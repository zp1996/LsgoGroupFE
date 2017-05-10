import React from 'react';
import { connect } from 'react-redux';
import Sign from 'Components/Sign';
import { LOGIN_ASYNC } from 'Constants/sagas';

const SignPage = ({ dispatch, pending, error }) => {
    const login = data => dispatch({
        type: LOGIN_ASYNC,
        data
    });
    return (
        <Sign login={login} pending={pending} error={error} />
    );
};

export default connect(
    state => ({
        pending: state.login.pending,
        error: state.login.error
    })
)(SignPage);
