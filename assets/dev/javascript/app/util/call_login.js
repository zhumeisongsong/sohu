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