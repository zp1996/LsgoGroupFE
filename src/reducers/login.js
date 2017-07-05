import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from 'Constants/actions';
import { newObj } from 'Helpers/EsExtend';

const initialState = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidHlwZSI6MCwiaWF0IjoxNDk5MjI4NDUzfQ._qiB5qa4poygmZu0tYkDTy3W4xro8gLD7BODk-WDcqU',
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
