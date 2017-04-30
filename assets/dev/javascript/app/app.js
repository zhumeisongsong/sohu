var App = window.App = {};
var Util = App.Util = {};
var Api = App.Api = {};
var Config = App.Config = {};
var Page = App.Page = {};
var Route = App.Route = {
    top: 'index.html',
    select: 'select.html',
    activity: 'list.html',
    person: 'person.html',
    score: 'select_score.html',
    input: 'select_input.html'
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
        } else if (pathname == Route.activity) {
            Util.dispatcher(Route.activity, function () {
                Config.currentPage = Route.activity;
                Page.activity.init();
            });
        } else if (pathname == Route.select) {
            Util.dispatcher(Route.select, function () {
                Config.currentPage = Route.select;
                Page.select.init();
            });
        } else if (pathname == Route.input) {
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


    // dispatch
    Util.dispatcher(pathname);
});




