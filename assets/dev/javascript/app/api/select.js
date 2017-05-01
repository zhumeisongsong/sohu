Api.select = function ($) {
    var fetch = function () {
        var $defer = $.Deferred();
        var options = {
            type: 'get',
            url: '../data/select.json'
        };
        Util.local_ajax(options).done(function (result) {
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