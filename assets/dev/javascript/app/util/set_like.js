Util.like = function ($dom) {
    var id = $dom.data('id');
    Api.like_set.fetch(id)
        .done(function (_data) {
            console.log(_data);
            if (_data.match('成功') != null) {
                $dom.addClass('is-like');
                $dom.text('取消');
            } else {
                $dom.removeClass('is-like');
                $dom.text('收藏');
            }
        })
        .fail(function (err_msg, error) {
            console.log(err_msg);
        });
};