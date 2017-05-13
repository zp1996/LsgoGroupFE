const request = require('superagent'),
    { target } = require('../proxy.json');

export const API = {
    post: (url, data) => {
        return new Promise((resolve, reject) => {
            request.post(`${target}${url}`)
                .send(data)
                .end((err, res) => {
                    if (err == null) {
                        resolve(res.body);
                    } else {
                        reject(res);
                    }
                })
        });
    }
};
