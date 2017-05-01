Api.like_list = function ($) {
    var fetch = function () {
        var $defer = $.Deferred();
        var options = {
            type: 'post',
            url: 'get_user_likes/',
            data:{
                'user_id': owner.getState().user_id
            }
        };
        Util.ajax(options).done(function (result) {
            $defer.resolve(result);
        }).fail(function (xhr) {
            $defer.reject(xhr);
        });
        return $defer.promise();
    };
    return {
        fetch: fetch
    };

}(jQuery);