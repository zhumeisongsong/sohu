Page.search = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {

            $('.search-btn').on('tap',function () {
                Api.search.fetch()
                    .done(function (_data) {
                        console.log(_data)

                    })
                    .fail(function (err_msg, error) {
                        console.log(err_msg);
                    });
            })

        });
    };
    return{
        init:init
    }
})();