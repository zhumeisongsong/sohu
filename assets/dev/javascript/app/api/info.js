Api.info = function ($) {
    var fetch = function () {
        var $defer = $.Deferred();
        var options = {
            type: 'post',
            url: 'user_info/',
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

    var submit = function (_option) {
        var $defer = $.Deferred();
        var options = {
            type: 'post',
            url: 'set_user_info/',
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