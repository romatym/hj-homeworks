'use strict';

document.addEventListener('DOMContentLoaded', onContentLoaded);

function onContentLoaded(event) {
    
    const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');
    
    connection.addEventListener('message', getMessage);
}

function getMessage(event) {  
    const message = JSON.parse(event.data);
    
    document.getElementsByClassName('counter')[0].innerText = message.connections;
    document.querySelector('output.errors').innerText = message.errors;
}