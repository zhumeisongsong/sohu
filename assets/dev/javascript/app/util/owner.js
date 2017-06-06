/**
 * 获取当前状态
 **/
owner.getState = function () {
    var stateText = localStorage.getItem('$state') || "{}";
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

    if (login_info.phone=='' || login_info.password=='') {
        return callback("请填写完整");
    }

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
            owner.createState(login_info.phone, callback);
            setTimeout(function () {
                mui.openWindow({
                    url: 'person.html',
                    id: 'person'
                })
            }, 1000);
            return callback('登录成功');
        })
        .fail(function (err_msg, error) {
            console.log(err_msg);
            return callback(err_msg.responseText)
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

    if (reg_info.phone=='' || reg_info.email=='' || reg_info.password=='' || reg_info.password2=='') {
        return callback("请填写完整");
    }

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
                    url: 'person.html',
                    id: 'person'
                })
            }, 1000);
            return callback('注册成功');
        })
        .fail(function (err_msg, error) {
            console.log(err_msg);
            return callback(err_msg.responseText)
        });
};

/**
 * 忘记密码
 **/
owner.forgetPassword = function (_info, callback) {
    callback = callback || $.noop;
    _info = _info || {};
    _info.email = _info.email || '';

    if(_info.email==''){
        return callback("请填写完整");
    }

    if (!owner.check_email(_info.email)) {
        return callback("请填写正确的邮箱");
    }

    Api.forget_psw.submit(_info)
        .done(function (_data) {
            return callback('邮件已发送，请查收');
        })
        .fail(function (err_msg, error) {
            console.log(err_msg);
            return callback(err_msg.responseText)
        });
};

/**
 * 修改密码
 **/
owner.changePassword = function (_info, callback) {

    callback = callback || $.noop;
    _info = _info || {};
    _info.old_passwd = _info.old_passwd || '';
    _info.password0 = _info.password0 || '';
    _info.password1 = _info.password1 || '';

    if (_info.old_passwd == "" || _info.password0 == "" || _info.password1 == "") {
        return callback("请填写完整")
    }

    if (_info.password0.length < 8||_info.password1.length<8||_info.old_passwd.length<8) {
        return callback('密码最短为8个字符');
    }

    if (_info.password0 != _info.password1) {
        return callback('两次密码输入不一致');
    }
    if (_info.password0 == _info.old_passwd) {
        return callback('新旧密码一致，请修改');
    }

    //加密
    _info.old_passwd = jQuery.md5(_info.old_passwd);
    _info.password0 = jQuery.md5(_info.password0);
    _info.password1 = jQuery.md5(_info.password1);


    Api.change_psw.submit(_info)
        .done(function (_data) {
            setTimeout(function () {
                mui.openWindow({
                    url: 'reg_login.html',
                    id: 'reg'
                })
            }, 1000);
            return callback(_data);
        })
        .fail(function (err_msg, error) {
            console.log(err_msg);
            return callback(err_msg.responseText)
        });
};