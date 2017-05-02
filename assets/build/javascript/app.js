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
    like: 'reg_like.html',
    info: 'reg_info.html',

    search: 'search.html',
    form: 'form.html'
};

/*
 * on domContentLoaded
 */
$(function () {
    var pathname = window.location.href.match(".+/(.+?)([\?#;].*)?$")[1];
    //nav active
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
    else if (pathname == Route.info) {
        Util.dispatcher(Route.info, function () {
            Config.currentPage = Route.info;
            Page.info.init();
        });
    }
    else if (pathname == Route.like) {
        Util.dispatcher(Route.like, function () {
            Config.currentPage = Route.like;
            Page.like.init();
        });
    }
    else if (pathname == Route.search) {
        Util.dispatcher(Route.search, function () {
            Config.currentPage = Route.search;
            Page.search.init();
        });
    }


    // dispatch
    Util.dispatcher(pathname);
});

var host = 'https://www.sohuhxh.com/';
var API_root = 'main';
var API_host = host + API_root;

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');
var setionid = getCookie('setionid');


function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

Util.call_login = function ($dom, str) {
    var user_id = owner.getState().user_id;

    if (str == 'like') {
        if (user_id == null) {
            mui.openWindow({
                url: 'reg_login.html'
            })
        } else {
            return true;
        }
    }

    if (str == 'list_cell') {
        if (user_id == null) {
            mui.openWindow({
                url: 'reg_login.html'
            })
        } else {
            var url = $dom.data('href');
            console.log(url);
            mui.openWindow({
                url: url
            })
        }
    }

    if (str == 'select') {
        if (user_id == null) {
            mui.openWindow({
                url: 'reg_login.html'
            });
        } else {
            $dom.attr('href', 'select.html');
        }
    }

    if (str == 'person') {
        if (user_id == null) {
            mui.openWindow({
                url: 'reg_login.html'
            });
        } else {
            $dom.attr('href', 'person.html');
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
        data: _option.data,
        timeout: 10000,
        success: $defer.resolve,
        error: $defer.reject
    };
    $.ajax(opt);
    return $defer.promise();
};

Handlebars.registerHelper("cover_img", function (cover) {
    var image = host.path_join(cover);
    return image
});

Handlebars.registerHelper("location_trans", function (location) {
    var location_name;


    return location_name
});

/*
 * local
 */

Util.local_ajax = function (_option) {
    var baseUrl = _option.url;
    var query = {};
    var $defer = $.Deferred();
    $.extend(query, _option.params);
    if (_option.params) {
        baseUrl = baseUrl + '?' + $.param(query);
    }
    var opt = {
        url: baseUrl,
        type: _option.type,
        data: _option.data,
        timeout: 10000,
        success: $defer.resolve,
        error: $defer.reject
    };
    $.ajax(opt);
    return $defer.promise();
};

Util.active = function (pathname) {
    if (pathname == Route.top) {
        $('.img-index').addClass('item-active')
    }
    else if (pathname == Route.activity) {
        $('.img-activities').addClass('item-active')
    }
    else if (pathname == Route.select) {
        $('.img-select').addClass('item-active')
        Util.call_login($('.nav-select'), 'select');
    }
    else if (pathname == Route.person) {
        $('.img-person').addClass('item-active')
        Util.call_login($('.nav-person'), 'person');
    }

    $('.nav-select').on('tap', function () {
        Util.call_login($(this), 'select');
    });

    $('.nav-person').on('tap', function () {
        Util.call_login($(this), 'person');
    });
};

/**
 * 获取当前状态
 **/
owner.getState = function () {
    var stateText = localStorage.getItem('$state') || "{}";
    console.log(JSON.parse(stateText));
    return JSON.parse(stateText);
};

/**
 * 清空当前状态
 **/
owner.remove = function () {
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
owner.createState = function (user_id, callback) {
    var state = owner.getState();

    state.user_id = user_id;
    owner.setState(state);

    return callback('登录成功!');
};

//手机号check
owner.check_phone = function (phone) {
    var phonereg = /^((\d{3,4}-)?\d{7,8})?(1[3587]\d{9})?$/;
    return (phonereg.exec(phone) && phone.length == 11)
};
owner.check_email = function (email) {
    email = email || '';
    return (email.length > 3 && email.indexOf('@') > -1);
};

/**
 * 用户登录
 **/
owner.login = function (login_info, callback) {
    callback = callback || $.noop;
    login_info = login_info || {};
    login_info.phone = login_info.phone || '';
    login_info.password = login_info.password || '';

    if (!owner.check_phone(login_info.phone)) {
        return callback("请填写正确的手机号码");
    }

    if (login_info.password.length < 8) {
        return callback('密码最短为8个字符');
    }

    //加密
    login_info.password = jQuery.md5(login_info.password);
    Api.login.submit(login_info)

        .done(function (_data) {
            console.log(_data);
            owner.createState(login_info.phone, callback);
            setTimeout(function () {
                mui.openWindow({
                    url: 'index.html',
                    id: 'index'
                })
            }, 1000);
        })
        .fail(function (err_msg, error) {
            console.log(err_msg);
            mui.toast(err_msg.responseText)
        });
};

/**
 * 新用户注册
 **/
owner.reg = function (reg_info, callback) {
    callback = callback || $.noop;
    reg_info = reg_info || {};
    reg_info.phone = reg_info.phone || '';
    reg_info.email = reg_info.email || '';
    reg_info.password = reg_info.password || '';
    reg_info.password2 = reg_info.password || '';

    console.log(owner.check_phone(reg_info.phone));
    if (!owner.check_phone(reg_info.phone)) {
        return callback("请填写正确的手机号码");
    }
    if (!owner.check_email(reg_info.email)) {
        return callback("请填写正确的邮箱");
    }


    if (reg_info.password.length < 8) {
        return callback('密码最短为8个字符');
    }

    if (reg_info.password2 != reg_info.password) {
        return callback('两次密码输入不一致');
    }

    //md5加密
    reg_info.password = jQuery.md5(reg_info.password);
    reg_info.password2 = jQuery.md5(reg_info.password2);


    Api.reg.submit(reg_info)
        .done(function (_data) {
            setTimeout(function () {

                mui.openWindow({
                    url: 'reg_login.html',
                    id: 'reg'
                })
            }, 1000);
            return callback('注册成功，为您跳转登录');
        })
        .fail(function (err_msg, error) {
            console.log(err_msg);
            mui.toast(err_msg.responseText)
        });
};

/**
 * 忘记密码
 **/
owner.forgetPassword = function (change_info, callback) {
    callback = callback || $.noop;
    change_info = change_info || {};
    change_info.email = change_info.email || '';

    if (!owner.check_email(change_info.email)) {
        return callback("请填写正确的邮箱");
    }

    Api.forget_psw.submit(change_info)
        .done(function (_data) {
            setTimeout(function () {
                mui.openWindow({
                    url: 'reg_login.html',
                    id: 'reg'
                })
            }, 1000);
            return callback(_data.message);
        })
        .fail(function (err_msg, error) {
            console.log(err_msg);
            mui.toast(err_msg.responseText)
        });
};

/**
 * 修改密码
 **/
owner.changePassword = function (change_info, callback) {
    callback = callback || $.noop;
    change_info = change_info || {};
    change_info.old_password = change_info.old_password || '';
    change_info.password0 = change_info.password0 || '';
    change_info.password1 = change_info.password1 || '';

    //加密
    change_info.old_password = jQuery.md5(change_info.old_password);
    change_info.password0 = jQuery.md5(change_info.password0);
    change_info.password1 = jQuery.md5(change_info.password1);

    Api.change_psw.submit(change_info)
        .done(function (_data) {
            setTimeout(function () {
                mui.openWindow({
                    url: 'reg_login.html',
                    id: 'reg'
                })
            }, 1000);
            return callback(_data.message);
        })
        .fail(function (err_msg, error) {
            console.log(err_msg);
            mui.toast(err_msg.responseText)
        });
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
    var page = 1;
    /**
     * 上拉加载具体业务实现
     */

    var render_building = function (_data) {
        console.log(_data);
        var template = Handlebars.compile($('#template_building').html());
        if (_data.list.length == 0) {
            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
        }
        else if (_data.list.length == 10) {
            $('#list_con').html(template(_data.list));
            page++
        }
        else if (_data.list.length < 10) {
            $('#list_con').html(template(_data.list));
            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
        }
    };

    var bind_building = function () {
        Util.go_to_detail($('.list-tap'));
        $('.like-btn').on('tap', function () {
            Util.call_login($(this),'like')
            if (Util.call_login($(this),'like')) {
                Util.like($(this));
            }

        })
    };

    var pullupRefresh_building = function () {
        Api.building.fetch(page)
            .done(function (_data) {
                render_building(_data);
                bind_building();
            })
            .fail(function (err_msg, error) {
                console.log(err_msg);
            });
    };

    var pullupRefresh_activity = function () {
        Api.activity.fetch(page)
            .done(function (_data) {
                render(_data);
                bind()
            })
            .fail(function (err_msg, error) {
                console.log(err_msg);
            });

        var render = function (_data) {
            console.log(_data);
            var template = Handlebars.compile($('#template_activity').html());
            if (_data.list.length == 0) {
                mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
            }
            else if (_data.list.length == 10) {
                $('#activity_list_con').html(template(_data.list));
                page++
            }
            else if (_data.list.length < 10) {
                $('#activity_list_con').html(template(_data.list));
                mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
            }

        };
        var bind = function () {
            $('.list-cell').on('tap', function () {
                Util.call_login($(this), "list_cell")
            });
        };

    };

    var pullupRefresh_building_select = function () {
        var location = localStorage.getItem('location').replace(/[\r\n]/g, "").replace(/\ +/g, "");
        if (location == '不限') {
            location = '';
        }
        var area = localStorage.getItem('area').replace(/[\r\n]/g, "").replace(/\ +/g, "");
        console.log(area)
        if (area == '不限') {
            area = '';
        }
        var price = localStorage.getItem('price').replace(/[\r\n]/g, "").replace(/\ +/g, "");

        var _option = {
            "location": location,
            "aera_setion": area,
            "price_setion": price,
            "user_id": owner.getState().user_id
        };
        console.log(_option)

        Api.building_select.fetch(_option)
            .done(function (_data) {
                render_building(_data);
                bind_building();
            })
            .fail(function (err_msg, error) {
                console.log(err_msg);
            });
    };


    return {
        pulldownRefresh: pulldownRefresh,
        pullupRefresh_building: pullupRefresh_building,
        pullupRefresh_activity: pullupRefresh_activity,
        pullupRefresh_building_select: pullupRefresh_building_select
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
                    speed: 50,  //滚动速度,值越大速度越慢
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

Util.like=function ($dom, status) {
    var id = $dom.data('id');
    var status = $dom.data('status');
    alert(status)

        Api.like_set.fetch(id)
            .done(function (_data) {
                console.log(_data);
                if(status){
                    $dom.removeClass('is-like');
                    $dom.text('关注');
                    $dom.attr('data-status','false');
                }else{
                    $dom.addClass('is-like');
                    $dom.text('取消');
                    $dom.attr('data-status','true');
                }

            })
            .fail(function (err_msg, error) {
                console.log(err_msg);
            });
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

Api.banner_activity = function ($) {
    var fetch = function () {
        var $defer = $.Deferred();
        var options = {
            type: 'get',
            url: 'activity_banner/'
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
    var fetch = function (page) {
        var $defer = $.Deferred();
        var options = {
            type: 'post',
            url: 'bulidings/{0}/'.format(page),
            data:{
                "user_id":owner.getState().user_id
            }
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
            url: 'buildings_condition/',
            type: 'get',
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
        fetch: fetch
    };

}(jQuery);

Api.change_psw = function ($) {
    var submit = function (_option) {
        var $defer = $.Deferred();
        var options = {
            type: 'post',
            url: 'change_password/',
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

Api.form_get = function ($) {
    var fetch = function (id) {
        var $defer = $.Deferred();
        var options = {
            type: 'get',
            url: 'get_collect_items/{0}/'.format(id)
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

Api.form_submit = function ($) {
    var submit = function (_option) {
        var $defer = $.Deferred();
        var options = {
            type: 'post',
            url: 'post_participator_info/',
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
        submit: submit
    };

}(jQuery);

Api.like_list = function ($) {
    var fetch = function () {
        var $defer = $.Deferred();
        var options = {
            type: 'post',
            url: 'get_user_likes/',
            data:{
                'user_id': owner.getState().user_id
            }
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

Api.like_set = function ($) {
    var fetch = function (id) {
        var $defer = $.Deferred();
        var options = {
            type: 'post',
            url: 'set_liked/{0}/'.format(id),
            data: {
                'user_id': owner.getState().user_id
            }
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

Api.activity = function ($) {
    var fetch = function (page) {
        var $defer = $.Deferred();
        var options = {
            type: 'get',
            url: 'get_activitys/{0}'.format(page)
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

Api.search = function ($) {
    var fetch = function (val) {
        var $defer = $.Deferred();
        var options = {
            type: 'post',
            url: 'search_building/',
            data:{
                "q":val
            }
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

Api.select = function ($) {
    var fetch = function () {
        var $defer = $.Deferred();
        var options = {
            type: 'get',
            url: '../data/select.json'
        };
        Util.local_ajax(options).done(function (result) {
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
            url: 'signin/',
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
            url: 'signup/',
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
        submit: submit
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
                    contentnomore:'已经全部加载完',
                    callback: Util.refresh().pullupRefresh_activity
                }
            }
        });
        mui.ready(function () {
            Util.swiper();

            Util.go_to_detail($('.swiper-slide'));

            mui('#pullrefresh').pullRefresh().pullupLoading();
            mui('#pullrefresh').pullRefresh().scrollTo(0, 0);
            window.scrollTo(0, 0);
        });
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

Page.change= (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            bind();
        })
    };

    var bind = function () {
        console.log('in')
        $('#change_psw_btn').on('tap', function () {
            var old_password = $.trim($("#old_password").val());
            var password0 = $.trim($("#password").val());
            var password1 = $.trim($("#password_confirm").val());

            var change_info = {
                "old_password": old_password,
                "password0": password0,
                "password1": password1,
                "user_id":owner.getState().user_id
            };
            console.log(change_info)

            owner.changePassword(change_info, function (err) {
                if (err) {
                    mui.toast(err);
                }
            });
        })
    };

    return {
        init: init
    }
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
                    contentnomore:'已经全部加载完',
                    callback: Util.refresh().pullupRefresh_building
                }
            }
        });
        mui.ready(function () {
            Util.swiper();
            Api.banner.fetch()
                .done(function (_data) {
                    render_banner(_data);
                    bind_banner();
                })
                .fail(function (err_msg, error) {
                    console.log(err_msg);
                });

            Api.news.fetch()
                .done(function (_data) {
                    render_news(_data);
                    bind_news();
                })
                .fail(function (err_msg, error) {
                    console.log(err_msg);
                });

            mui('#pullrefresh').pullRefresh().pullupLoading();
            mui('#pullrefresh').pullRefresh().scrollTo(0, 0);
            window.scrollTo(0, 0);

            bind();
        })
    };

    var render_banner = function (_data) {
        var template = Handlebars.compile($('#template_banner').html());
        $('#banner_con').html(template(_data.list));
    };

    var render_news = function (_data) {
        var template = Handlebars.compile($('#template_news').html());
        $('#news_con').html(template(_data.list));
    };

    var bind_banner = function () {
        Util.go_to_detail($('.swiper-slide'));
    };

    var bind_news = function () {
        Util.go_to_detail($('.scroll-cell'));
        Util.scroll();
    };


    var bind = function () {
        $('.search-con').on('tap', function () {
            mui.openWindow({
                url: 'search.html',
                id: 'search'
            })
        });
    };

    return {
        init: init
    };

})();

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
        var showUserPickerButton = doc.getElementById('sex');
        var userResult = doc.getElementById('sex_result');
        showUserPickerButton.addEventListener('tap', function (event) {
            userPicker.show(function (items) {
                userResult.innerText = JSON.stringify(items[0]);
                //返回 false 可以阻止选择框的关闭
                //return false;
            });
        }, false);
    };

    //fetch
    var render = function () {


    };

    var bind = function () {
        picker_sex();
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

Page.input = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            Api.select.fetch()
                .done(function (_data) {
                    render(_data);
                    bind()
                })
                .fail(function (err_msg, error) {
                    console.log(err_msg);
                });
        });

        var render = function (_data) {
            console.log(_data);
            var template = Handlebars.compile($('#template_label_time').html());
            $('#time_con').html(template(_data.time));
        };

        var bind = function () {
            mui('#time_con').on('tap', '.label-btn', function () {
                var title = $(this).text();
                $('#time_con').find('.label-btn').removeClass('mui-red');
                $(this).addClass('mui-red');
                localStorage.setItem("time", title);
            });

            $('.submit-btn').on('tap', function () {
                event.stopPropagation();
                var total = $.trim($("#total").val());
                var time = localStorage.getItem("time");
                var pay_month = $.trim($("#pay_month").val());

                localStorage.setItem("total", total);
                localStorage.setItem("pay_month", pay_month);

                if (total && time && pay_month) {
                    var url = $(this).data('href');
                    mui.openWindow({
                        url: url,
                        id: 'select_score'
                    })
                } else {
                    mui.toast('您还没有填完奥～')

                }
            })
        }
    };
    return {
        init: init
    };
})();

Page.like = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            Api.like_list.fetch()
                .done(function (_data) {
                    render(_data);
                    bind();
                })
                .fail(function (err_msg, error) {
                    console.log(err_msg);
                });
        });
        var render = function (_data) {
            console.log(_data)
            var template ;
        };

        var bind = function () {
            Util.go_to_detail($('.like-cell'))
        }
    };
    return {
        init: init
    };

})();

Page.login = (function () {
    var init = function () {
        mui.init({
            pullRefresh: {
                container: '#pullrefresh',

                up: {
                    contentdown: '',
                    contentover: '',
                    contentrefresh: '',
                    callback: Util.refresh().pullupRefresh_building_select
                }
            }
        });
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
            owner.login(_option, function (err) {
                if (err) {
                    mui.toast(err);
                }
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
            render()
            bind();
        })
    };
    var render = function () {
      $('#user_name').text(owner.getState().user_id)
    };

    var bind = function () {
        //logout
        $('#logout').on('tap', function () {

            var btnArray = ['确定', '取消'];
            mui.confirm('你要退出当前账户，确认？', '', btnArray, function (e) {
                if (e.index === 0) {
                    Api.signout.fetch()
                        .done(function (_data) {
                            mui.toast('退出登录成功');
                            owner.remove();
                            console.log(owner.getState());
                            setTimeout(function () {
                                mui.openWindow({
                                    url: 'index.html'
                                })
                            }, 1000)
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

Page.reg = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            bind();
        })
    };

    var bind = function () {
        $('#reg_btn').on('tap', function () {
            var phone = $.trim($("#phone").val());
            var email = $.trim($("#email").val());
            var password = $.trim($("#password").val());
            var password_confirm = $.trim($("#password_confirm").val());

            var reg_info = {
                "phone": phone,
                "email": email,
                "password": password,
                "password2": password_confirm
            };

            owner.reg(reg_info, function (err) {
                console.log(err);
                if (err) {
                    mui.toast(err);
                }
            });
        })
    };

    return {
        init: init
    }
})();

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

Page.select = (function () {
    var init = function () {
        mui.init();
        mui.ready(function () {
            Api.select.fetch()
                .done(function (_data) {
                    render(_data);
                    bind()
                })
                .fail(function (err_msg, error) {
                    console.log(err_msg);
                });
        });

        var render = function (_data) {
            console.log(_data)
            var template_perpose = Handlebars.compile($('#template_label_perpose').html());
            $('#perpose_con').html(template_perpose(_data.perpose));

            var template_location = Handlebars.compile($('#template_label_location').html());
            $('#location_con').html(template_location(_data.location));

            var template_area = Handlebars.compile($('#template_label_area').html());
            $('#area_con').html(template_location(_data.area));
        };
        var bind = function () {
            mui('#perpose_con').on('tap', '.label-btn', function () {
                var title = $(this).text();
                $('#perpose_con').find('.label-btn').removeClass('mui-red');
                $(this).addClass('mui-red');
                localStorage.setItem("perpose", title);
            });

            mui('#location_con').on('tap', '.label-btn', function () {
                var title = $(this).text();
                $('#location_con').find('.label-btn').removeClass('mui-red');
                $(this).addClass('mui-red');
                localStorage.setItem("location", title);
            });

            mui('#area_con').on('tap', '.label-btn', function () {
                var title = $(this).text();
                $('#area_con').find('.label-btn').removeClass('mui-red');
                $(this).addClass('mui-red');
                localStorage.setItem("area", title);
            });

            $('.submit-btn').on('tap', function () {
                event.stopPropagation();
                var perpose = localStorage.getItem("perpose");
                var location = localStorage.getItem("location");
                var area = localStorage.getItem("area");
                console.log(perpose, location, area);
                if (perpose && location && area) {
                    var url = $(this).data('href');
                    mui.openWindow({
                        url: url,
                        id: 'select_input'
                    })
                } else {
                    mui.toast('您还没有选完奥～')
                }
            })
        }
    };
    return {
        init: init
    };
})();

})(window, document);
