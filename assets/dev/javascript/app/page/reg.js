Page.reg = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            bind();
        })
    };

    var bind = function () {
        $('#reg_btn').on('tap', function () {
            var phone = $.trim($("#phone").val());
            var email = $.trim($("#email").val());
            var password = $.trim($("#password").val());
            var password_confirm = $.trim($("#password_confirm").val());

            var reg_info = {
                "phone": phone,
                "email": email,
                "password": password,
                "password2": password_confirm
            };

            owner.reg(reg_info, function (err) {
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