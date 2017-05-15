Util.active = function (pathname) {
    if (pathname == Route.top) {
        $('.img-index').addClass('item-active')
    }
    else if (pathname == Route.activity) {
        $('.img-activities').addClass('item-active')
    }
    else if (pathname == Route.select||pathname == Route.input||pathname == Route.score) {
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
