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
    else if (pathname == Route.person||pathname == Route.like||pathname == Route.info||pathname == Route.change) {
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
