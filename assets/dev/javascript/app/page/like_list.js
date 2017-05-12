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
            console.log(_data);
            if (_data.list.length > 0) {
                var template = Handlebars.compile($('#template_like_cell').html());
                $('#like_con').html(template(_data.list));
            } else {
                var div ='<div>暂无收藏</div>';

                $('.empty-con').css('height',$(window).height()).html(div);
            }
        };

        var delete_cell = function () {
            $('.delete-btn').on('tap', function () {
                var id = $(this).data('id');
                Api.like_set.fetch(id)
                    .done(function (_data) {
                        mui.toast('删除成功');
                        window.location.reload();
                    })
                    .fail(function (err_msg, error) {
                        console.log(err_msg);
                    });
            });
        };

        var bind = function () {
            Util.go_to_detail($('.like-cell'));
            delete_cell()
        }
    };
    return {
        init: init
    };

})();