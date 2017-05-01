Api.form_get = function ($) {
    var fetch = function (id) {
        var $defer = $.Deferred();
        var options = {
            type: 'get',
            url: 'get_collect_items/{0}/'.format(id)
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
