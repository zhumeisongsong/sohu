Api.forget_psw = function ($) {
    var submit = function (_option) {
        var $defer = $.Deferred();
        var options = {
            type: 'post',
            url: 'forget',
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
        submit:submit
    };

}(jQuery);