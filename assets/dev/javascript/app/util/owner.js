/**
 * 获取当前状态
 **/
owner.getState = function () {
    var stateText = localStorage.getItem('$state') || "{}";
    console.log(JSON.parse(stateText));
    return JSON.parse(stateText);
};

/**
 * 清空当前状态
 **/
owner.remove = function () {
    localStorage.removeItem('$state');
};

/**
 * 写入当前状态
 **/
owner.setState = function (state) {
    state = state || {};
    localStorage.setItem('$state', JSON.stringify(state));
};

/**
 * 创建当前状态
 **/
owner.createState = function (user_id, callback) {
    var state = owner.getState();

    state.user_id = user_id;
    owner.setState(state);

    return callback('登录成功!');
};

//手机号check
owner.check_phone = function (phone) {
    var phonereg = /^((\d{3,4}-)?\d{7,8})?(1[3587]\d{9})?$/;
    return (phonereg.exec(phone) && phone.length == 11)
};
owner.check_email = function (email) {
    email = email || '';
    return (email.length > 3 && email.indexOf('@') > -1);
};

/**
 * 用户登录
 **/
owner.login = function (login_info, callback) {
    callback = callback || $.noop;
    login_info = login_info || {};
    login_info.phone = login_info.phone || '';
    login_info.password = login_info.password || '';

    if (!owner.check_phone(login_info.phone)) {
        return callback("请填写正确的手机号码");
    }

    if (login_info.password.length < 8) {
        return callback('密码最短为8个字符');
    }

    //加密
    login_info.password = jQuery.md5(login_info.password);
    Api.login.submit(login_info)

        .done(function (_data) {
            console.log(_data);
            owner.createState(login_info.phone, callback);
            setTimeout(function () {
                mui.openWindow({
                    url: 'index.html',
                    id: 'index'
                })
            }, 1000);
        })
        .fail(function (err_msg, error) {
            console.log(err_msg);
        });
};

/**
 * 新用户注册
 **/
owner.reg = function (reg_info, callback) {
    callback = callback || $.noop;
    reg_info = reg_info || {};
    reg_info.phone = reg_info.phone || '';
    reg_info.email = reg_info.email || '';
    reg_info.password = reg_info.password || '';
    reg_info.password2 = reg_info.password || '';

    console.log(owner.check_phone(reg_info.phone));
    if (!owner.check_phone(reg_info.phone)) {
        return callback("请填写正确的手机号码");
    }
    if (!owner.check_email(reg_info.email)) {
        return callback("请填写正确的邮箱");
    }


    if (reg_info.password.length < 8) {
        return callback('密码最短为8个字符');
    }

    if (reg_info.password2 != reg_info.password) {
        return callback('两次密码输入不一致');
    }

    //md5加密
    reg_info.password = jQuery.md5(reg_info.password);
    reg_info.password2 = jQuery.md5(reg_info.password2);


    Api.reg.submit(reg_info)
        .done(function (_data) {
            setTimeout(function () {
                mui.openWindow({
                    url: 'reg_login.html',
                    id: 'reg'
                })
            }, 1000);
            return callback(_data.message);
        })
        .fail(function (err_msg, error) {
            console.log(err_msg);
        });
};

/**
 * 忘记密码
 **/
owner.forgetPassword = function (change_info, callback) {
    callback = callback || $.noop;
    change_info = change_info || {};
    change_info.email = change_info.email || '';

    if (!owner.check_email(change_info.email)) {
        return callback("请填写正确的邮箱");
    }

    Api.forget_psw.submit(change_info)
        .done(function (_data) {
            setTimeout(function () {
                mui.openWindow({
                    url: 'reg_login.html',
                    id: 'reg'
                })
            }, 1000);
            return callback(_data.message);
        })
        .fail(function (err_msg, error) {
            console.log(err_msg);
        });
};

/**
 * 修改密码
 **/
owner.changePassword = function (change_info, callback) {
    callback = callback || $.noop;
    change_info = change_info || {};
    change_info.old_password = change_info.old_password || '';
    change_info.password0 = change_info.password0 || '';
    change_info.password1 = change_info.password1 || '';

    //加密
    change_info.old_password = jQuery.md5(change_info.old_password);
    change_info.password0 = jQuery.md5(change_info.password0);
    change_info.password1 = jQuery.md5(change_info.password1);

    Api.change_psw.submit(change_info)
        .done(function (_data) {
            console.log('in')
            setTimeout(function () {
                mui.openWindow({
                    url: 'reg_login.html',
                    id: 'reg'
                })
            }, 1000);
            return callback(_data.message);
        })
        .fail(function (err_msg, error) {
            console.log(err_msg);
        });
};