
addEventListener('DOMContentLoaded', init);
const buttonSubmit = document.getElementsByClassName('button-contact')[0];
buttonSubmit.addEventListener('click', submit);
const buttonReturn = document.getElementsByClassName('button-contact')[1];
buttonReturn.addEventListener('click', submit);
var dataset = [];

function init() {
    const fields = document.getElementsByClassName('form-group');
    for (const field of fields) {

        var inputField = field.getElementsByTagName('input');
        if (inputField.length > 0) {
            inputField[0].addEventListener('input', checkForm);
        } else {
            var textArea = field.getElementsByTagName('textarea');
            textArea[0].addEventListener('input', checkForm);
        }
    }
    checkForm();
}

function checkForm() {
    dataset = [];
    const fields = document.getElementsByClassName('form-group');
    
    for (const field of fields) {

        var inputField = field.getElementsByTagName('input');
        if (inputField.length > 0) {
            dataset.push({'name': inputField[0].name, 'value': inputField[0].value});
        } else {
            var textArea = field.getElementsByTagName('textarea');
            dataset.push({'name': textArea[0].name, 'value': textArea[0].value});
        }
    }
    var counter = 0;
    for (const dataField of dataset) {
        if (dataField.value.trim() !== '') {
            counter++;
        }
    }
    if(counter === 11) {
        fillOutput();
        buttonSubmit.removeAttribute('disabled');
    } else {
        buttonSubmit.setAttribute('disabled', 'disabled');
    }
}
function submit(event) {
    document.getElementsByClassName('contentform')[0].classList.toggle('hidden');
    document.getElementById('output').classList.toggle('hidden');
    event.preventDefault();
}
function fillOutput() {
    var mainOutput = document.getElementsByTagName('main');
    for (const dataField of dataset) {
        var findElem = document.getElementById(dataField['name']);
        if(findElem !== null) {
            findElem.innerHTML = dataField.value;
        }
    }
}