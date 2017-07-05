import {
    GET_TASK
} from 'Constants/actions';
import { asyncReducer, compose } from './enhancer';

const initialState = {
    pending: false,
    modal: false,
    data: null,
    error: null
};

const task = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export default compose(
    task, asyncReducer(GET_TASK)
);
