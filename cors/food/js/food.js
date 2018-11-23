'use strict';

document.addEventListener('DOMContentLoaded', init);

function init() {    
    jsonp('https://neto-api.herokuapp.com/food/42', function(response) {
        document.querySelector('[data-title]').innerText = response.title;
        document.querySelector('[data-pic]').style.backgroundImage = 'url("' + response.pic + '")';
        document.querySelector('[data-ingredients]').innerText = response.ingredients.join();
    });
    jsonp('https://neto-api.herokuapp.com/food/42/rating', function(response) {
        document.querySelector('[data-rating]').innerText = response.rating;
        document.querySelector('[data-votes]').innerText = response.votes;
    });
    jsonp('https://neto-api.herokuapp.com/food/42/consumers', function(response) {
        var textInsert='';
        for(const user of response.consumers) {
            textInsert += '<img src="' + user.pic + '" title="' + user.name + '">';
        }
        textInsert += '<span>(+' + response.total + ')</span>';
        document.getElementsByClassName('consumers')[0].innerHTML = textInsert;
    });

}
function jsonp(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

