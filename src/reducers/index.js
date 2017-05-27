import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import items from './items';
import login from './login';
import team from './team';
import submit from './submit';

export default combineReducers({
    items,
    login,
    team,
    submit,
    routing: routerReducer
});
