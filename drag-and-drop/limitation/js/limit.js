'use strict';

const input = document.getElementsByClassName('textarea')[0];
const block = document.getElementsByClassName('block')[0];
const message = document.getElementsByClassName('message')[0];

input.addEventListener('focus', debounce(() => {
        
    block.classList.add('active');
    message.classList.remove('view');
    
}, 2000));

input.addEventListener('keyup', debounce(() => {
    
    block.classList.remove('active');
    message.classList.add('view');
    
}, 2000));

function debounce(callback, delay) {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            callback();
        }, delay);
    };
};