Api.form = function ($) {
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

    var submit = function (_option) {
        var $defer = $.Deferred();
        var options = {
            type: 'post',
            url: 'post_participator_info/',
            data: _option
        };
        Util.ajax(options).done(function (result) {
            $defer.resolve(result);
        }).fail(function (xhr) {
            $defer.reject(xhr);
        });
        return $defer.promise();
    };

    return {
        fetch: fetch,
        submit: submit
    };

}(jQuery);
