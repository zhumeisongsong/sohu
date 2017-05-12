Api.building = function ($) {
    var fetch = function (page) {
        var $defer = $.Deferred();
        var options = {
            type: 'post',
            url: 'bulidings/{0}/'.format(page),
            data:{
                "user_id":owner.getState().user_id
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