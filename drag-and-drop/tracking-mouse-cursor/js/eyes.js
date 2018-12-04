'use strict';

const eyeLeft = document.getElementsByClassName('cat_position_for_right_eye')[0];
const eyeBall1 = document.getElementsByClassName('cat_eye_right')[0];
const eyeRight = document.getElementsByClassName('cat_position_for_left_eye')[0];
const eyeBall2 = document.getElementsByClassName('cat_eye_left')[0];

function offset(elem) {
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}
var DrawEye = function (eye, pupil, speed, interval) {

    var mouseX = 0, mouseY = 0;
    var pupilX = 0, pupilY = 0;
    var eyeX = eye.clientWidth - pupil.clientWidth;
    var eyeY = eye.clientHeight - pupil.clientHeight;
    var offsetElem = offset(eye);

    document.addEventListener('mousemove', evt => {
        mouseX = Math.min(evt.pageX - offsetElem.left, eyeX);
        mouseY = Math.min(evt.pageY - offsetElem.top, eyeY);
        if (mouseX < 0)
            mouseX = 0;
        if (mouseX > 20)
            mouseX = 20;
        if (mouseY < 0)
            mouseY = 0;
        if (mouseY > 20)
            mouseY = 20;
    });

    var follower = pupil;
    var loop = setInterval(function () {
        pupilX += (mouseX - pupilX) / speed;
        pupilY += (mouseY - pupilY) / speed;
        
        follower.style.left = pupilX + 'px';
        follower.style.top = pupilY + 'px';
    }, interval);

};

var Left = new DrawEye(eyeLeft, eyeBall1, 2, 200);
var Right = new DrawEye(eyeRight, eyeBall2, 2, 200);