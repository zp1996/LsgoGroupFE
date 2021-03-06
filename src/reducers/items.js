import { PUSH_ITEM, POP_ITEM } from 'Constants/actions';

const initialState = [ 'HTML5', 'CSS3', 'ES2015' ];

const items = (state = initialState, action) => {
    switch (action.type) {
        case PUSH_ITEM:
            state = state.slice(0);
            state.push(action.item);
            return state;
        case POP_ITEM:
            state = state.slice(0)
            state.pop();
            return state;
        default:
            return state;
    }
};

export default items;
