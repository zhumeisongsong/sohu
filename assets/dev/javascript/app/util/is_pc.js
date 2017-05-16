Util.is_pc = function (pathname) {

    var render = function () {
        if ($(window).width() > 414) {
            $('.main').addClass('main-pc');
            if (pathname == Route.person) {
                $('.tab-con').removeClass('hidden');
                $('#user_info').find('a').attr('href', 'javascript:;');
                $('#user_like').find('a').attr('href', 'javascript:;');
                $('#change_psw').find('a').attr('href', 'javascript:;');
                Page.like.init();
                bind()
            }
        }
    };
    var list_status_change = function ($this) {
        $('.mui-table-view-cell').removeClass('is-active');
        $this.addClass('is-active');
    };
    var bind = function () {
        var $info = $('.page-info');
        var $change = $('.page-change-psw');
        var $like = $('.like-list');


        $('#user_info').click(function () {
            list_status_change($(this));
            $info.removeClass('hidden');
            $change.addClass('hidden');
            $like.addClass('hidden')
            Page.info.init();
        });

        $('#user_like').click(function () {
            list_status_change($(this));
            $like.removeClass('hidden');
            $change.addClass('hidden');
            $info.addClass('hidden')
        });

        $('#change_psw').click(function () {
            list_status_change($(this));
            $change.removeClass('hidden');
            $info.addClass('hidden');
            $like.addClass('hidden');
            Page.change.init();
        })
    };
    render();

};