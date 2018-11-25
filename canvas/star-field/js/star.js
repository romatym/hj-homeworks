'use srtict';

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('click', drawStars);

const canvasTag = document.getElementsByTagName('canvas')[0];

function init() {
    canvasTag.setAttribute('width', 300);
    canvasTag.setAttribute('height', 150);
    canvasTag.setAttribute('style', "background-color:black; border:1px solid red;");
    drawStars();
}
function drawStars() {
    if (canvasTag.getContext) {
        var ctx = canvasTag.getContext('2d');
        const PI = Math.PI;
        const colors = ['#ffffff', '#ffe9c4', '#d4fbff'];

        var circle = new Path2D();
        var x, y;
        const numberOfStars = getRandomInt(200, 400);
        
        ctx.clearRect(0, 0, canvasTag.width, canvasTag.height);

        for (var star = 1; star < numberOfStars; star++) {
            x = getRandomInt(0, 300);
            y = getRandomInt(0, 150);

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.fillStyle = colors[getRandomInt(0, 2)];
            ctx.globalAlpha = getRandom(0.8, 1);
            ctx.arc(x, y, getRandom(0, 1.1), 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
        }
    }
}
function getRandom(min, max)
{
    return Math.random() * (max - min) + min;
}
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
