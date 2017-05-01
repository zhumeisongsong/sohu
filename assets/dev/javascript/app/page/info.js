Page.info = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            render()
            bind();
        })
    };
    var picker_sex = function () {
        var userPicker = new $.PopPicker();
        userPicker.setData([
            {
                value: 'male',
                text: '男'
            },
            {
                value: 'famal',
                text: '女'
            }
        ]);
        var showUserPickerButton = doc.getElementById('showUserPicker');
        var userResult = doc.getElementById('userResult');
        showUserPickerButton.addEventListener('tap', function (event) {
            userPicker.show(function (items) {
                userResult.innerText = JSON.stringify(items[0]);
                //返回 false 可以阻止选择框的关闭
                //return false;
            });
        }, false);
    };
    var render = function () {


    };

    var bind = function () {
        $('#info_btn').on('tap', function () {
            var name = $.trim($("#name").val());
            var weichat = $.trim($("#wechat").val());
            var sex;
            var location;
            var style;
            var address;



            var _option = {
                "weichat": weichat,
                "name": name,
                "address": address,
                "styles": style,
                "gender": sex,
                "regions ": location
            };

            Api.info.submit = function (_option) {

            };
        })
    };

    return {
        init: init
    }
})();
