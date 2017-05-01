Page.select = (function () {
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
            console.log(_data)
            var template_perpose = Handlebars.compile($('#template_label_perpose').html());
            $('#perpose_con').html(template_perpose(_data.perpose));

            var template_location = Handlebars.compile($('#template_label_location').html());
            $('#location_con').html(template_location(_data.location));

            var template_area = Handlebars.compile($('#template_label_area').html());
            $('#area_con').html(template_location(_data.area));
        };
        var bind = function () {
            mui('#perpose_con').on('tap', '.label-btn', function () {
                var title = $(this).text();
                $('#perpose_con').find('.label-btn').removeClass('mui-red');
                $(this).addClass('mui-red');
                localStorage.setItem("perpose", title);
            });

            mui('#location_con').on('tap', '.label-btn', function () {
                var title = $(this).text();
                $('#location_con').find('.label-btn').removeClass('mui-red');
                $(this).addClass('mui-red');
                localStorage.setItem("location", title);
            });

            mui('#area_con').on('tap', '.label-btn', function () {
                var title = $(this).text();
                $('#area_con').find('.label-btn').removeClass('mui-red');
                $(this).addClass('mui-red');
                localStorage.setItem("area", title);
            });

            $('.submit-btn').on('tap', function () {
                event.stopPropagation();
                var perpose = localStorage.getItem("perpose");
                var location = localStorage.getItem("location");
                var area = localStorage.getItem("area");
                console.log(perpose, location, area);
                if (perpose && location && area) {
                    var url = $(this).data('href');
                    mui.openWindow({
                        url: url,
                        id: 'select_input'
                    })
                } else {
                    mui.toast('您还没有选完奥～')
                }
            })
        }
    };
    return {
        init: init
    };
})();