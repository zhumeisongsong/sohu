Page.login = (function () {
    var init = function () {
        mui.init({
            pullRefresh: {
                container: '#pullrefresh',

                up: {
                    contentdown: '',
                    contentover: '',
                    contentrefresh: '',
                    callback: Util.refresh().pullupRefresh_building_select
                }
            }
        });
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
            owner.login(_option, function (err) {
                console.log(err);
                if (err) {
                    mui.toast(err);
                }
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