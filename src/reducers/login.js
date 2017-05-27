import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from 'Constants/actions';
import { newObj } from 'Helpers/EsExtend';

const initialState = {
    token: '',
    pending: false,
    error: null
};

const login = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN:
            return newObj(state, {
                pending: true,
                error: null
            });
        case LOGIN_SUCCESS:
            return newObj(state, {
                pending: false,
                token: action.token,
                error: null
            });
        case LOGIN_FAIL:
            return newObj(state, {
                pending: false,
                error: action.error
            });
        default:
            return state;
    }
};

export default login;
