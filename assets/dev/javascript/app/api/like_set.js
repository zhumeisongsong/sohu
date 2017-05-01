Api.like_set = function ($) {
    var fetch = function (id) {
        var $defer = $.Deferred();
        var options = {
            type: 'post',
            url: 'set_liked/{0}/'.format(id),
            data: {
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