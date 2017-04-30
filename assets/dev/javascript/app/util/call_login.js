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