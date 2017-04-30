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