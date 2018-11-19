'use strict';
var colors, sizes, cart, xhr, price = 0;
document.addEventListener('DOMContentLoaded', init);
const form = document.getElementById('AddToCartForm');
form.addEventListener('submit', addToCart);

function removeItem(event) {
    event.preventDefault();
    
    var formData = new FormData();
    formData.append('productId', event.target.getAttribute('data-id'));

    xhr = new XMLHttpRequest();
    xhr.addEventListener('load', getCartData);
    xhr.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
    xhr.send(formData);
}
function addToCart(event) {
    event.preventDefault();

    var formData = new FormData();
    formData.append('productId', form.getAttribute('data-product-id'));
    formData.append('color', form.querySelector('input[name="color"]:checked').getAttribute('value'));
    formData.append('quantity', Number(form.querySelector('input[name="quantity"]').value));
    formData.append('size', form.querySelector('input[name="size"]:checked').getAttribute('value'));

    xhr = new XMLHttpRequest();
    xhr.addEventListener('load', getCartData);
    xhr.open('POST', 'https://neto-api.herokuapp.com/cart');
    xhr.send(formData);
}
function init() {
    xhr = new XMLHttpRequest();
    xhr.addEventListener('load', getColors);
    xhr.open('GET', 'https://neto-api.herokuapp.com/cart/colors');
    xhr.send();

    xhr = new XMLHttpRequest();
    xhr.addEventListener('load', getSizes);
    xhr.open('GET', 'https://neto-api.herokuapp.com/cart/sizes');
    xhr.send();

    xhr = new XMLHttpRequest();
    xhr.addEventListener('load', getCartData);
    xhr.open('GET', 'https://neto-api.herokuapp.com/cart');
    xhr.send();
}
function saveColorSize(event) {
    const checkedColor = form.querySelector('input[name="color"]:checked');
    if(checkedColor === undefined) {
        localStorage.removeItem('color');
    } else {
        localStorage.setItem('color', checkedColor.getAttribute('id').replace('swatch-1-', ''));
    }
    const checkedSize = form.querySelector('input[name="size"]:checked');
    if(checkedSize === undefined) {
        localStorage.removeItem('size');
    } else {
        localStorage.setItem('size', checkedSize.getAttribute('id').replace('swatch-0-', ''));
    }
    event.stopPropagation();
}
function getColors() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        colors = JSON.parse(this.response);
        const colorSwatch = document.getElementById('colorSwatch');
        const savedColor = localStorage.getItem('color');
        for (const color of colors) {
            const available = color.isAvailable ? ' available ' : ' soldout ';
            const disabled = color.isAvailable ? '' : ' disabled ';
            const checked = (color.type === savedColor) ? ' checked ' : '';
            colorSwatch.innerHTML +=
                    '<div data-value="' + color.type + '" class="swatch-element color ' + color.type + available + ' ">' +
                    '<div class="tooltip">' + color.title + '</div>' +
                    '<input quickbeam="color" id="swatch-1-' + color.type + '" type="radio" name="color" value="' + color.type + disabled + '" ' + checked + '>' +
                    '<label for="swatch-1-' + color.type + '" style="border-color: red;">' +
                    '<span style="background-color: ' + color.code + ';"></span>' +
                    '<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">' +
                    '</label>' +
                    '</div>';
        }        
        form.addEventListener('click', saveColorSize);
    }
}
function getSizes() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        sizes = JSON.parse(this.response);
        const sizeSwatch = document.getElementById('sizeSwatch');
        
        const savedSize = localStorage.getItem('size');
        
        for (const size of sizes) {
            const available = size.isAvailable ? ' available ' : ' soldout ';
            const disabled = size.isAvailable ? '' : ' disabled ';
            const checked = (size.type === savedSize) ? ' checked ' : ' ';
            sizeSwatch.innerHTML +=
                    '<div data-value="' + size.type + '" class="swatch-element plain ' + size.type + available + '">' +
                    '<input id="swatch-0-' + size.type + '" type="radio" name="size" value="' + size.type + disabled + '" ' + checked + '>' +
                    '<label for="swatch-0-' + size.type + '">' +
                    size.title +
                    '<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">' +
                    '</label>' +
                    '</div>';
        }
    }
}
function getCartData() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        cart = JSON.parse(this.response);
        const quickCart = document.getElementById('quick-cart');

        for (const item of cart) {
            price += Number(item.price);
            quickCart.innerHTML +=
                    '<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-' + item.id + '" style="opacity: 1;">' +
                    '<div class="quick-cart-product-wrap">' +
                    '<img src="' + item.pic + '" title="' + item.title + '">' +
                    '<span class="s1" style="background-color: #000; opacity: .5">$800.00</span>' +
                    '<span class="s2"></span>' +
                    '</div>' +
                    '<span class="count hide fadeUp" id="quick-cart-product-count-' + item.id + '">' + item.quantity + '</span>' +
                    '<span class="quick-cart-product-remove remove" data-id="' + item.id + '"></span>' +
                    '</div>';
        }
        const open = cart.length > 0 ? ' open ' : '';
        quickCart.innerHTML +=
                '<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ' + open + '">' +
                '<span>' +
                '<strong class="quick-cart-text">Оформить заказ<br></strong>' +
                '<span id="quick-cart-price">$' + price + '</span>' +
                '</span>' +
                '</a>';

        for (const rButton of document.getElementsByClassName('remove')) {
            rButton.addEventListener('click', removeItem);
        }

    }
}