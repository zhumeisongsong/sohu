Page.info = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            Api.info.fetch()
                .done(function (_data) {
                    console.log(_data)
                    render(_data)

                })
                .fail(function () {

                });
            bind();
        })
    };

    //fetch
    var render = function (_data) {
        $('#name').val(_data.user_info.name);
        $('#wechat').val(_data.user_info.weichat);
        $('#address').val(_data.user_info.address);

        $('#gender').val(_data.user_info.gender);
        $('#location').val(_data.user_info.regions);
        $('#type').val(_data.user_info.styles);
    };

    var picker_sex = function () {
        var picker = new mui.PopPicker();
        picker.setData([
            {text: '男'},
            {text: '女'}
        ]);
        var picker_btn = document.getElementById('gender');
        picker_btn.addEventListener('tap', function (event) {
            picker.show(function (items) {
                console.log(items)
                picker_btn.innerText = items[0].text;
                localStorage.setItem('gender', items[0].text);
                $('#gender').val(localStorage.getItem('gender'));
            });
        }, false);
    };

    var picker_location = function () {
        var picker = new mui.PopPicker();
        picker.setData([
            {
                text: "锦江"
            },
            {
                text: "青羊"
            },
            {
                text: "金牛"
            },
            {
                text: "武侯"
            },
            {
                text: "成华"
            },
            {
                text: "高新西区"
            },
            {
                text: "温江"
            },
            {
                text: "双流"
            },
            {
                text: "龙泉驿"
            },
            {
                text: "新都"
            },
            {
                text: "郫县"
            },
            {
                text: "都江堰"
            },
            {
                text: "青白江"
            },
            {
                text: "彭州"
            },
            {
                text: "浦江"
            },
            {
                text: "大邑"
            },
            {
                text: "新津"
            },
            {
                text: "崇州"
            },
            {
                text: "邛崃"
            },
            {
                text: "金堂"
            }
        ]);
        var picker_btn = document.getElementById('location');
        picker_btn.addEventListener('tap', function (event) {

            picker.show(function (items) {
                console.log(items);
                picker_btn.innerText = items[0].text;
                localStorage.setItem('location', items[0].text);
                $('#location').val(localStorage.getItem('location'));
            });
        }, false);
    };

    var picker_type = function () {
        var picker = new mui.PopPicker();
        picker.setData([
            {text: '普通住宅'},
            {text: '花园洋房'},
            {text: '别墅'},
            {text: '商铺'},
            {text: '写字楼'},
            {text: '公寓'}
        ]);
        var picker_btn = document.getElementById('type');
        picker_btn.addEventListener('tap', function (event) {
            picker.show(function (items) {
                picker_btn.innerText = items[0].text;
                localStorage.setItem('type', items[0].text);
                $('#type').val(localStorage.getItem('type'));
            });
        }, false);
    };


    var bind = function () {
        picker_sex();
        picker_location();
        picker_type();

        $('#info_btn').on('tap', function () {
            var name = $.trim($("#name").val());
            var wechat = $.trim($("#wechat").val());
            var address = $.trim($("#address").val());

            localStorage.setItem('name', name);
            localStorage.setItem('wechat', wechat);
            localStorage.setItem('address', address);

            var _option = {
                "weichat": localStorage.getItem('wechat'),
                "name": localStorage.getItem('name'),
                "address": localStorage.getItem('address'),
                "styles": localStorage.getItem('type'),
                "gender": localStorage.getItem('gender'),
                "regions": localStorage.getItem('location'),
                "user_id": owner.getState().user_id
            };
            console.log(_option);

            Api.info.submit(_option)
                .done(function (_data) {
                    console.log(_data);
                    mui.toast('资料提交成功')
                })
                .fail(function (err_msg, error) {
                    console.log(err_msg);
                });
        })
    };

    return {
        init: init
    }
})();
