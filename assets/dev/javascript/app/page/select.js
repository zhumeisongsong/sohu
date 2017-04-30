Page.select = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            render();
        })
    };
    var render = function () {
        Util.go_to_detail($('.submit-btn'));
    };
    return {
        init: init
    };
})();