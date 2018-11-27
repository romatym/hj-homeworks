window.requestAnimFrame = function ()
{
    return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback) {
                window.setTimeout(callback, 1000 / 60);
            }
    );
}();

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

let dpi = window.devicePixelRatio || 1;
context.scale(dpi, dpi);
console.log(dpi);

function fix_dpi() {
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);

    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
}
function inRad(num) {
    return num * Math.PI / 180;
}
function getRandom(min, max)
{
    return Math.random() * (max - min) + min;
}
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function nextPoint(x, y, time) {
    return {
        x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
        y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    };
}

var particle_count = getRandomInt(50, 200), particles = [];
function Particle()
{

    this.size = getRandom(0.1, 0.6);
    this.lineWidth = this.size * 5;
    this.radius = this.size * 12;
    this.type = getRandomInt(0, 1);

    this.x = Math.floor((Math.random() * ((+getComputedStyle(canvas).getPropertyValue("width").slice(0, -2) * dpi) - this.radius + 1) + this.radius));
    this.y = Math.floor((Math.random() * ((+getComputedStyle(canvas).getPropertyValue("height").slice(0, -2) * dpi) - this.radius + 1) + this.radius));
    this.startX = Math.floor((Math.random() * ((+getComputedStyle(canvas).getPropertyValue("width").slice(0, -2) * dpi) - this.radius + 1) + this.radius));
    this.startY = Math.floor((Math.random() * ((+getComputedStyle(canvas).getPropertyValue("height").slice(0, -2) * dpi) - this.radius + 1) + this.radius));
    this.rotate = 0;
    if (getRandomInt(0, 1) === 0) {
        this.nextPoint = function (x, y, time) {
            return {
                x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
                y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
            };
        }
    } else {
        this.nextPoint = function nextPoint(x, y, time) {
            return {
                x: x + Math.sin((x + (time / 10)) / 100) * 5,
                y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
            }
        }
    }

    this.move = function ()
    {
        context.beginPath();
        context.globalCompositeOperation = 'source-over';
        context.strokeStyle = 'red';
        context.lineWidth = this.lineWidth;
        context.globalAlpha = 1;
        if (this.type === 0) {
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

            this.x = (this.nextPoint(this.startX, this.startY, Date.now()).x);
            this.y = (this.nextPoint(this.startX, this.startY, Date.now()).y);
        } else {

            this.rotate += getRandomInt(-0.2, 0.2);
            context.save();

            context.translate(this.x, this.y);
            context.rotate(inRad(this.rotate));

            context.moveTo(-10 * this.size, -10 * this.size);
            context.lineTo(10 * this.size, 10 * this.size);
            context.moveTo(10 * this.size, -10 * this.size);
            context.lineTo(-10 * this.size, 10 * this.size);

            context.restore();

            this.x = (this.nextPoint(this.startX, this.startY, Date.now()).x);
            this.y = (this.nextPoint(this.startX, this.startY, Date.now()).y);
        }
        context.stroke();
        context.closePath();
    };
}
;
for (var i = 0; i < particle_count; i++)
{
    fix_dpi();
    var particle = new Particle();
    particles.push(particle);
}

function animate() {
    fix_dpi();
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particle_count; i++)
    {
        particles[i].move();
    }
    requestAnimFrame(animate);
}

animate();
