Page.activity = (function () {
    var init = function () {
        mui.init({
            pullRefresh: {
                container: '#pullrefresh',
                down: {
                    contentdown: ' ',
                    contentover: ' ',
                    contentrefresh: ' ',
                    callback: Util.refresh().pulldownRefresh
                },
                up: {
                    contentdown: '',
                    contentover: '',
                    contentrefresh: '',
                    contentnomore:'已经全部加载完',
                    callback: Util.refresh().pullupRefresh_activity
                }
            }
        });
        mui.ready(function () {
            mui('#pullrefresh').pullRefresh().pullupLoading();
            mui('#pullrefresh').pullRefresh().scrollTo(0, 0);
            window.scrollTo(0, 0);
        });
    };
    return {
        init: init
    };

})();