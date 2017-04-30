Page.login = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            bind_form();
            bind()
        })
    };
    var bind_form = function () {
        $('#login').on('tap', function () {
            var phone = $.trim($("#account").val());
            var psw = $.trim($("#password").val());
            var _option = {
                "phone": phone,
                "password": psw
            };

            Api.login.fetch(_option)
                .done(function (_data) {
                    console.log('suu' + _data)
                })
                .fail(function (err_msg, error) {
                    console.log(err_msg);
                });
        })
    };
    var bind = function () {
        $('#reg').on('tap', function () {
            mui.openWindow({
                url: 'reg_register.html'
            })
        });

        $('#forget_psw').on('tap', function () {
            mui.openWindow({
                url: 'reg_forget.html'
            })
        })

    };
    return {
        init: init
    }
})();