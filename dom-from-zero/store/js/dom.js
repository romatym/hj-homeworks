'use strict';

function createElement(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    const element = document.createElement(node.name);
    if (typeof node === 'object') {
        Object.keys(node.props).forEach(i => element.setAttribute(i, node.props[i]));
    }
    if (node.childs instanceof Array) {
        node.childs.forEach(function (child) {
            return this.appendChild(createElement(child));
        }, element);
        return element;
    }
    return element;
}
const node = {
    name: 'h1',
    props: {
        class: 'main-title'
    },
    childs: [
        'Заголовок'
    ]
};

//const element = createElement(node);
//const wrapper = document.getElementById('root');
//wrapper.appendChild(element);