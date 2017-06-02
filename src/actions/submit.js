import {
    GET_SUBMIT, GET_SUBMIT_SUCCESS, GET_SUBMIT_FAIL, GET_SUBMIT_CLEAR,
    SUBMIT_SUBMIT, SUBMIT_SUBMIT_FAIL
} from 'Constants/actions';

export const Get = () => ({
    type: GET_SUBMIT
});

export const GetSuccess = data => ({
    type: GET_SUBMIT_SUCCESS,
    pending: false,
    data
});

export const GetFail = error => ({
    type: GET_SUBMIT_FAIL,
    pending: false,
    error
});

export const Clear = () => ({
    type: GET_SUBMIT_CLEAR
});

export const Submit = data => ({
    type: SUBMIT_SUBMIT,
    data
});

export const SubmitFail = (data, error) => ({
    type: SUBMIT_SUBMIT_FAIL,
    data,
    error
});
