Page.like = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            Api.like_list.fetch()
                .done(function (_data) {
                    render(_data);
                    bind();
                })
                .fail(function (err_msg, error) {
                    console.log(err_msg);
                });
        });
        var render = function (_data) {
            console.log(_data)
            var template ;
        };

        var bind = function () {
            Util.go_to_detail($('.like-cell'))
        }
    };
    return {
        init: init
    };

})();