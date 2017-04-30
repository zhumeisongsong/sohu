Page.person = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            // render();
            bind();
        })
    };

    var bind = function () {
        //退出登录
        $('#logout').on('tap', function () {

            var btnArray = ['确定', '取消'];
            mui.confirm('你要退出当前账户，确认？', '', btnArray, function (e) {
                if (e.index === 0) {
                    Api.signout.fetch()
                        .done(function (_data) {
                            console.log(_data);
                            mui.toast('退出登录成功!');
                            window.location.href = '../index.html';
                            alert('out')
                        })
                        .fail(function (err_msg, error) {
                            console.log(err_msg);
                        });
                }
            })

        });
    };
    return {
        init: init
    };
})();