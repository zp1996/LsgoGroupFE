import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import items from './items';
import login from './login';
import team from './team';

export default combineReducers({
    items,
    login,
    team,
    routing: routerReducer
});
