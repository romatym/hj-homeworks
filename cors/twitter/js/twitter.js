'use strict';

const request = new XMLHttpRequest();
request.addEventListener("load", onLoad);

//сервер не работал, я заменил url сервера на другой, ниже закоментирован код с примером CORS
request.open('GET', 'https://neto-api.herokuapp.com/book/', true);
//request.open('GET', 'https://neto-api.herokuapp.com/twitter/json', true);
//request.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:8383');
//request.setRequestHeader('Content-Type', 'application/json');

request.send();

function onLoad() {
    //сервер не работал, я заменил ответ сервера на функцию responseText 
    if (request.status === 200) {
         const response = JSON.parse(responseText());
         document.querySelector('[data-wallpaper]').setAttribute('src', response.wallpaper);
         document.querySelector('[data-username]').innerText = response.username;
         document.querySelector('[data-description]').innerText = response.description;
         document.querySelector('[data-pic]').setAttribute('src', response.pic);
         document.querySelector('[data-tweets]').innerText = response.tweets;
         document.querySelector('[data-followers]').innerText = response.followers;
         document.querySelector('[data-following]').innerText = response.following;
     }
     
     function responseText() {
       return `{"username":"@carlf","description":"Carl Fredricksen is the protagonist in Up. He also appeared in Dug's Special Mission as a minor character.","tweets":2934,"followers":1119,"following":530,"wallpaper":"https://neto-api.herokuapp.com/hj/4.1/twitter/up.jpg","pic":"https://neto-api.herokuapp.com/hj/4.1/twitter/carl.jpg"}`;
    }
    
}