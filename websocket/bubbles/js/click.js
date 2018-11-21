'use strict';

document.addEventListener('click', onClick);
document.addEventListener('DOMContentLoaded', onContentLoaded);

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

function onClick(event) {
    connection.send(JSON.stringify({'x':event.x, 'y':event.y}));
}

function onContentLoaded(event) {
    showBubbles(connection);
}
