'use strict';

let movedPiece = null;
let shiftX = 0;
let shiftY = 0;

document.addEventListener('mousedown', event => {
    if (event.target.classList.contains('logo')) {
        movedPiece = event.target;
        const bounds = event.target.getBoundingClientRect();
        shiftX = event.pageX - bounds.left -
                window.pageXOffset;
        shiftY = event.pageY - bounds.top -
                window.pageYOffset;
    }
});

document.addEventListener('mousemove', event => {
    if (movedPiece) {
        event.preventDefault();
        movedPiece.style.left = event.pageX - shiftX + 'px';
        movedPiece.style.top = event.pageY - shiftY + 'px';
        movedPiece.classList.add('moving');
    }
});

document.addEventListener('mouseup', event => {
    if (movedPiece) {
        movedPiece.style.visibility = 'hidden';
        const check = document
                .elementFromPoint(event.clientX, event.clientY)
                .closest('[id=trash_bin]');
        movedPiece.style.visibility = 'visible';
        if (check) {
            movedPiece.style.display = "none";
        }
        movedPiece.classList.remove('moving');
        movedPiece = null;
    }
});