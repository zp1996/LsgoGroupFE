import { TEAM_GET, TEAM_GET_SUCCESS, TEAM_GET_FAIL } from 'Constants/actions';
import { newObj } from 'Helpers/EsExtend';

const initialState = {
    pending: false,
    data: null,
    error: null
};

const team = (state = initialState, action) => {
    switch (action.type) {
        case TEAM_GET:
            return newObj(state, {
                pending: true
            });
        case TEAM_GET_SUCCESS:
            return newObj(state, {
                pending: false,
                error: null,
                data: action.data
            });
        case TEAM_GET_FAIL:
            return newObj(state, {
                pending: false,
                error: data.error;
            });
        default:
            return state;
    }
};
