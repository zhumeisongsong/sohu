/*
 *refresh
 */
Util.refresh = function () {

    /*
     *pull down
     */
    var pulldownRefresh = function () {
        window.location.reload();
        mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
    };

    var page = 1;

    /*
     * pull up
     */
    var render_building = function (template,_data) {
        console.log(_data);
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

        // go to detail
        Util.go_to_detail($('.list-tap'));

        // like or not
        $('.like-btn').on('tap', function () {
            Util.call_login($(this),'like');
            if (Util.call_login($(this),'like')) {
                Util.like($(this));
            }
        })
    };

    /*
     * fetch
     */

    //index building
    var fetch_building = function () {
        Api.building.fetch(page)
            .done(function (_data) {
                var template = Handlebars.compile($('#template_building').html());
                render_building(template,_data);
                bind_building();
            })
            .fail(function (err_msg, error) {
                console.log(err_msg);
            });
    };
    //activity
    var fetch_activity = function () {
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
    //select building
    var fetch_building_select = function () {
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
        pullupRefresh_building: fetch_building,
        pullupRefresh_activity: fetch_activity,
        pullupRefresh_building_select: fetch_building_select
    }
};