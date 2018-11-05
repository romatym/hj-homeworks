/* Данный JS код */

// Регулируем видимость карточки
function toggleCardVisible() {
    document.getElementById('content').classList.toggle('hidden');
    document.getElementById('card').classList.toggle('hidden');
}

document.getElementById('close').addEventListener('click', toggleCardVisible);

document.getElementById('content').addEventListener('click', (event) => {
    let target = null;
    if (event.target.tagName === 'LI') {
        target = event.target;
    }
    if (event.target.parentNode.tagName === 'LI') {
        target = event.target.parentNode;
    }

    if (target) {
        toggleCardVisible();
        document.getElementById('card-title').innerHTML = target.dataset.title;
        document.getElementById('card-author').innerHTML = target.dataset.author;
        document.getElementById('card-info').innerHTML = target.dataset.info;
        document.getElementById('card-price').innerHTML = target.dataset.price;
    }
});

const request = new XMLHttpRequest();
request.addEventListener("load", onLoad);
request.open('GET', 'https://neto-api.herokuapp.com/book/', true);
request.send();
function onLoad() {
    if (this.status === 200) {
        const response = JSON.parse(this.responseText);

        var content = document.getElementById('content');
        var innerHTML = '';
        for (const book of response) {
            innerHTML += [
                '<li',
                'data-title="' + book.title + '"',
                'data-author="' + book.author.name + '"',
                'data-info="' + book.info + '"',
                'data-price="' + book.price + '">',
                '<img src="' + book.cover.small + '">',
                '</li>'
            ].join(' ');
        }
        content.innerHTML = innerHTML;
    }
}
