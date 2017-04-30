(function(window, document, undefined) {
'use strict';
var App = window.App = {};
var Util = App.Util = {};
var Api = App.Api = {};

var Config = App.Config = {};
var Page = App.Page = {};
var owner = App.owner = {};

var Route = App.Route = {
    top: 'index.html',
    select: 'select.html',
    activity: 'list.html',
    person: 'person.html',

    score: 'select_score.html',
    input: 'select_input.html',

    reg: 'reg_register.html',
    login: 'reg_login.html',
    forget: 'reg_forget.html',
    change: 'reg_change.html',
    like: 'reg_like.html'
};

/*
 * on domContentLoaded
 */
$(function () {
    var pathname = window.location.href.match(".+/(.+?)([\?#;].*)?$")[1];
    //nav active
    console.log(pathname);
    Util.active(pathname);

    /*
     * all
     */
    Util.dispatcher('.', function () {
        Page.all.init();
    });

    /*
     * each page
     */
    if (pathname == Route.top) {
        Util.dispatcher(Route.top, function () {
            Config.currentPage = Route.top;
            Page.index.init();
        });
    }
    else if (pathname == Route.activity) {
        Util.dispatcher(Route.activity, function () {
            Config.currentPage = Route.activity;
            Page.activity.init();
        });
    }
    else if (pathname == Route.select) {
        Util.dispatcher(Route.select, function () {
            Config.currentPage = Route.select;
            Page.select.init();
        });
    }
    else if (pathname == Route.input) {
        Util.dispatcher(Route.input, function () {
            Config.currentPage = Route.input;
            Page.input.init();
        });
    }
    else if (pathname == Route.score) {
        Util.dispatcher(Route.score, function () {
            Config.currentPage = Route.score;
            Page.score.init();
        });
    }
    else if (pathname == Route.person) {
        Util.dispatcher(Route.person, function () {
            Config.currentPage = Route.person;
            Page.person.init();
        });
    }
    else if (pathname == Route.login) {
        Util.dispatcher(Route.login, function () {
            Config.currentPage = Route.login;
            Page.login.init();
        });
    }
    else if (pathname == Route.login) {
        Util.dispatcher(Route.login, function () {
            Config.currentPage = Route.login;
            Page.login.init();
        });
    }
    else if (pathname == Route.reg) {
        Util.dispatcher(Route.reg, function () {
            Config.currentPage = Route.reg;
            Page.reg.init();
        });
    }
    else if (pathname == Route.forget) {
        Util.dispatcher(Route.forget, function () {
            Config.currentPage = Route.forget;
            Page.forget.init();
        });
    }
    else if (pathname == Route.change) {
        Util.dispatcher(Route.change, function () {
            Config.currentPage = Route.change;
            Page.change.init();
        });
    }


    // dispatch
    Util.dispatcher(pathname);
});

var host = 'http://119.23.27.133:8102/';
var API_root = 'main';

// var host = 'localhost:3000/';
// var API_root = '';
var API_host = host + API_root;

/*
 *active
 */
Util.active = function (pathname) {
    if (pathname == Route.top) {
        $('.img-index').addClass('item-active')
    } else if (pathname == Route.activity) {
        $('.img-activities').addClass('item-active')
    } else if (pathname == Route.select) {
        $('.img-select').addClass('item-active')
    } else if (pathname == Route.person) {
        $('.img-person').addClass('item-active')
    }
};

Util.call_login = function ($dom, str) {
    var user_id = localStorage.getItem('user_id');

    if (user_id == undefined) {
        $dom.attr('href', 'reg_login.html');
        console.log(user_id);
    } else {
        if (str == 'select') {
            $dom.attr('href', 'select.html');
            console.log(user_id);
        } else if (str == 'person') {
            $dom.attr('href', 'person.html');
            console.log(user_id);
        } else if (str == 'like') {

        } else if (str == 'list_cell') {

        }
    }
};

/*
 * dispatcher
 */
Util.dispatcher = function (path, callback) {
    this.path_func = this.path_func || [];

    if (callback) return this.path_func.push([path, callback]);

    for (var i = 0, l = this.path_func.length; i < l; ++i) {
        var func = this.path_func[i];
        var match = path.match(func[0]);
        match && func[1](match);
    }
};

/*
 * fetch
 */

Util.ajax = function (_option) {
    var baseUrl = _option.url;
    var query = {};
    var $defer = $.Deferred();
    $.extend(query, _option.params);
    if (_option.params) {
        baseUrl = baseUrl + '?' + $.param(query);
    }
    var opt = {
        url: API_host.path_join(baseUrl),
        type: _option.type,
        dataType: 'json',
        data: _option.data,
        success: $defer.resolve,
        error: $defer.reject
    };
    $.ajax(opt);
    return $defer.promise();
};

Handlebars.registerHelper("cover_img", function (cover) {
    var image = API_host.path_join(cover);
    console.log(image);
    return image
});

Handlebars.registerHelper("location_trans", function (location) {
    var image = API_host.path_join(cover);
    console.log(image);
    return image
});

/**
 * 获取当前状态
 **/
owner.getState = function () {
    var stateText = localStorage.getItem('$state') || "{}";
    return JSON.parse(stateText);
};

/**
 * 清空当前状态
 **/
owner.remove = function ($state) {
    // var stateText = localStorage.getItem('$state') || "{}";
    localStorage.removeItem('$state');
};

/**
 * 写入当前状态
 **/
owner.setState = function (state) {
    state = state || {};
    localStorage.setItem('$state', JSON.stringify(state));
};

/**
 * 创建当前状态
 **/
owner.createState = function (account, nickName, tokenKey, callback) {
    var state = owner.getState();
    state.account = account;
    owner.setState(state);
    return callback('登录成功!');
};

//手机号check
var checkPhone = function (phone_num) {
    var phonereg = /^((\d{3,4}-)?\d{7,8})?(1[3587]\d{9})?$/;
    if (!phonereg.exec(phone_num)) {
        return false;
    }

    if (phone_num.length < 11) {
        return false;
    }
};

/**
 * 用户登录
 **/
owner.login = function (loginInfo, callback) {
    callback = callback || $.noop;
    loginInfo = loginInfo || {};
    loginInfo.phone = loginInfo.phone || '';
    loginInfo.password = loginInfo.password || '';

    checkPhone(loginInfo.phoneNum);
    if (checkPhone(loginInfo.phoneNum) === false) {
        return callback("请填写正确的手机号码");
    }

    if (loginInfo.password.length < 6) {
        return callback('密码最短为 6 个字符');
    }
    //加密
    loginInfo.password = jQuery.md5(loginInfo.password);

    $.ajax(API_host.path_join('/user/login'), {
        data: loginInfo,
        dataType: 'json', //服务器返回json格式数据
        type: 'post', //HTTP请求类型
        timeout: 10000, //超时时间设置为10秒；
        success: function (obj) {
            if (obj && obj.status == 'U000') {
                //写入本地缓存
                owner.createState(loginInfo.phoneNum, obj.data.nickName, obj.data.tokenKey, callback);

                //登录成功后关闭
                plus.webview.getLaunchWebview().show("pop-in", 200, function () {
                    plus.webview.currentWebview().close("none");
                });
                var Scanner = plus.webview.getWebviewById('tab-person.html');
                //触发前往页面的自定义事件,从而进行数据刷新
                mui.fire(Scanner, 'profile_refresh');

            } else {
                return callback(obj.msg);
            }
        },
        error: function (xhr, type, errorThrown) {
            //异常处理；
            app_error('wireless');
        }
    });
};

/**
 * 新用户注册
 **/
owner.reg = function (regInfo, callback) {
    callback = callback || $.noop;
    regInfo = regInfo || {};
    regInfo.phoneNum = regInfo.phoneNum || '';
    regInfo.password = regInfo.password || '';
    regInfo.phoneVerificationCode = regInfo.phoneVerificationCode || '';

    if (regInfo.password.length < 6) {
        return callback('密码最短为 6 个字符');
    }

    //md5加密
    regInfo.password = jQuery.md5(regInfo.password);

    // 调用注册API
    $.ajax({
        url: API_host.path_join('/user/register'),
        type: 'post',
        dataType: 'json',
        data: regInfo,
        timeout: 10000,
        success: function (data) {
            if (data && data.status == 'U000') {
                //发送成功
                mui.toast(data.msg);
                call_login()
            } else {
                return callback(data.msg);
            }
        },
        error: function (xhr, type, errorThrown) {
            app_error('wireless');
        }

    });

    return callback();
};

/**
 * 忘记密码
 **/
owner.forgetPassword = function (changeInfo, callback) {
    callback = callback || $.noop;
    changeInfo = changeInfo || {};
    changeInfo.phone = changeInfo.phone || '';
    changeInfo.password = changeInfo.password || '';
    //md5加密
    changeInfo.password = jQuery.md5(changeInfo.password);
    $.ajax(API_host.path_join('user/retrievePassword'), {
        data: changeInfo,
        dataType: 'json', //服务器返回json格式数据
        type: 'post', //HTTP请求类型
        timeout: 10000, //超时时间设置为10秒；
        success: function (obj) {
            if (obj && obj.status === 'U000') {
                //发送成功
                mui.toast(obj.msg);
                call_login();
                jQuery('#password').val('');
                jQuery('#password_confirm').val('');
                jQuery('#phone_number').val('');
                jQuery('#verifyCode').val('');

            } else {
                return callback(obj.msg);
            }
        },
        error: function (xhr, type, errorThrown) {

        }
    });
    return callback();
};

/**
 * 修改密码
 **/
owner.changePassword = function (changeInfo, callback) {
    callback = callback || $.noop;
    changeInfo = changeInfo || {};
    changeInfo.password = changeInfo.password || '';
    changeInfo.newPassword = changeInfo.newPassword || '';

    //加密
    changeInfo.password = jQuery.md5(changeInfo.password);
    changeInfo.newPassword = jQuery.md5(changeInfo.newPassword);

    var _option = {

    };

    $.ajax(API_host.path_join('user/changepassword'), {
        data: changeInfo,
        dataType: 'json', //服务器返回json格式数据
        type: 'post', //HTTP请求类型
        timeout: 10000, //超时时间设置为10秒；
        success: function (obj) {
            if (obj && obj.status == 'U000') {
                //发送成功
                mui.toast(obj.msg);
                localStorage.removeItem('$state');
                call_login();
                $('#password').val('');
                $('#password_confirm').val('');
                $('#old_password').val('');

            } else if (obj && obj.status == 'U168') {
                mui.toast(obj.msg);
                call_login()
            } else {
                return callback(obj.msg);
            }
        },
        error: function (xhr, type, errorThrown) {
            //异常处理；
            app_error('wireless');
        }
    });
    return callback();
};

/*
 *refresh
 */
Util.refresh = function () {
    /**
     * 下拉刷新具体业务实现
     */
    var pulldownRefresh = function () {
        window.location.reload();
        mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
    };
    var count = 0;
    /**
     * 上拉加载具体业务实现
     */
    var pullupRefresh = function () {

        //list_old = content_list;
        var up_count = 3;
        mui('#pullrefresh').pullRefresh().endPullupToRefresh((++count > up_count)); //参数为true代表没有更多数据了。
    };
    return {
        pullupRefresh: pullupRefresh,
        pulldownRefresh: pulldownRefresh
    }
};

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

/*
 * String helper
 */
Util.string = (function () {
    return {
        path_join: function () {
            String.prototype.path_join = function () {
                var current = this,
                    args = Array.prototype.slice.call(arguments);

                args.forEach(function (elem, i) {

                    var ending = current[current.length - 1],
                        starting = elem[0];

                    if (ending !== '/')
                        current = current + '/';

                    if (starting === '/')
                        current += elem.substring(1);
                    else
                        current += elem
                });

                return current
            };
        },
        format: function () {
            String.prototype.format = function () {
                var formatted = this;
                for (var i = 0; i < arguments.length; i++) {
                    var regexp = new RegExp('\\{' + i + '\\}', 'gi');
                    formatted = formatted.replace(regexp, arguments[i])
                }
                return formatted
            };
        },
        insert: function () {
            Array.prototype.insert = function (index, item) {
                this.splice(index, 0, item);
            };
        }
    }

})();

/*
 *swiper
 */
Util.swiper = function () {
    var swiper_init = function () {
        var mySwiper = new Swiper('.swiper-container', {
            autoplay: 5000,
            pagination: '.swiper-pagination',
            // loop : true,
            preloadImages: false,
            updateOnImagesReady: true,
            observer: true,
            observeParents: true,
            lazyLoading: true,
            lazyLoadingOnTransitionStart: true,
            lazyLoadingInPrevNext: true
        })
    };
    return {
        swiper_init: swiper_init()
    }
};

/*
 *detail
 */
Util.go_to_detail = function ($cell) {
    $cell.on('tap', function () {
        event.stopPropagation();
        var url = $(this).data('href');
        mui.openWindow({
            url: url,
            id: 'detail'
        })
    });
};

Util.url = (function () {

    return {
        /*
         * @param {Object} hash
         */
        getHash: function () {
            var path = location.hash,
                hash = {},
                param = [],
                tmp = [];
            if (!path || !/^\#.*=.*/.test(path)) {
                return hash;
            }

            path = path.substr(1);
            param = path.split(/&/g);

            _.each(param, function (item) {
                tmp = item.split(/=/);
                hash[tmp[0]] = decodeURI(tmp[1]);
                // query[tmp[0]] = tmp[1];
            });

            return hash;
        },

        /*
         * @param {String} path
         * @param {Object} query
         */
        getQuery: function (path) {
            var query = {},
                param = [],
                tmp = [];

            if (!path || !/^\?.*=.*/.test(path)) {
                return query;
            }

            path = path.substr(1);
            param = path.split(/&/g);

            _.each(param, function (item, index) {
                tmp = item.split(/=/);
                query[tmp[0]] = decodeURI(tmp[1]);
                // query[tmp[0]] = tmp[1];
            });

            return query;
        },
        /*
         * @param {Object} query
         * @param {String} path
         */
        setQuery: function (query) {
            var path = "?";
            _.each(query, function (value, key, index) {
                path += key + '=' + value + '&';
            });
            path = path.substr(0, (path.length - 1));
            return path;
        },


        getLastPath: function () {
            return location.pathname.split('/').pop();
        },

        /*
         *
         */
        concatPath: function (path1, path2) {
            var path1Flag = path1.substr(-1, 1) === '/' ? true : false,
                path2Flag = path2.substr(0, 1) === '/' ? true : false,
                concatPath = '';

            if (path1Flag === true && path2Flag === true) {
                concatPath = path1 + path2.substr(1);
            } else if (path1Flag === true || path2Flag === true) {
                concatPath = path1 + path2;
            } else {
                concatPath = path1 + '/' + path2;
            }

            return concatPath;
        }

    };
})();

Api.banner = function ($) {
    var fetch = function () {
        var $defer = $.Deferred();
        var options = {
            type: 'get',
            url: 'get_banners'
        };
        Util.ajax(options).done(function (result) {
            $defer.resolve(result);
        }).fail(function (xhr) {
            $defer.reject(xhr);
        });
        return $defer.promise();
    };
    return {
        fetch: fetch
    };

}(jQuery);

Api.building = function ($) {
    var fetch = function () {
        var $defer = $.Deferred();
        var options = {
            type: 'get',
            url: 'bulidings/1/'
        };
        Util.ajax(options).done(function (result) {
            $defer.resolve(result);
        }).fail(function (xhr) {
            $defer.reject(xhr);
        });
        return $defer.promise();
    };

    return {
        fetch: fetch
    };


}(jQuery);

Api.building_select = function ($) {
    var fetch = function (_option) {
        var $defer = $.Deferred();
        var options = {
            url: 'buildings_condition',
            type: 'post',
            data: _option.data
        };
        Util.ajax(options).done(function (result) {
            $defer.resolve(result);
        }).fail(function (xhr) {
            $defer.reject(xhr);
        });
        return $defer.promise();
    };

    return {
        fetch: fetch
    };

}(jQuery);

Api.change_psw = function ($) {
    var submit = function (_option) {
        var $defer = $.Deferred();
        var options = {
            type: 'post',
            url: 'change_password',
            data: _option
        };

        Util.ajax(options).done(function (result) {
            $defer.resolve(result);
        }).fail(function (xhr) {
            $defer.reject(xhr);
        });
        return $defer.promise();
    };

    return {
        submit:submit
    };
}(jQuery);

Api.forget_psw = function ($) {
    var submit = function (_option) {
        var $defer = $.Deferred();
        var options = {
            type: 'post',
            url: 'forget',
            data: _option
        };
        Util.ajax(options).done(function (result) {
            $defer.resolve(result);
        }).fail(function (xhr) {
            $defer.reject(xhr);
        });
        return $defer.promise();
    };

    return {
        submit:submit
    };

}(jQuery);

/**
 * Created by songzhumei on 17/4/29.
 */

Api.news = function ($) {
    var fetch = function () {
        var $defer = $.Deferred();
        var options = {
            type: 'get',
            url: 'get_news'
        };
        Util.ajax(options).done(function (result) {
            $defer.resolve(result);
        }).fail(function (xhr) {
            $defer.reject(xhr);
        });
        return $defer.promise();
    };
    return {
        fetch: fetch
    };

}(jQuery);

Api.login = function ($) {
    var submit = function (_option) {
        var $defer = $.Deferred();
        var options = {
            type: 'post',
            url: 'signin',
            data: _option
        };
        Util.ajax(options).done(function (result) {
            $defer.resolve(result);
        }).fail(function (xhr) {
            $defer.reject(xhr);
        });
        return $defer.promise();
    };

    return {
        submit:submit
    };

}(jQuery);

Api.signout = function ($) {
    var fetch = function () {
        var $defer = $.Deferred();
        var options = {
            type: 'get',
            url: 'signout'
        };
        Util.ajax(options).done(function (result) {
            $defer.resolve(result);
        }).fail(function (xhr) {
            $defer.reject(xhr);
        });
        return $defer.promise();
    };
    return {
        fetch: fetch
    };

}(jQuery);

Api.reg = function ($) {
    var submit = function (_option) {
        var $defer = $.Deferred();
        var options = {
            type: 'post',
            url: 'signup',
            data: _option
        };
        Util.ajax(options).done(function (result) {
            $defer.resolve(result);
        }).fail(function (xhr) {
            $defer.reject(xhr);
        });
        return $defer.promise();
    };

    return {
        submit:submit
    };

}(jQuery);

Page.activity = (function () {
    var init = function () {
        mui.init({
            pullRefresh: {
                container: '#pullrefresh',
                down: {
                    contentdown: ' ',
                    contentover: ' ',
                    contentrefresh: ' ',
                    callback: Util.refresh().pulldownRefresh
                },
                up: {
                    contentdown: '',
                    contentover: '',
                    contentrefresh: '',
                    callback: Util.refresh().pullupRefresh
                }
            }
        });
        mui.ready(function () {
            mui('#pullrefresh').pullRefresh().pullupLoading();
            mui('#pullrefresh').pullRefresh().scrollTo(0, 0);
            window.scrollTo(0, 0);
            render()
        });
    };
    var render = function () {
        Util.go_to_detail($('.mui-table-view-cell'));
    };
    return {
        init: init
    };

})();

Page.all = (function () {
    var init = function () {
        Util.string.path_join();
        Util.string.format();
    };
    return {
        init: init
    };
})();

Page.index = (function () {
    var init = function () {
        mui.init({
            pullRefresh: {
                container: '#pullrefresh',
                down: {
                    contentdown: ' ',
                    contentover: ' ',
                    contentrefresh: ' ',
                    callback: Util.refresh().pulldownRefresh
                },
                up: {
                    contentdown: '',
                    contentover: '',
                    contentrefresh: '',
                    callback: Util.refresh().pullupRefresh
                }
            }
        });
        mui.ready(function () {
            Util.swiper();
            Api.banner.fetch()
                .done(function (_data) {
                    render_banner(_data);
                    bind();
                })
                .fail(function (err_msg, error) {
                    console.log(err_msg);
                });
            Api.news.fetch()
                .done(function (_data) {
                    render_building(_data);
                })
                .fail(function (err_msg, error) {
                    console.log(err_msg);
                });

            Api.building.fetch()
                .done(function (_data) {
                    render_building(_data);
                })
                .fail(function (err_msg, error) {
                    console.log(err_msg);
                });
        })
    };

    var render_banner = function (_data) {
        var template = Handlebars.compile($('#template_banner').html());
        $('.banner-con').html(template(_data.banner));
    };

    var render_building = function (_data) {
        console.log(_data);
        var template = Handlebars.compile($('#template_building').html());
        $('#list_con').html(template(_data.list));
    };


    var bind = function () {
        Util.scroll();

        $('.search-con').on('tap', function () {
            mui.openWindow({
                url: 'search.html',
                id: 'search'
            })
        });

        Util.go_to_detail($('.swiper-slide'));
        Util.go_to_detail($('.scroll-cell'));
        Util.go_to_detail($('.list-tap'));

        $('.nav-select').on('tap', function () {
            Util.call_login($(this), 'select');
        });

        $('.nav-person').on('tap', function () {
            Util.call_login($(this), 'person');
        });
    };
    return {
        init: init
    };

})();

Page.input = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            render();
        })
    };
    var render = function () {
        Util.go_to_detail($('.submit-btn'));
    };
    return {
        init: init
    };
})();

Page.login = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            bind_form();
            bind()
        })
    };
    var bind_form = function () {
        $('#login').on('tap', function () {
            var phone = $.trim($("#account").val());
            var psw = $.trim($("#password").val());
            var _option = {
                "phone": phone,
                "password": psw
            };

            Api.login.fetch(_option)
                .done(function (_data) {
                    console.log('suu' + _data)
                })
                .fail(function (err_msg, error) {
                    console.log(err_msg);
                });
        })
    };
    var bind = function () {
        $('#reg').on('tap', function () {
            mui.openWindow({
                url: 'reg_register.html'
            })
        });

        $('#forget_psw').on('tap', function () {
            mui.openWindow({
                url: 'reg_forget.html'
            })
        })

    };
    return {
        init: init
    }
})();

Page.person = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            // render();
            bind();
        })
    };

    var bind = function () {
        //退出登录
        $('#logout').on('tap', function () {

            var btnArray = ['确定', '取消'];
            mui.confirm('你要退出当前账户，确认？', '', btnArray, function (e) {
                if (e.index === 0) {
                    Api.signout.fetch()
                        .done(function (_data) {
                            console.log(_data);
                            mui.toast('退出登录成功!');
                            window.location.href = '../index.html';
                            alert('out')
                        })
                        .fail(function (err_msg, error) {
                            console.log(err_msg);
                        });
                }
            })

        });
    };
    return {
        init: init
    };
})();

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



Page.select = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            render();
        })
    };
    var render = function () {
        Util.go_to_detail($('.submit-btn'));
    };
    return {
        init: init
    };
})();

})(window, document);
