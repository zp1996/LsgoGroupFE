import {
    TEAM_GET, TEAM_ERR_REMOVE, TEAM_CHANGE_MODAL,
    TEAM_ADD, TEAM_ADD_SUCCESS, TEAM_ADD_FAIL,
    TEAM_DEL, TEAM_DEL_FAIL,
    TEAM_UPDATE_SUCCESS
 } from 'Constants/actions';
import { newObj } from 'Helpers/EsExtend';
import { asyncReducer, compose } from './enhancer';

const initialState = {
    pending: false,
    modal: false,
    data: null,
    error: null
};

const team = (state = initialState, action) => {
    switch (action.type) {
        case TEAM_ADD:
            return newObj(state, {
                pending: true
            });
        case TEAM_ADD_SUCCESS:
            state.data.push(action.team);
            return newObj(state, {
                pending: false,
                data: state.data
            });
        case TEAM_ADD_FAIL:
            return newObj(state, {
                pending: false,
                error: action.err
            });
        case TEAM_CHANGE_MODAL:
            return newObj(state, {
                modal: action.modal
            });
        case TEAM_ERR_REMOVE:
            return newObj(state, {
                error: null
            });
        case TEAM_DEL:
            return newObj(state, {
                data: state.data.filter(
                    team => team.id !== action.id
                )
            });
        case TEAM_DEL_FAIL:
            return newObj(state, {
                data: action.data,
                error: action.err
            });
        case TEAM_UPDATE_SUCCESS:
            const { data } = state;
            data.some((item, index) => {
                const flag = item.id === action.team.id;
                if (flag) {
                    data[index] = action.team;
                }
                return flag;
            });
            return newObj(state, {
                pending: false,
                data
            });
        default:
            return state;
    }
};

export default compose(
    team, asyncReducer(TEAM_GET)
);
