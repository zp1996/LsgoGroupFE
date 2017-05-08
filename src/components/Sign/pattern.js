export default {
    username: {
        pattern: /^[\u4e00-\u9fa5]{2,4}$/,
        message: '请正确输入姓名！'
    },
    email: {
        pattern: /^(?:\w+[\-+.]+)*[a-z0-9]+@(?:\w+.)+([a-z]{2,})+$/i,
        message: '请正确输入邮箱！'
    },
    password: {
        pattern: /^\w{6,18}$/,
        message: '请正确输入密码！'
    },
    repassword: {
        validator: function(rule, value, callback) {
            const { getFieldValue } = this.props.form;
            if (!value || value !== getFieldValue('password')) {
                return callback(false);
            }
            callback();
        },
        message: '两次密码输入不一致！'
    }
};
