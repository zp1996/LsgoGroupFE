import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from 'Constants/actions';
import { newObj } from 'Helpers/EsExtend';

const initialState = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidHlwZSI6MCwiaWF0IjoxNDk1OTAyNjY0fQ.y8SLb9dfP_1HBZ3pjq2ZXVFk8VtZ7vQg6oisieVFhQs',
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
