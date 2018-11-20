'use strict';

var connection;
document.addEventListener('DOMContentLoaded', onContentLoaded);
const content = document.getElementsByClassName('messages-content')[0];
const status = document.querySelector('.message-status>.message-text');
const message = document.querySelector('div.message:not(.message-personal)>.message-text');
const loading = document.querySelector('div.loading');
const buttonSubmit = document.querySelector('button.message-submit');
const messageSend = document.querySelector('input.message-input');
const messageSrc = message.parentNode.querySelector('div.message>figure>img').src;

buttonSubmit.addEventListener('click', submit);
document.getElementsByTagName('form')[0].addEventListener('keypress', send);
        
function onContentLoaded(event) {
    connection = new WebSocket('wss://neto-api.herokuapp.com/chat');
    connection.addEventListener('open', () => {
        const chatStatus = document.getElementsByClassName('chat-status')[0];
        chatStatus.innerText = chatStatus.getAttribute('data-online');

        document.getElementsByClassName('message-submit')[0].removeAttribute('disabled');
        status.innerText = 'Пользователь появился в сети';
        content.appendChild(status.parentNode.cloneNode(true));       
    });

    connection.addEventListener('message', getMessage);
    connection.addEventListener('beforeunload', onClose);
}
function onClose(event) {
    
    connection.close();
    const chatStatus = document.getElementsByClassName('chat-status')[0];
    chatStatus.innerText = chatStatus.getAttribute('data-offline');
    
    connection.addEventListener('open', () => {
        const chatStatus = document.getElementsByClassName('chat-status')[0];
        chatStatus.innerText = chatStatus.getAttribute('data-online');
        document.getElementsByClassName('message-submit')[0].addAttribute('disabled');        
        status.innerText = 'Пользователь не в сети';
        content.appendChild(status.parentNode.cloneNode(true));
    });

    connection.addEventListener('message', getMessage);
    connection.addEventListener('beforeunload', onClose);
}

function getMessage(event) {
    const messageText = event.data;
    if(message === '...') {
        content.appendChild(loading.cloneNode(true));
    } else {
        for(const loading of content.querySelectorAll('div.loading')) {
            content.removeChild(loading);
        }
        message.innerText = messageText;
        message.parentNode.querySelector('div.message>figure>img').src = messageSrc;
        content.appendChild(message.parentNode.cloneNode(true));
    }
}
function send(event) {
    if (event.which === 13) {
        buttonSubmit.click();
        event.preventDefault();
    }
}
function submit(event) {
    event.preventDefault();
    connection.send(messageSend.value);
    //const newMessage = message.parentNode.cloneNode(true);
    message.innerText = messageSend.value;
    messageSend.value = '';
    message.parentNode.querySelector('div.message>figure>img').src = '';
    message.parentNode.getElementsByClassName('timestamp')[0].innerText = new Date().getHours().toString().padStart(2, '0') + ':' + new Date().getMinutes().toString().padStart(2, '0');
    content.appendChild(message.parentNode.cloneNode(true));   
}
