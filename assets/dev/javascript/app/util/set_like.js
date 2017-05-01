Util.like=function ($dom) {
    var id = $dom.data('id');
    var status = $dom.data('status');
    console.log(id,status)

        Api.like_set.fetch(id)
            .done(function (_data) {
                console.log(_data);
                if(status){
                    $dom.addClass('is_like');
                    $dom.text('关注');
                    $dom.attr('data-status','false');
                }else{
                    $dom.removeClass('is_like');
                    $dom.text('取消');
                    $dom.attr('data-status','true');
                }

            })
            .fail(function (err_msg, error) {
                console.log(err_msg);
            });
};