'use strict';

document.getElementsByClassName('items-list')[0].addEventListener('click', addClick);

function addClick(event) {
    if(event.target.classList.contains('add-to-cart')) {
        addToCart({'title':event.target.dataset.title, 'price':event.target.dataset.price});
    }    
}
function initButtons() {
    for(var button of document.getElementsByClassName('add-to-cart')) {
        button.addEventListener('click', addClick);
    }
}