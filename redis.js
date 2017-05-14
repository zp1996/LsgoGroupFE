const redis = require("redis"),
    client = redis.createClient();

client.on('error', err => {
    console.log('redis error:', err);
});

export const set = (key, value) => {
    return client.set(key, value);
};

const PromiseGet = (key) => new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
        if (err) {
            reject(err);
        } else {
            resolve(reply);
        }
    });
});
export const get = async (key) => {
    try {
        return await PromiseGet(key);
    } catch(err) {
        return null;
    }
};
