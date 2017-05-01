Page.input = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            Api.select.fetch()
                .done(function (_data) {
                    render(_data);
                    bind()
                })
                .fail(function (err_msg, error) {
                    console.log(err_msg);
                });
        });

        var render = function (_data) {
            console.log(_data);
            var template = Handlebars.compile($('#template_label_time').html());
            $('#time_con').html(template(_data.time));
        };

        var bind = function () {
            mui('#time_con').on('tap', '.label-btn', function () {
                var title = $(this).text();
                $('#time_con').find('.label-btn').removeClass('mui-red');
                $(this).addClass('mui-red');
                localStorage.setItem("time", title);
            });

            $('.submit-btn').on('tap', function () {
                event.stopPropagation();
                var total = $.trim($("#total").val());
                var time = localStorage.getItem("time");
                var pay_month = $.trim($("#pay_month").val());

                localStorage.setItem("total", total);
                localStorage.setItem("pay_month", pay_month);

                if (total && time && pay_month) {
                    var url = $(this).data('href');
                    mui.openWindow({
                        url: url,
                        id: 'select_score'
                    })
                } else {
                    mui.toast('您还没有填完奥～')

                }
            })
        }
    };
    return {
        init: init
    };
})();