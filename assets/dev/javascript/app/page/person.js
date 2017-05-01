Page.person = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            render()
            bind();
        })
    };
    var render = function () {
      $('#user_name').text(owner.getState().user_id)
    };

    var bind = function () {
        //logout
        $('#logout').on('tap', function () {

            var btnArray = ['确定', '取消'];
            mui.confirm('你要退出当前账户，确认？', '', btnArray, function (e) {
                if (e.index === 0) {
                    Api.signout.fetch()
                        .done(function (_data) {
                            mui.toast('退出登录成功');
                            owner.remove();
                            console.log(owner.getState());
                            setTimeout(function () {
                                mui.openWindow({
                                    url: 'index.html'
                                })
                            }, 1000)
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