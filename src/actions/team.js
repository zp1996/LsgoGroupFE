import {
    TEAM_GET, TEAM_GET_SUCCESS, TEAM_GET_FAIL,
    TEAM_ERR_REMOVE, TEAM_CHANGE_MODAL,
    TEAM_ADD, TEAM_ADD_SUCCESS, TEAM_ADD_FAIL,
    TEAM_DEL, TEAM_DEL_FAIL,
    TEAM_UPDATE_SUCCESS
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

export const Add = () => ({
    type: TEAM_ADD
});

export const AddSuccess = team => ({
    type: TEAM_ADD_SUCCESS,
    team
});

export const AddFail = err => ({
    type: TEAM_ADD_FAIL,
    err
});

export const ChangeModal = modal => ({
    type: TEAM_CHANGE_MODAL,
    modal
});

export const Del = id => ({
    type: TEAM_DEL,
    id
});

export const DelFail = (data, err) => ({
    type: TEAM_DEL_FAIL,
    data,
    err
});

export const UpdateSuccess = team => ({
    type: TEAM_UPDATE_SUCCESS,
    team
});
