'use strict';

function showComments(list) {
    const commentsContainer = document.querySelector('.comments');

    const fragment = list.reduce(
            function (fragment, currentValue) {
                fragment.appendChild(createComment(currentValue));
                return fragment;
            }, document.createDocumentFragment());

    commentsContainer.appendChild(fragment);
}
function createComment(comment) {

    return elem('div', {class: 'comment-wrap'}, [
        elem('div', {class: 'photo'}, [
            elem('div', {class: 'avatar', style: 'background-image: url(' + comment.author.pic + ')'}, '')
        ]),
        elem('div', {class: 'comment-block'}, [
            elem('p', {class: 'comment-text'}, comment.text.split('\n').join('<br>')),
            elem('div', {class: 'bottom-comment'}, [
                elem('div', {class: 'comment-date'}, new Date(comment.date).toLocaleString('ru-Ru')),
                elem('ul', {class: 'comment-actions'}, [
                    elem('li', {class: 'complain'}, 'Пожаловаться'),
                    elem('li', {class: 'reply'}, 'Ответить')
                ])
            ])
        ])
    ]);
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

fetch('https://neto-api.herokuapp.com/comments')
        .then(res => res.json())
        .then(showComments);
