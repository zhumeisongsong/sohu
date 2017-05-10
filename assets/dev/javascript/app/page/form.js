Page.form = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            var id = window.location.href.match(".+/(.+?)([\?#;].*)?$")[1];

            Api.form_get.fetch(id)
                .done(function (_data) {
                    render(_data);
                    bind();
                })
                .fail(function (err_msg, error) {
                    console.log(err_msg);
                });
        });
    };

    var render = function (_data) {
        console.log(_data)
        $('#form_title').text(_data.title);
        $('#activity_form').attr('data-id', _data.activity_id);
        for (var i = 0; i < _data.list.length; i++) {
            var key = _data.list[i].name;
            console.log(key)
            if (key == '姓名') {
                $('.input-name').removeClass('hidden');
            } else if (key == '性别') {
                $('.input-sex').removeClass('hidden');
            } else if (key == '电话') {
                $('.input-phone').removeClass('hidden');
            } else if (key == '地址') {
                $('.input-address').removeClass('hidden');
            } else if (key == '微信号') {
                $('.input-wechat').removeClass('hidden');
            } else if (key == '生日') {
                $('.input-birthday').removeClass('hidden');
            } else if (key == '年龄') {
                $('.input-age').removeClass('hidden');
            } else if (key == '邮箱') {
                $('.input-email').removeClass('hidden');
            } else if (key == '职业') {
                $('.input-job').removeClass('hidden');
            } else if (key == '爱好') {
                $('.input-fever').removeClass('hidden');
            } else if (key == '身份证号') {
                $('.input-ID').removeClass('hidden');
            }

        }
    };
    var bind = function () {
        $('#form_btn').on('tap',function () {
            alert('in');
            Api.form_submit.submit(_option)
                .done(function (_data) {
                    render(_data);
                    bind();
                })
                .fail(function (err_msg, error) {
                    console.log(err_msg);
                });
        })
    };

    return {
        init: init
    }
})();