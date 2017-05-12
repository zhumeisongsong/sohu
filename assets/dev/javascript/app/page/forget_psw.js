Page.forget = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            bind();
        })
    };
    var bind = function () {
        $('#forget_psw_btn').on('tap', function () {
            var email = $.trim($("#email").val());

            var _info = {
                "email": email,
                "user_id": owner.getState().user_id
            };

            owner.forgetPassword(_info, function (err) {
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