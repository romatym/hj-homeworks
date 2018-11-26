'use strict';

//var canvas = document.getElementById('wall');
//var context = canvas.getContext('2d');

//canvas.onmousemove = function (event) {
//    myX = event.offsetX;
//    myY = event.offsetY;
//}
//function init() {
//    window.addEventListener('resize', resizeCanvas, false);
//    resizeCanvas();
//}
//function resizeCanvas() {
//    canvas.width = window.innerWidth;
//    canvas.height = window.innerHeight;
//}
function getRandom(min, max)
{
    return Math.random() * (max - min) + min;
}
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
window.requestAnimFrame = function()
	{
		return (
			window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback){
				window.setTimeout(callback, 1000 / 60);
			}
		);
}();

var canvas = document.getElementById('wall'); 
var context = canvas.getContext('2d');

//get DPI
let dpi = window.devicePixelRatio || 1;
context.scale(dpi, dpi);
console.log(dpi);

function fix_dpi() {
//get CSS height
//the + prefix casts it to an integer
//the slice method gets rid of "px"
let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);

//scale the canvas
canvas.setAttribute('height', style_height * dpi);
canvas.setAttribute('width', style_width * dpi);
}
function nextPoint1(x, y, time) {
    return {
        x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
        y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    };
}
function nextPoint2(x, y, time) {
    return {
        x: x + Math.sin((x + (time / 10)) / 100) * 5,
        y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
    }
}
const moveTypes = [nextPoint1, nextPoint2];
var particle_count = getRandomInt(50,200), particles = [];
		//couleurs   = ["#ffde74", "#ffa974", "#ff715a","#8a1253"];
    function Particle()
    {

        this.size = getRandom(0.1, 0.6);
        this.lineWidth = this.size * 5;
        
        this.radius = this.size * 12;
        this.x = Math.floor((Math.random() * ((+getComputedStyle(canvas).getPropertyValue("width").slice(0, -2) * dpi) - this.radius + 1) + this.radius));
        this.y = Math.floor((Math.random() * ((+getComputedStyle(canvas).getPropertyValue("height").slice(0, -2) * dpi) - this.radius + 1) + this.radius));
        
        this.moveFunc = moveTypes[getRandomInt(0,1)];
        //this.color = couleurs[Math.round(Math.random()*couleurs.length)];
//        this.speedx = Math.round((Math.random()*201)+0)/100;
//        this.speedy = Math.round((Math.random()*201)+0)/100;

//        switch (Math.round(Math.random()*couleurs.length))
//        {
//            case 1:
//            this.speedx *= 1;
//            this.speedy *= 1;
//            break;
//            case 2:
//            this.speedx *= -1;
//            this.speedy *= 1;
//            break;
//            case 3:
//            this.speedx *= 1;
//            this.speedy *= -1;
//            break;
//            case 4:
//            this.speedx *= -1;
//            this.speedy *= -1;
//            break;
//        }
            
        this.move = function()
        {
            
//            x = getRandomInt(0, 300);
//            y = getRandomInt(0, 150);
//
//            ctx.beginPath();
//            ctx.moveTo(x, y);
//            ctx.fillStyle = colors[getRandomInt(0, 2)];
//            ctx.globalAlpha = getRandom(0.8, 1);
//            ctx.arc(x, y, getRandom(0, 1.1), 0, Math.PI * 2, true);
//            ctx.fill();
//            ctx.closePath();

            
            context.beginPath();
            //context.globalCompositeOperation = 'source-over';
            context.fillStyle   = "#ffde74";
            context.globalAlpha = 1;
            context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            context.stroke();
            context.closePath();

            this.newX = this.x + this.moveFunc(this.x, this.y, Date.now()).x;
            this.newY = this.y + this.moveFunc(this.x, this.y, Date.now()).y;
            
//            
//            if(this.x <= 0+this.radius)
//            {
//                this.speedx *= -1;
//            }
//            if(this.x >= canvas.width-this.radius)
//            {
//                this.speedx *= -1;
//            }
//            if(this.y <= 0+this.radius)
//            {
//                this.speedy *= -1;
//            }
//            if(this.y >= canvas.height-this.radius)
//            {
//                this.speedy *= -1;
//            }

            for (var j = 0; j < particle_count; j++)
            {
                var particleActuelle = particles[j],
                    yd = particleActuelle.y - this.y,
                    xd = particleActuelle.x - this.x,
                    d  = Math.sqrt(xd * xd + yd * yd);

                if ( d < 200 )
                {
                    context.beginPath();
                    //context.globalAlpha = (200 - d) / (200 - 0);
                    context.globalCompositeOperation = 'destination-over';
                    context.lineWidth = 1;
                    context.moveTo(this.x, this.y);
                    context.lineTo(particleActuelle.x, particleActuelle.y);
                    context.strokeStyle = this.color;
                    context.lineCap = "round";
                    context.stroke();
                    context.closePath();
                }
            }
        };
    };
    for (var i = 0; i < particle_count; i++)
    {
        fix_dpi();
        var particle = new Particle();
        particles.push(particle);
    }


    function animate()
    {
        //fix_dpi();
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < particle_count; i++)
        {
            particles[i].move();
        }
        requestAnimFrame(animate);
    }
    
    

   
    animate(); 
