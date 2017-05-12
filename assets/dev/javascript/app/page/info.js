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
        var name = _data.user_info.name;
        var weichat = _data.user_info.weichat;
        var address = _data.user_info.address;
        var gender = _data.user_info.gender;
        var regions = _data.user_info.regions;
        var styles = _data.user_info.styles;

        if (name != null) {
            $('#name').val(name);
            localStorage.setItem('name', name);
        }
        if (weichat != null) {
            $('#wechat').val(weichat);
            localStorage.setItem('weichat', weichat);
        }
        if (address != null) {
            $('#address').val(address);
            localStorage.setItem('address', address);
        }
        if (gender != null) {
            $('#gender').val(gender);
            localStorage.setItem('gender', gender);
        }
        if (regions != null) {
            $('#location').val(regions);
            localStorage.setItem('regions', regions);
        }
        if (styles != null) {
            $('#type').val(styles);
            localStorage.setItem('styles', styles);
        }
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
                localStorage.setItem('regions', items[0].text);
                $('#location').val(localStorage.getItem('regions'));
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
                localStorage.setItem('styles', items[0].text);
                $('#type').val(localStorage.getItem('styles'));
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
                "styles": localStorage.getItem('styles'),
                "gender": localStorage.getItem('gender'),
                "regions": localStorage.getItem('regions'),
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
