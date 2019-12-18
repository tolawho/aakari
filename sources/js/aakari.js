/*eslint-env browser */
/* global $ */

$(window).scroll(function () {
    var offset = $(window).scrollTop();
    $('.navbar').toggleClass(['fixed-top', 'shadow'], offset > 500);
});

function add_social(icon, link) {
    $('#socials').prepend( '<a target="_blank" rel="noopener" href="' + link + '"><i class="'+ icon + '"></i></a>' );
}