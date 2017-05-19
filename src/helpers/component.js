import { message } from 'antd';

export const showErr = err => {
    message.error(err.msg)
};
