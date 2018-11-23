'use strict';

document.addEventListener('DOMContentLoaded', init);

function onloadProfile(response) {
    
    const id = response.id;
    document.querySelector('[data-name]').innerText = response.name;
    document.querySelector('[data-position]').innerText = response.position;
    document.querySelector('[data-description]').innerText = response.description;
    document.querySelector('[data-pic]').setAttribute('src', response.pic);
    
    var elemTech = document.createElement("script");
    elemTech.src = 'https://neto-api.herokuapp.com/profile/' + response.id + '/technologies?callback=onloadTech';
    document.body.appendChild(elemTech);    
}

function onloadTech(responseTech) {
    var textInsert='';
    for(const tech of responseTech) {
        textInsert += '<span class="devicons devicons-' + tech + '"></span>';
    }
    document.getElementsByClassName('badgescard')[0].innerHTML = textInsert;
    
    document.getElementsByClassName('content')[0].setAttribute('style', 'display: initial;');
}
function init() {
    var elem = document.createElement("script");
    elem.src = 'https://neto-api.herokuapp.com/profile/me?callback=onloadProfile';
    document.body.appendChild(elem);
}
