Page.score = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            // var score = localStorage.getItem(select.score);
            var score = 3;
            var score_star = function (score) {
                var i = 0;
                var $score_key = $('.score-key');
                var $score_info = $('.score-info');
                var score_test = [
                    {
                        "key": "还不错",
                        "info": "快买个房子奔小康！"
                    },
                    {
                        "key": "超强",
                        "info": "财大气粗的主儿，成都70%新盘您随便选！"
                    },
                    {
                        "key": "无与伦比",
                        "info": "全城楼盘任您选，壕，我挑你肿么样！"
                    }
                ];
                for (i = 0; i < score; i++) {
                    $('.mui-icon-star').eq(i).addClass('mui-icon-star-filled')

                }
                $score_key.text(score_test[score - 3].key);
                $score_info.text(score_test[score - 3].info);
            };
            score_star(score);
            render();
        })
    };
    var render = function () {
    };
    return {
        init: init
    };
})();