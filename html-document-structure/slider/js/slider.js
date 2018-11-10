
var buttons = document.getElementsByTagName('a');
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
    if (currentSlide.nextElementSibling === null) {
        buttonsGroup.querySelector('[data-action="next"]').classList.toggle('disabled', true);
        buttonsGroup.querySelector('[data-action="last"]').classList.toggle('disabled', true);
        buttonsGroup.querySelector('[data-action="first"]').classList.toggle('disabled', false);
        buttonsGroup.querySelector('[data-action="prev"]').classList.toggle('disabled', false);

    } else if (currentSlide.previousElementSibling === null) {
        buttonsGroup.querySelector('[data-action="next"]').classList.toggle('disabled', false);
        buttonsGroup.querySelector('[data-action="last"]').classList.toggle('disabled', false);
        buttonsGroup.querySelector('[data-action="first"]').classList.toggle('disabled', true);
        buttonsGroup.querySelector('[data-action="prev"]').classList.toggle('disabled', true);
    } else {
        buttonsGroup.querySelector('[data-action="next"]').classList.toggle('disabled', false);
        buttonsGroup.querySelector('[data-action="last"]').classList.toggle('disabled', false);
        buttonsGroup.querySelector('[data-action="first"]').classList.toggle('disabled', false);
        buttonsGroup.querySelector('[data-action="prev"]').classList.toggle('disabled', false);
    }
}