import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import items from './items';
import login from './login';

export default combineReducers({
    items,
    login,
    routing: routerReducer
});
