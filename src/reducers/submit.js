import { GET_SUBMIT, GET_SUBMIT_SUCCESS, GET_SUBMIT_FAIL } from 'Constants/actions';
import { newObj } from 'Helpers/EsExtend';

const initialState = {
    pending: true,
    data: null,
    error: null
};

const submit = (state = initialState, action) => {
    switch(action.type) {
        case GET_SUBMIT:
            return newObj(state, {
                pending: true
            });
        case GET_SUBMIT_SUCCESS:
            return newObj(state, {
                data: action.data,
                pending: false
            });
        case GET_SUBMIT_FAIL:
            return newObj(state, {
                error: action.error,
                pending: false
            });
        default: 
            return state;
    }
};

export default submit;
