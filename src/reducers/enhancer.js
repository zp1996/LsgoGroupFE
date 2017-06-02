import { newObj } from 'Helpers/EsExtend';

// loading的组合
export const asyncReducer = type => (state, action) => {
    const success = `${type}_SUCCESS`,
        fail = `${type}_FAIL`;

    switch (action.type) {
        case type:
            return newObj(state, {
                pending: true,
                error: null
            });
        case success:
            return newObj(state, {
                pending: false,
                data: action.data,
                error: null
            });
        case fail:
            return newObj(state, {
                pending: false,
                error: action.error
            });
        default:
            return state;
    }
};
// 组合多个reducer
export const compose = (...reducers) => {
    return (state, action) => {
        if (reducers.length === 0) {
            return state;
        }

        const first = reducers[0],
            rest = reducers.slice(1);

        return rest.reduce((enhanced, reducer) => (
            reducer(enhanced, action)
        ), first(state, action));
    };
};
