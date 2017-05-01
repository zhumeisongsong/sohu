Page.change_psw = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            bind();
        })
    };

    var bind = function () {
        $('#change_psw').on('tap', function () {
            var email = $.trim($("#email").val());

            var reg_info = {
                "email": email
            };

            owner.reg(reg_info, function (err) {
                console.log(err);
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