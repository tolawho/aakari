/*eslint-env browser */
/* global NProgress */
/* eslint no-unused-vars: "off" */

// add_social() adds social icons
function add_social(iconString, link) {
    document.querySelector('#socials').innerHTML = '<a target="_blank" rel="noopener" href="' + link + '"><i class="'+ iconString + '"></i></a>' + document.querySelector('#socials').innerHTML;
}

// toggle_nav() will toggle the navigation bar
function toggle_nav() {
    document.querySelector('#mainnav').classList.toggle('show');
}

// capture_href() will capture all href elements in the page
function capture_href() {
    // Grab all the anchor tags in the DOM
    var href_elements = document.querySelectorAll('a');

    // Attach an event listener to all of these anchors
    href_elements.forEach(function(href) {
        // href.addEventListener('click', href_clicked);
        href.onclick = function() {
            href_clicked(event, href);
        };
    });
}

// href_clicked() will trigger only when a anchor element fire the click event
function href_clicked(event, href) {
    // Check if the link is internal or external
    if (href.hostname.includes(window.location.hostname)) {
        // Prevent the default behaviour
        event.preventDefault();

        // Start the progress bar
        NProgress.start();

        // Create a new xhr request
        var xhr = new window.XMLHttpRequest;
        xhr.responseType = 'document';

        // Link the following events to appropriate functions
        xhr.onload = handle_xhr;
        xhr.onerror = handle_xhr_error;

        xhr.open('GET', href.href);
        xhr.send();
    }
}

// handle_xhr() will handle the onload xhr event
function handle_xhr() {
    if (this.status !== 200) {
        handle_xhr_error();
    } else {
        var main = document.querySelector('#siteContent');
        var newMain = this.response.querySelector('#siteContent');
        var newTitle = this.response.querySelector('title').innerHTML;

        // Emulate the behaviour of navigation from the browser
        window.document.title = newTitle;
        main.parentNode.replaceChild(newMain, main);
        document.querySelector('header').scrollIntoView();
        capture_href();
        window.history.pushState({}, newTitle, this.responseURL);
        NProgress.done();
    }
}

// handle_xhr_error() will handle if the request failed
function handle_xhr_error() {

}