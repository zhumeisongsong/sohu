Page.change= (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            bind();
        })
    };

    var bind = function () {
        $('#change_psw_btn').on('tap', function () {
            var old_password = $.trim($("#old_password").val());
            var password0 = $.trim($("#password").val());
            var password1 = $.trim($("#password_confirm").val());

            var _info = {
                "old_passwd": old_password,
                "password0": password0,
                "password1": password1,
                "user_id":owner.getState().user_id
            };

            owner.changePassword(_info, function (err) {
                if (err) {
                    mui.toast(err);
                }
            });
        })
    };

    return {
        init: init
    }
})();