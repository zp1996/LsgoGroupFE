import {
    TEAM_GET,
    TEAM_GET_SUCCESS,
    TEAM_GET_FAIL,
    TEAM_ERR_REMOVE
 } from 'Constants/actions';

export const Get = () => ({
    type: TEAM_GET
});

export const GetSuccess = data => ({
    type: TEAM_GET_SUCCESS,
    data
});

export const GetFail = error => ({
    type: TEAM_GET_FAIL,
    error
});

export const RemoveFail = () => ({
    type: TEAM_ERR_REMOVE
});
