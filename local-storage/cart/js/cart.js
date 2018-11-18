'use strict';

var colors, sizes, cart;
document.addEventListener('DOMContentLoaded', init);

function init() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', getColors);
    xhr.open('GET', 'https://neto-api.herokuapp.com/cart/colors');
    xhr.send();
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', getSizes);
    xhr.open('GET', 'https://neto-api.herokuapp.com/cart/sizes');
    xhr.send();
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', getCart);
    xhr.open('GET', 'https://neto-api.herokuapp.com/cart');
    xhr.send();
}
function getColors() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        colors = JSON.parse(this.response);
        const colorSwatch = document.getElementById('colorSwatch');
        for(const color of colors) {
            const available = color.isAvailable ? ' available ' : ' soldout ';
            const disabled = color.isAvailable ? '' : ' disabled ';
            
            colorSwatch.innerHTML += 
                '<div data-value="' + color.type + '" class="swatch-element color ' + color.type + available +' ">'+
                '<div class="tooltip">' + color.title + '</div>'+
                '<input quickbeam="color" id="swatch-1-' + color.type + '" type="radio" name="color" value="' + color.type + disabled + '" checked>'+
                '<label for="swatch-1-' + color.type + '" style="border-color: red;">'+
                  '<span style="background-color: ' + color.code + ';"></span>'+
                  '<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">'+
                '</label>'+
              '</div>';
        }
    }
}
function getSizes() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        sizes = this.response;
    }
}
function getCart() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        cart = this.response;
    }
}