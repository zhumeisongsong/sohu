Util.like = function ($dom, status) {
    var id = $dom.data('id');
    var status = $dom.data('status');
    Api.like_set.fetch(id)
        .done(function (_data) {
            console.log(_data);
            if (status) {
                $dom.removeClass('is-like');
                $dom.text('收藏');
                $dom.attr('data-status', 'false');
            } else {
                $dom.addClass('is-like');
                $dom.text('取消');
                $dom.attr('data-status', 'true');
            }

        })
        .fail(function (err_msg, error) {
            console.log(err_msg);
        });
};