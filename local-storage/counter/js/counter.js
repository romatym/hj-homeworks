'use strict';

const inc = document.getElementById('increment');
const dec = document.getElementById('decrement');
const res = document.getElementById('reset');
const counterElem = document.getElementById('counter');

document.addEventListener('DOMContentLoaded', init)
inc.addEventListener('click', increment);
dec.addEventListener('click', decrement);
res.addEventListener('click', reset);
function init() {
    setCounter(getCookie('counter'));
}
function increment(event) {
    let counter = Number(getCookie('counter')) + 1;
    document.cookie = 'counter='+counter;
    setCounter(counter);
}
function decrement(event) {
    let counter = Number(getCookie('counter')) - 1;
    document.cookie = 'counter='+counter;
    setCounter(counter);
}
function reset(event) {
    document.cookie = 'counter=0';
    setCounter(0);
}
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : 0;
}
function setCounter(value) {
    counterElem.innerText = value;
}