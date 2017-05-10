/*
 *detail
 */
Util.go_to_detail = function ($cell) {
    $cell.on('tap', function () {
        event.stopPropagation();
        var url = $(this).data('href');
        alert(url);
        mui.openWindow({
            url: url,
            id: 'detail'
        })
    });
};

