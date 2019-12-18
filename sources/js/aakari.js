/*eslint-env browser */
/* global $ */

$(window).scroll(function () {
    var offset = $(window).scrollTop();
    $('.navbar').toggleClass(['fixed-top', 'shadow'], offset > 500);
});

// This file will Will store and toggle the dark theme
var darkModeSwitch = document.querySelector('#darkMode');
var darkModeSwitchNav = document.querySelector('#darkModeNav');

var html = null;

function grabElements() {
    // Grab the required elements and set their classes
    html = document.getElementsByTagName('html')[0];
}

// The function that enables dark mode
function enableDarkMode() {
    html.style.cssText = '--theme: white; --text-color: #000000; --primary: #006cff; --secondary: #000000;';
    localStorage.setItem('darkMode', true);
}

// The function that disables the dark mode
function disableDarkMode() {
    html.style.cssText = '--theme: rgb(30, 30, 30); --text-color: #FFFFFF; --primary: #0095ff; --secondary: #FFFFFF;';
    localStorage.setItem('darkMode', false);
}

// The function that switches darkMode according to localStorage
function toggleDarkMode() {
    grabElements();
    if (localStorage.getItem('darkMode') == 'true') {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

// The function that restores the darkMode when loading new articles
function restoreDarkMode() {
    grabElements();
    if (localStorage.getItem('darkMode') == 'true') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

darkModeSwitch.onclick = toggleDarkMode;
darkModeSwitchNav.onclick = toggleDarkMode;

restoreDarkMode();