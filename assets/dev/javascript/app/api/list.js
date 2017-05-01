Api.activity = function ($) {
    var fetch = function (page) {
        var $defer = $.Deferred();
        var options = {
            type: 'get',
            url: 'get_activitys/{0}'.format(page)
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