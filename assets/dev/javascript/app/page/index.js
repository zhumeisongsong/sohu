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
                    callback: Util.refresh().pullupRefresh
                }
            }
        });
        mui.ready(function () {
            Util.swiper();
            // Api.banner.fetch()
            //     .done(function (_data) {
            //         render_banner(_data);
                    bind();
            //     })
            //     .fail(function (err_msg, error) {
            //         console.log(err_msg);
            //     });
        })
    };

    var render_banner = function (_data) {

        console.log(_data.banner);
        var template = Handlebars.compile($('#template_banner').html());
        $('.banner-con').html(template(_data.banner));
    };

    var bind = function () {
        Util.scroll();

        $('.search-con').on('tap',function () {
           mui.openWindow({
               url:'search.html',
               id:'search'
           })
        });

        Util.go_to_detail($('.swiper-slide'));
        Util.go_to_detail($('.scroll-cell'));
        Util.go_to_detail($('.list-tap'));
    };
    return {
        init: init
    };

})();

