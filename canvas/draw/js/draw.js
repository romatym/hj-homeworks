'use strict';

window.addEventListener('load', init);
const canvas = document.getElementsByTagName('canvas')[0];
var context = canvas.getContext("2d");
var hue = 0;
var width = 100;
var widthIncrement = -1;
var hueIncrement = -1;
var hex;
var paint = true;

function drawIfPressed(e) {
    if(!paint) {
        return;
    }

    var x = e.offsetX;
    var y = e.offsetY;
    var dx = e.movementX;
    var dy = e.movementY;

    if (e.buttons === 1) {
        context.beginPath();
        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineWidth = width;
        hex = hslToHex(hue, 100, 50);
        context.strokeStyle = hex;
        context.moveTo(x, y);
        context.lineTo(x - dx, y - dy);
        context.stroke();
        context.closePath();
    }
    if (hue <= 0) {
        hueIncrement = 1;
    } else if (hue >= 359) {
        hueIncrement = -1;
    }
    if (width <= 0) {
        widthIncrement = 1;
    } else if (width >= 100) {
        widthIncrement = -1;
    }
    hue += hueIncrement;
    width += widthIncrement;
}
function init() {

    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    canvas.addEventListener('dblclick',
        function clear() {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    );

    // На любое движение мыши по canvas будет выполнятся эта функция
    canvas.addEventListener('mousemove', drawIfPressed);
    canvas.addEventListener('mouseleave', () => {paint = false;});
    window.addEventListener('click', () => {paint = true;});
}
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}