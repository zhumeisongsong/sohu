Api.news = function ($) {
    var fetch = function () {
        var $defer = $.Deferred();
        var options = {
            type: 'get',
            url: 'get_news'
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