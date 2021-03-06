Page.score = (function () {
    var init = function () {
        mui.init({
            pullRefresh: {
                container: '#pullrefresh',
                up: {
                    contentdown: '',
                    contentover: '',
                    contentrefresh: '',
                    contentnomore: '已经全部加载完',
                    callback: Util.refresh().pullupRefresh_building_select
                }
            }
        });
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
            price = '9000-11000'
        } else if (total > 80 && total <= 120) {
            score = 4;
            price = '11000-15000'
        } else if (total > 120) {
            score = 5;
            price = '20000以上'
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
        localStorage.setItem('price',price)

        if(localStorage.getItem('total')<50){
            $('.total-price-top').text(50);
        }else{
            $('.total-price-top').text(localStorage.getItem('total')+10);
        }

    };

    var render = function () {
        score_star();
        price();
    };
    return {
        init: init
    };
})();