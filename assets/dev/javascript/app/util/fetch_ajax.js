/*
 * fetch
 */

Util.ajax = function (_option) {
    var baseUrl = _option.url;
    var query = {};
    var $defer = $.Deferred();
    $.extend(query, _option.params);
    if (_option.params) {
        baseUrl = baseUrl + '?' + $.param(query);
    }
    var opt = {
        url: API_host.path_join(baseUrl),
        type: _option.type,
        data: _option.data,
        timeout: 10000,
        success: $defer.resolve,
        error: $defer.reject
    };
    $.ajax(opt);
    return $defer.promise();
};