Api.search = function ($) {
    var fetch = function (val) {
        var $defer = $.Deferred();
        var options = {
            type: 'get',
            url: 'search_building/',
            data:{
                "q":val
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