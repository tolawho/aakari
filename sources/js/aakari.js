/*eslint-env browser */
/* global $ */

$(window).scroll(function () {
    var offset = $(window).scrollTop();
    $('.navbar').toggleClass(['fixed-top', 'shadow'], offset > 500);
});