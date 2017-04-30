/*
 *active
 */
Util.active = function (pathname) {
    if (pathname == Route.top) {
        $('.img-index').addClass('item-active')
    } else if (pathname == Route.activity) {
        $('.img-activities').addClass('item-active')
    } else if (pathname == Route.select) {
        $('.img-select').addClass('item-active')
    } else if (pathname == Route.person) {
        $('.img-person').addClass('item-active')
    }
};
