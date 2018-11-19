'use strict';
const forms = document.getElementsByClassName('login-form')[0].children;
for (const form of forms) {
    form.addEventListener('submit', submit);
}
var activeForm;
function submit(event) {
    event.preventDefault();
    activeForm = event.currentTarget;
    
    var formData = new FormData(event.currentTarget);
    var object = {};
    for (const [key, value] of formData) {
        object[key] = value;
    }
    const jsonForm = JSON.stringify(object);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', res);
    if (event.currentTarget.classList.contains('sign-in-htm')) {
        xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
    } else {
        xhr.open('POST', 'https://neto-api.herokuapp.com/signup');
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(jsonForm);
}

function res() {
    //здесь не удалось проверить вариант с успешной авторизацией, так как сервер возвращал ошибку 500
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        const response = JSON.parse(this.response);
        const output = activeForm.getElementsByTagName('output')[0];
        if(response.hasOwnProperty('error')) {
            output.innerText = response.message;
            output.classList.add('error-message');
        } else if(response.hasOwnProperty('email') && activeForm.classList.contains('sign-in-htm')) {
            output.innerText = 'Пользователь ' + response.name + ' успешно авторизован';
            output.classList.remove('error-message');
        } else if(response.hasOwnProperty('email') && activeForm.classList.contains('sign-up-htm')) {
            output.innerText = 'Пользователь ' + response.name + ' успешно зарегистрирован';    
            output.classList.remove('error-message');
        }
    } else { //ошибка сервера 500
        output.innerText = this.response;
        output.classList.add('error-message');
    }
}