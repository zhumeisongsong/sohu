Page.change= (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            bind();
        })
    };

    var bind = function () {
        $('#change_psw').on('tap', function () {
            var old_password = $.trim($("#old_password").val());
            var password0 = $.trim($("#password").val());
            var password1 = $.trim($("#password_confirm").val());

            var change_info = {
                "old_password": old_password,
                "password0": password0,
                "password1": password1
            };
            console.log(change_info)

            owner.changePassword(change_info, function (err) {
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