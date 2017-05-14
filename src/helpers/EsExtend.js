require('es6-promise').polyfill();
require('isomorphic-fetch');

export const noop = () => {};

export const newObj = (obj, target) => Object.assign(
    {},
    obj,
    target
);

export const objToUrl = data => {
    return Object.keys(data).reduce((url, key) => {
        return `${url}${key}=${data[key]}&`;
    }, '').slice(0, -1);
};

export const get = () => {

};

export const post = (url, data) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: objToUrl(data),
        credentials: 'include',
        mode: 'cors'
    })
    .then(res => {
        if (res.status === 204) return {};
        if (res.status >= 400) {
            return res.json().then(data => Promise.reject({
                err: true,
                msg: data.msg
            }));
        }
        return res.json();
    });
};

export const getLocalStorage = function() {
    let res = null;
    if (typeof window === 'undefined') {
        res = null;
    } else {
        res = window.localStorage;
    }
    return () => res;
}();
