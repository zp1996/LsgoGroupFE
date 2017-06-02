import {
    GET_SUBMIT, GET_SUBMIT_SUCCESS, GET_SUBMIT_FAIL, GET_SUBMIT_CLEAR,
    SUBMIT_SUBMIT, SUBMIT_SUBMIT_FAIL
} from 'Constants/actions';
import { newObj } from 'Helpers/EsExtend';
import { asyncReducer, compose } from './enhancer';

const initialState = {
    pending: true,
    data: null,
    error: null
};

const submit = (state = initialState, action) => {
    switch(action.type) {
        case GET_SUBMIT_CLEAR:
            return newObj(state, {
                error: null,
                pending: true
            });
        case SUBMIT_SUBMIT:
            return newObj(state, {
                data: action.data
            });
        case SUBMIT_SUBMIT_FAIL:
            return newObj(state, {
                data: action.data,
                error: action.error
            });
        default:
            return state;
    }
};

export default compose(
    submit, asyncReducer(GET_SUBMIT)
);
