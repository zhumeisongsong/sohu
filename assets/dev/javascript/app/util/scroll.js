/*
 *scroll
 */
Util.scroll = function () {
    var scroll = function () {
        (function ($) {
            $.fn.myScroll = function (options) {
                //默认配置
                var defaults = {
                    speed: 40,  //滚动速度,值越大速度越慢
                    rowHeight: 24 //每行的高度
                };

                var opts = $.extend({}, defaults, options), intId = [];

                function marquee(obj, step) {

                    obj.find("section").animate({
                        marginTop: '-=1'
                    }, 0, function () {
                        var s = Math.abs(parseInt($(this).css("margin-top")));
                        if (s >= step) {
                            $(this).find("div").slice(0, 1).appendTo($(this));
                            $(this).css("margin-top", 0);
                        }
                    });
                }

                this.each(function (i) {
                    var sh = opts["rowHeight"], speed = opts["speed"], _this = $(this);
                    intId[i] = setInterval(function () {
                        if (_this.find("section").height() <= _this.height()) {
                            clearInterval(intId[i]);
                        } else {
                            marquee(_this, sh);
                        }
                    }, speed);

                    _this.hover(function () {
                        clearInterval(intId[i]);
                    }, function () {
                        intId[i] = setInterval(function () {
                            if (_this.find("section").height() <= _this.height()) {
                                clearInterval(intId[i]);
                            } else {
                                marquee(_this, sh);
                            }
                        }, speed);
                    });

                });

            }

        })(jQuery);
        var $container = $('#scroll_con');
        $container.myScroll({
            speed: 70, //数值越大，速度越慢
            rowHeight: 24 //li的高度
        });
    };
    return {
        scroll: scroll()
    }
};
