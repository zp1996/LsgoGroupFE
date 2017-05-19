import {
    TEAM_GET,
    TEAM_GET_SUCCESS,
    TEAM_GET_FAIL,
    TEAM_ERR_REMOVE,
    TEAM_ADD,
    TEAM_CHANGE_MODAL,
    TEAM_ADD_SUCCESS,
    TEAM_ADD_FAIL
} from 'Constants/actions';
import { newObj } from 'Helpers/EsExtend';

const initialState = {
    pending: false,
    modal: false,
    data: null,
    error: null
};

const team = (state = initialState, action) => {
    switch (action.type) {
        case TEAM_GET:
        case TEAM_ADD:
            return newObj(state, {
                pending: true
            });
        case TEAM_ADD_SUCCESS:
            return newObj(state, {
                pending: false
            });
        case TEAM_ADD_FAIL:
            const { data } = state,
                { index, err } = action;
            data.splice(index, 1);
            return newObj(state, {
                pending: false,
                data,
                error: err
            });
        case TEAM_CHANGE_MODAL:
            return newObj(state, {
                modal: action.modal
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
                error: action.error
            });
        case TEAM_ERR_REMOVE:
            return newObj(state, {
                error: null
            });
        default:
            return state;
    }
};

export default team;
