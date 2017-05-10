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
            Util.swiper();
            Api.banner_activity.fetch()
                .done(function (_data) {
                    render_banner(_data);
                    bind_banner();
                })
                .fail(function (err_msg, error) {
                    console.log(err_msg);
                });

            Util.go_to_detail($('.swiper-slide'));

            mui('#pullrefresh').pullRefresh().pullupLoading();
            mui('#pullrefresh').pullRefresh().scrollTo(0, 0);
            window.scrollTo(0, 0);
        });
    };

    var render_banner =function(_data){
        console.log(_data);
        var template = Handlebars.compile($('#template_banner').html());
        $('#banner_con').html(template(_data.list));
    };
    var bind_banner = function () {
        Util.go_to_detail($('.swiper-slide'));
    };
    return {
        init: init
    };

})();