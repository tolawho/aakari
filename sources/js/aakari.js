/*eslint-env browser */
/* eslint no-unused-vars: "off" */

// add_social() adds social icons
function add_social(iconString, link) {
    document.querySelector('#socials').innerHTML = '<a target="_blank" rel="noopener" href="' + link + '"><i class="'+ iconString + '"></i></a>' + document.querySelector('#socials').innerHTML;
}

// toggle_nav() will toggle the navigation bar
function toggle_nav() {
    document.querySelector('#mainnav').classList.toggle('show');
}