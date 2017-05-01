Page.search = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {

            $('.search-btn').on('tap',function () {
                var val = $.trim($("#search").val());
                if(val==''){
                    mui.toast("请输入内容")
                }else{
                    Api.search.fetch(val)
                        .done(function (_data) {
                            console.log(_data)
                        })
                        .fail(function (err_msg, error) {
                            console.log(err_msg);
                            mui.toast("暂无搜索结果")
                        });
                }


            })

        });
    };
    return{
        init:init
    }
})();