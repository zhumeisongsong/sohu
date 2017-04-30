Api.building_select = function ($) {
    var fetch = function( _option) {
        var $defer    = $.Deferred();
        var options = {
            url: 'buildings_condition',
            type: 'post',
            data: _option.data
        };
        Util.ajax(options).done(function(result) {
                $defer.resolve(result);
        }).fail(function(xhr) {
            $defer.reject(xhr);
        });
        return $defer.promise();
    };

    return {
        fetch: fetch
    };

}(jQuery);