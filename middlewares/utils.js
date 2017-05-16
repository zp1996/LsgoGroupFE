const request = require('superagent'),
    { target } = require('../proxy.json');

const wrapper = function(obj, key, ...item) {
    return key ? obj[key].apply(obj, item) : obj;
};

const BaseAPI = (method, key) => (url, token, data) => {
    return new Promise((resolve, reject) => {
        wrapper(
            request[method](`${target}${url}`)
                .set('Cookie', `token=${token}`),
            key, data
        ).end((err, res) => {
            if (err == null) {
                resolve(res.body);
            } else {
                reject(res);
            }
        });
    });
}

export const API = {
    post: BaseAPI('post', 'send'),
    get: BaseAPI('get')
};
