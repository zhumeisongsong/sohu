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
owner.remove = function ($state) {
    // var stateText = localStorage.getItem('$state') || "{}";
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
owner.createState = function (account, nickName, tokenKey, callback) {
    var state = owner.getState();
    state.account = account;
    owner.setState(state);
    return callback('登录成功!');
};

//手机号check
var checkPhone = function (phone_num) {
    var phonereg = /^((\d{3,4}-)?\d{7,8})?(1[3587]\d{9})?$/;
    if (!phonereg.exec(phone_num)) {
        return false;
    }

    if (phone_num.length < 11) {
        return false;
    }
};

/**
 * 用户登录
 **/
owner.login = function (loginInfo, callback) {
    callback = callback || $.noop;
    loginInfo = loginInfo || {};
    loginInfo.phone = loginInfo.phone || '';
    loginInfo.password = loginInfo.password || '';

    checkPhone(loginInfo.phoneNum);
    if (checkPhone(loginInfo.phoneNum) === false) {
        return callback("请填写正确的手机号码");
    }

    if (loginInfo.password.length < 6) {
        return callback('密码最短为 6 个字符');
    }
    //加密
    loginInfo.password = jQuery.md5(loginInfo.password);

    $.ajax(API_host.path_join('/user/login'), {
        data: loginInfo,
        dataType: 'json', //服务器返回json格式数据
        type: 'post', //HTTP请求类型
        timeout: 10000, //超时时间设置为10秒；
        success: function (obj) {
            if (obj && obj.status == 'U000') {
                //写入本地缓存
                owner.createState(loginInfo.phoneNum, obj.data.nickName, obj.data.tokenKey, callback);

                //登录成功后关闭
                plus.webview.getLaunchWebview().show("pop-in", 200, function () {
                    plus.webview.currentWebview().close("none");
                });
                var Scanner = plus.webview.getWebviewById('tab-person.html');
                //触发前往页面的自定义事件,从而进行数据刷新
                mui.fire(Scanner, 'profile_refresh');

            } else {
                return callback(obj.msg);
            }
        },
        error: function (xhr, type, errorThrown) {
            //异常处理；
            app_error('wireless');
        }
    });
};

/**
 * 新用户注册
 **/
owner.reg = function (regInfo, callback) {
    callback = callback || $.noop;
    regInfo = regInfo || {};
    regInfo.phoneNum = regInfo.phoneNum || '';
    regInfo.password = regInfo.password || '';
    regInfo.phoneVerificationCode = regInfo.phoneVerificationCode || '';

    if (regInfo.password.length < 6) {
        return callback('密码最短为 6 个字符');
    }

    //md5加密
    regInfo.password = jQuery.md5(regInfo.password);

    // 调用注册API
    $.ajax({
        url: API_host.path_join('/user/register'),
        type: 'post',
        dataType: 'json',
        data: regInfo,
        timeout: 10000,
        success: function (data) {
            if (data && data.status == 'U000') {
                //发送成功
                mui.toast(data.msg);
                call_login()
            } else {
                return callback(data.msg);
            }
        },
        error: function (xhr, type, errorThrown) {
            app_error('wireless');
        }

    });

    return callback();
};

/**
 * 忘记密码
 **/
owner.forgetPassword = function (changeInfo, callback) {
    callback = callback || $.noop;
    changeInfo = changeInfo || {};
    changeInfo.phone = changeInfo.phone || '';
    changeInfo.password = changeInfo.password || '';
    //md5加密
    changeInfo.password = jQuery.md5(changeInfo.password);
    $.ajax(API_host.path_join('user/retrievePassword'), {
        data: changeInfo,
        dataType: 'json', //服务器返回json格式数据
        type: 'post', //HTTP请求类型
        timeout: 10000, //超时时间设置为10秒；
        success: function (obj) {
            if (obj && obj.status === 'U000') {
                //发送成功
                mui.toast(obj.msg);
                call_login();
                jQuery('#password').val('');
                jQuery('#password_confirm').val('');
                jQuery('#phone_number').val('');
                jQuery('#verifyCode').val('');

            } else {
                return callback(obj.msg);
            }
        },
        error: function (xhr, type, errorThrown) {

        }
    });
    return callback();
};

/**
 * 修改密码
 **/
owner.changePassword = function (changeInfo, callback) {
    callback = callback || $.noop;
    changeInfo = changeInfo || {};
    changeInfo.password = changeInfo.password || '';
    changeInfo.newPassword = changeInfo.newPassword || '';

    //加密
    changeInfo.password = jQuery.md5(changeInfo.password);
    changeInfo.newPassword = jQuery.md5(changeInfo.newPassword);

    var _option = {

    };

    $.ajax(API_host.path_join('user/changepassword'), {
        data: changeInfo,
        dataType: 'json', //服务器返回json格式数据
        type: 'post', //HTTP请求类型
        timeout: 10000, //超时时间设置为10秒；
        success: function (obj) {
            if (obj && obj.status == 'U000') {
                //发送成功
                mui.toast(obj.msg);
                localStorage.removeItem('$state');
                call_login();
                $('#password').val('');
                $('#password_confirm').val('');
                $('#old_password').val('');

            } else if (obj && obj.status == 'U168') {
                mui.toast(obj.msg);
                call_login()
            } else {
                return callback(obj.msg);
            }
        },
        error: function (xhr, type, errorThrown) {
            //异常处理；
            app_error('wireless');
        }
    });
    return callback();
};
