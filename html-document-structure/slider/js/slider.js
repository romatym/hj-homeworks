
const buttons = document.getElementsByTagName('a');
var slides = document.getElementsByClassName('slide');
for (const button of buttons) {
    button.addEventListener('click', buttonClick);
}
slides[0].classList.add('slide-current');
buttonCheckAvaible();

function buttonClick(event) {
    const button = event.target;
    if(button.classList.contains('disabled')) {
        event.preventDefault();
        return;
    }
    const currentSlide = document.querySelector('ul.slides .slide-current');
    currentSlide.classList.remove('slide-current');
    if (button.dataset.action === 'prev') {
        currentSlide.previousElementSibling.classList.add('slide-current');
    }
    if (button.dataset.action === 'first') {
        slides[0].classList.add('slide-current');
    }
    if (button.dataset.action === 'last') {
        slides[slides.length - 1].classList.add('slide-current');
    }
    if (button.dataset.action === 'next') {
        currentSlide.nextElementSibling.classList.add('slide-current');
    }
    buttonCheckAvaible();
}

function buttonCheckAvaible() {
    const currentSlide = document.querySelector('ul.slides .slide-current');
    const buttonsGroup = document.getElementsByClassName('slider-nav')[0];
    
    const next = buttonsGroup.querySelector('[data-action="next"]').classList;
    const last = buttonsGroup.querySelector('[data-action="last"]').classList;
    const first = buttonsGroup.querySelector('[data-action="first"]').classList;
    const prev = buttonsGroup.querySelector('[data-action="prev"]').classList;
    if (currentSlide.nextElementSibling === null) {
        next.toggle('disabled', true);
        last.toggle('disabled', true);
        first.toggle('disabled', false);
        prev.toggle('disabled', false);
    } else if (currentSlide.previousElementSibling === null) {
        next.toggle('disabled', false);
        last.toggle('disabled', false);
        first.toggle('disabled', true);
        prev.toggle('disabled', true);
    } else {
        next.toggle('disabled', false);
        last.toggle('disabled', false);
        first.toggle('disabled', false);
        prev.toggle('disabled', false);
    }
}