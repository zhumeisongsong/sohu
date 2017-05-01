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


    // dispatch
    Util.dispatcher(pathname);
});




