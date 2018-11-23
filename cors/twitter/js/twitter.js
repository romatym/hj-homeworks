'use strict';

function onloadScript(response) {
    document.querySelector('[data-wallpaper]').setAttribute('src', response.wallpaper);
    document.querySelector('[data-username]').innerText = response.username;
    document.querySelector('[data-description]').innerText = response.description;
    document.querySelector('[data-pic]').setAttribute('src', response.pic);
    document.querySelector('[data-tweets]').innerText = response.tweets;
    document.querySelector('[data-followers]').innerText = response.followers;
    document.querySelector('[data-following]').innerText = response.following;
}

var elem = document.createElement("script");
elem.src = 'https://neto-api.herokuapp.com/twitter/jsonp?callback=onloadScript';
document.body.appendChild(elem);