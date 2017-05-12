let store = null;
if (process.env.NODE_ENV === 'production') {
    store = require('Stores/prod').default;
} else {
    store = require('Stores/dev').default;
}
store = store.getStore();

export default store;
