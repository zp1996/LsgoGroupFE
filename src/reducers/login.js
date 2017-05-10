import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from 'Constants/actions';

const initialState = {
    token: null,
    pending: false,
    error: null
};

const login = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            state.pending = true;
            return JSON.parse(JSON.stringify(state));
        case LOGIN_SUCCESS:
            state.pending = false;
            return state;
        case LOGIN_FAIL:
            state.pending = false;
            state.error = action.error;
            return JSON.parse(JSON.stringify(state));
        default:
            return state;
    }
};

export default login;
