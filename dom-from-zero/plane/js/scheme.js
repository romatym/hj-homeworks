'use strict';

document.addEventListener('DOMContentLoaded', init);
const acSelect = document.getElementById('acSelect');
    acSelect.addEventListener('change', planeChange);
const btnSeats = document.getElementById('btnSeatMap');
    btnSeats.addEventListener('click', showSeats);
const btnSetEmpty = document.getElementById('btnSetEmpty');
    btnSetEmpty.disabled = true;
    btnSetEmpty.addEventListener('click', empty);
const btnSetFull = document.getElementById('btnSetFull');
    btnSetFull.disabled = true;
    btnSetFull.addEventListener('click', full);
        
var totalAdult = 0, totalHalf = 0, total = 0;
var startNodes = [];        
        
function planeChange() {
    
    const seatsContainer = document.getElementById('seatMapDiv');
    while (seatsContainer.firstChild) {
        seatsContainer.removeChild(seatsContainer.firstChild);
    }    
    for(const node of startNodes) {
        seatsContainer.appendChild(node);
    }
    total = 0;
    
    document.getElementById('seatMapTitle').innerText = acSelect.options[acSelect.selectedIndex].text;
    document.querySelector('.seating-chart h3').innerText = acSelect.value;
    updateSeats();
}        
        
function init() {
    document.getElementById('seatMapTitle').innerText = acSelect.options[acSelect.selectedIndex].text;
    document.querySelector('.seating-chart h3').innerText = acSelect.value;

    const seatsContainer = document.getElementById('seatMapDiv');
    for(const node of seatsContainer.childNodes) {
        startNodes.push(node);
    }
}
function full(e) {
    e.preventDefault();
    
    const seats = document.getElementsByClassName('seat');
    [].forEach.call(seats, function(seat) {
        seat.classList.add('adult');
    });
    totalAdult = total;
    updateSeats();
}
function empty(e) {
    e.preventDefault();
    
    const seats = document.getElementsByClassName('seat');
    [].forEach.call(seats, function(seat) {
        seat.classList.remove('adult');
        seat.classList.remove('half');
    });
    totalAdult = 0;
    totalHalf = 0;
    
    updateSeats();    
}

function showSeats(e) {
    e.preventDefault();

    const request = new XMLHttpRequest();    
    request.addEventListener("load", onLoad);
    request.open('GET', 'https://neto-api.herokuapp.com/plane/' + acSelect.value, true);
    request.send();
}
function onLoad() {
    
    if (this.status === 200) {
        const response = JSON.parse(this.responseText);

            document.querySelector('.seating-chart h3').innerText = response.title;
            document.getElementById('seatMapTitle').innerText = acSelect.value;
            
            var fragment = response.scheme.reduce(
                function(fragment, rowData, index) {
                    let row;
                    if (rowData === 6) {
                        row = response.letters6;
                    } else if (rowData === 4) {
                        row = response.letters4;
                    } else {
                        row = [];
                    }
                    const rowElem = createRow(rowData, row, index+1);
                    rowElem.addEventListener('click', takePlace);
                    fragment.appendChild(rowElem);
                    
                    return fragment;                    
                }, document.createDocumentFragment()
        );
        
        const seatsContainer = document.getElementById('seatMapDiv');
        seatsContainer.appendChild(fragment);

        total = response.passengers;
        updateSeats();

        btnSetEmpty.disabled = false;
        btnSetFull.disabled = false;
    }
}
function takePlace(e) {
    e.preventDefault();
    var place;
    if(e.target.tagName === 'DIV' && e.target.classList.contains('seat')) {
        place = e.target.classList;
    } else if(e.target.classList.contains('seat-label')) {
        place = e.target.parentNode.classList;
    } else {
        return;
    }
        
    if(place.contains('adult')) {
        place.remove('adult');
        totalAdult--;
    } else if(place.contains('half')) {
        place.remove('half');
        totalHalf--;
    } else if(e.altKey) {
        place.add('half');
        totalHalf++;
    } else {
        place.add('adult');
        totalAdult++;
    }
    
    updateSeats();
}
function updateSeats() {
    document.getElementById('totalAdult').innerText = totalAdult;
    document.getElementById('totalHalf').innerText = totalHalf;
    document.getElementById('totalPax').innerText = total;
}
function createRow(rowData, letters, index) {
    return elem('div', {class: 'row seating-row text-center'}, [
        elem('div', {class: 'col-xs-1 row-number'}, [
            elem('h2', {class: ''}, index.toString())
        ]),
        elem('div', {class: 'col-xs-5'}, [
            addSeat(letters[0]),
            addSeat(letters[1]),
            addSeat(letters[2])
        ]),
        elem('div', {class: 'col-xs-5'}, [
            addSeat(letters[3]),
            addSeat(letters[4]),
            addSeat(letters[5])
        ])
    ]);
}

function addSeat(letter) {
    if(letter === null) {
        return elem('div', {class: 'col-xs-4 no-seat'}, '');
    } else {
        return elem('div', {class: 'col-xs-4 seat'}, [ elem('span', {class: 'seat-label'}, letter) ]);
    }
}
function elem(tagName, attributes, children) {
    const element = document.createElement(tagName);
    if (typeof attributes === 'object') {
        Object.keys(attributes).forEach(i => element.setAttribute(i, attributes[i]));
    }
    if (typeof children === 'string') {
        element.textContent = children;
    } else if (children instanceof Array) {
        children.forEach(child => element.appendChild(child));
    }
    return element;
}
