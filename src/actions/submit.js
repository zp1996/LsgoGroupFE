import {
    GET_SUBMIT,
    GET_SUBMIT_SUCCESS,
    GET_SUBMIT_FAIL
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
