/*
 *swiper
 */
Util.swiper = function () {
    var swiper_init = function () {
        var mySwiper = new Swiper('.swiper-container', {
            autoplay: 5000,
            pagination: '.swiper-pagination',
            // loop : true,
            preloadImages: false,
            updateOnImagesReady: true,
            observer: true,
            observeParents: true,
            lazyLoading: true,
            lazyLoadingOnTransitionStart: true,
            lazyLoadingInPrevNext: true
        })
    };
    return {
        swiper_init: swiper_init()
    }
};