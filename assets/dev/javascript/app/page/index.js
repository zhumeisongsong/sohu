Page.index = (function () {
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
                    callback: Util.refresh().pullupRefresh_building
                }
            }
        });
        mui.ready(function () {
            Util.swiper();
            Api.banner.fetch()
                .done(function (_data) {
                    render_banner(_data);
                    bind_banner();
                })
                .fail(function (err_msg, error) {
                    console.log(err_msg);
                });

            Api.news.fetch()
                .done(function (_data) {
                    render_news(_data);
                    bind_news();
                })
                .fail(function (err_msg, error) {
                    console.log(err_msg);
                });

            mui('#pullrefresh').pullRefresh().pullupLoading();
            mui('#pullrefresh').pullRefresh().scrollTo(0, 0);
            window.scrollTo(0, 0);

            bind();
        })
    };

    var render_banner = function (_data) {
        var template = Handlebars.compile($('#template_banner').html());
        $('#banner_con').html(template(_data.list));
    };

    var render_news = function (_data) {
        var template = Handlebars.compile($('#template_news').html());
        $('#news_con').html(template(_data.list));
    };

    var bind_banner = function () {
        Util.go_to_detail($('.swiper-slide'));
    };

    var bind_news = function () {
        Util.go_to_detail($('.scroll-cell'));
        Util.scroll();
    };


    var bind = function () {
        $('.search-con').on('tap', function () {
            mui.openWindow({
                url: 'search.html',
                id: 'search'
            })
        });
    };

    return {
        init: init
    };

})();

