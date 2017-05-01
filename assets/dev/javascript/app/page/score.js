Page.score = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            render();
            mui('#pullrefresh').pullRefresh().pullupLoading();
            mui('#pullrefresh').pullRefresh().scrollTo(0, 0);
            window.scrollTo(0, 0);
        })
    };

    var score_num = function () {
        var total = localStorage.getItem('total');
        var score;
        var price;

        if (total <= 80) {
            score = 3;
            price = '5000-15000'
        } else if (total > 80 && total <= 120) {
            score = 4;
            price = '8000-20000'
        } else if (total > 120) {
            score = 5;
            price = '10000-25000'
        }
        return {
            score: score,
            price: price
        };
    };

    var score_star = function () {
        var score = score_num().score;

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

        for (var i = 0; i < score; i++) {
            $('.mui-icon-star').eq(i).addClass('mui-icon-star-filled')
        }
        $score_key.text(score_test[score - 3].key);
        $score_info.text(score_test[score - 3].info);
    };

    var price = function () {
        var price = score_num().price;
        $('.pre-price-num').text(price);
        $('.total-price-top').text(localStorage.getItem('total'));
    };

    var render_building = function () {

    };

    var list = function () {

    };

    var render = function () {
        score_star();
        price();
    };
    return {
        init: init
    };
})();