'use strict';

function addClick(event) {
    addToCart({'title':event.target.dataset.title, 'price':event.target.dataset.price});
}

function initButtons() {
    for(var button of document.getElementsByClassName('add-to-cart')) {
        button.addEventListener('click', addClick);
    }
}

showMore.addEventListener('click', event => {
  initButtons();
});
initButtons();
